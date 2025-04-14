"use client";
import type { ResultOf } from "gql.tada";
import {
  type ColorCombinationFragment,
  ConfiguratorImageFragment,
  type ShellWithPhotoFragment,
} from "./queries.graphql";
import { SRCImage } from "react-datocms";
import NextImage from "next/image";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { preload } from "react-dom";

type ColorCombination = ResultOf<typeof ColorCombinationFragment>;
type Shells = ColorCombination["shells"];
type Shell = Shells[number];

type ColorConfiguratorProps = {
  shellPhotos: ResultOf<typeof ShellWithPhotoFragment>[];
  colorCombinations: ColorCombination[];
};

type PhotoInfo = ResultOf<typeof ConfiguratorImageFragment>;

export const ColorConfigurator = ({
  colorCombinations,
  shellPhotos,
}: ColorConfiguratorProps) => {
  const cabinetPhotosById = useMemo<Record<string, PhotoInfo>>(() => {
    const discoveredCabinetPhotos: Array<string | PhotoInfo>[] =
      colorCombinations.map(({ cabinet, cabinetPhoto }) => [
        cabinet.id,
        cabinetPhoto,
      ]);
    const byId: Record<string, PhotoInfo> = Object.fromEntries(
      discoveredCabinetPhotos,
    );
    return byId;
  }, [colorCombinations]);

  const shellPhotosById = useMemo<Record<string, PhotoInfo>>(() => {
    const discoveredShellPhotos: Array<string | PhotoInfo>[] = shellPhotos.map(
      ({ shell, shellPhoto }) => [shell.id, shellPhoto],
    );
    const byId: Record<string, PhotoInfo> = Object.fromEntries(
      discoveredShellPhotos,
    );
    return byId;
  }, [shellPhotos]);

  const [selectedCabinetId, setSelectedCabinetId] = useState<string>(
    colorCombinations[0].cabinet.id,
  );
  const [selectedShellId, setSelectedShellId] = useState<string>(
    colorCombinations[0].shells[0].id,
  );

  const selectedCabinetPhoto: PhotoInfo = cabinetPhotosById[selectedCabinetId];
  const selectedShellPhoto: PhotoInfo = shellPhotosById[selectedShellId];

  // Tell browser to preload all the photos
  const photosToPreload: string[] = [
    ...Object.values(cabinetPhotosById).map(
      (photo) => photo.responsiveImage.src,
    ),
    ...Object.values(shellPhotosById).map((photo) => photo.responsiveImage.src),
  ];
  photosToPreload.map((url) => preload(url, { as: "image" }));

  const selectedColorCombination = useMemo<ColorCombination | null>(() => {
    const selectedCabinet = colorCombinations.find(
      ({ cabinet }) => cabinet.id === selectedCabinetId,
    );

    return selectedCabinet ?? null;
  }, [colorCombinations, selectedCabinetId]);

  const availableShellsForSelectedCabinet = useMemo<Shells>(() => {
    return selectedColorCombination?.shells ?? [];
  }, [selectedColorCombination]);

  const selectedShell = useMemo<Shell | null>(() => {
    const selectedShell = selectedColorCombination?.shells.find(
      ({ id }) => id === selectedShellId,
    );
    return selectedShell ?? null;
  }, [selectedColorCombination, selectedShellId]);

  return (
    <>
      <Box>
        <Heading as={"h2"} size={"7"} mb={"5"} align={"center"}>
          Color Options
        </Heading>
      </Box>
      <Flex align={"center"}>
        <Flex flexGrow={"1"} direction={"column"} align={"center"}>
          <Box>
            <Heading
              as={"h3"}
              size={"6"}
              style={{
                borderBottom: "1px solid blue",
                marginBottom: "15px",
                width: "100%",
              }}
              align={"center"}
            >
              Cabinet
            </Heading>
            <Heading as={"h4"} size={"4"} align={"center"}>
              {selectedColorCombination?.cabinet.name}
            </Heading>
          </Box>
          <Flex mt={"5"}>
            <Grid columns={"3"} rows={"2"} gap={"1"}>
              {colorCombinations.map(({ id, shells, cabinet }) => (
                <div key={id}>
                  <a
                    onClick={() => {
                      setSelectedCabinetId(cabinet.id);

                      // Reset to first available shell if the previously chosen color isn't available for this cabinet
                      if (
                        !availableShellsForSelectedCabinet.some(
                          (shell) => selectedShellId === shell.id,
                        )
                      ) {
                        setSelectedShellId(shells[0].id);
                      }
                    }}
                  >
                    <SRCImage
                      data={cabinet.thumbnail.responsiveImage}
                      imgClassName={`${styles.colorOption} ${cabinet.id === selectedCabinetId && styles.selected}`}
                    />
                  </a>
                </div>
              ))}
            </Grid>
          </Flex>
        </Flex>
        <Flex flexShrink={"0"} direction={"column"}>
          <NextImage
            unoptimized={true}
            loading="eager"
            src={selectedShellPhoto.responsiveImage.src}
            className={styles.cabinetPhoto}
            alt={""}
            width={selectedShellPhoto.responsiveImage.width}
            height={selectedShellPhoto.responsiveImage.height}
          />
          <NextImage
            unoptimized={true}
            loading="eager"
            src={selectedCabinetPhoto.responsiveImage.src}
            className={styles.shellPhoto}
            alt={""}
            width={selectedCabinetPhoto.responsiveImage.width}
            height={selectedCabinetPhoto.responsiveImage.height}
          />
        </Flex>
        <Flex flexGrow={"1"} direction={"column"}>
          <Box mb={"5"}>
            <Heading
              as={"h3"}
              size={"6"}
              style={{
                borderBottom: "1px solid blue",
                marginBottom: "15px",
                width: "100%",
              }}
              align={"center"}
            >
              Shells
            </Heading>
            <Heading as={"h4"} size={"4"} align={"center"}>
              {selectedShell?.name}
            </Heading>
          </Box>
          <Grid rows={"2"} columns={"3"}>
            {availableShellsForSelectedCabinet.map((shell) => {
              return (
                <a
                  onClick={() => {
                    setSelectedShellId(shell.id);
                  }}
                  key={shell.id}
                >
                  <SRCImage
                    data={shell.thumbnail.responsiveImage}
                    imgClassName={`${styles.colorOption} ${shell.id === selectedShellId && styles.selected}`}
                  />
                </a>
              );
            })}
          </Grid>
        </Flex>
      </Flex>
    </>
  );
};
