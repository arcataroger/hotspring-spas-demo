"use client";
import type { ResultOf } from "gql.tada";
import {
  type ColorCombinationFragment,
  ConfiguratorImageFragment,
  type ShellWithPhotoFragment,
} from "./queries.graphql";
import { SRCImage } from "react-datocms";
import NextImage from "next/image";
import { Flex, Heading } from "@radix-ui/themes";
import styles from "./styles.module.css";
import { useMemo, useState } from "react";
import { preload } from "react-dom";

type ColorConfiguratorProps = {
  shellPhotos: ResultOf<typeof ShellWithPhotoFragment>[];
  colorCombinations: ResultOf<typeof ColorCombinationFragment>[];
};

type PhotoInfo = ResultOf<typeof ConfiguratorImageFragment>;

type Shells = ResultOf<typeof ColorCombinationFragment>["shells"];

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

  // Colors available for current shell
  const availableShellsForSelectedCabinet = useMemo<Shells>(() => {
    const selectedCabinet = colorCombinations.find(
      ({ cabinet }) => cabinet.id === selectedCabinetId,
    );

    return selectedCabinet?.shells ?? [];
  }, [selectedCabinetId, colorCombinations]);

  return (
    <>
      <Flex>
        <Flex flexGrow={"1"}>
          {colorCombinations.map(({ id, shells, cabinet }) => (
            <div key={id}>
              <Heading as={"h3"} size={"4"}>
                {cabinet.name}
              </Heading>
              <a
                onClick={() => {
                  setSelectedCabinetId(cabinet.id);

                  // Reset to first available shell if the previously chosen color isn't available for this cabinet
                  if(!availableShellsForSelectedCabinet.some(shell => selectedShellId === shell.id)) {
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
        <Flex flexGrow={"1"}>
          <ul>
            {availableShellsForSelectedCabinet.map((shell) => {
              return (
                <li key={`${selectedCabinetId}-${shell.id}`}>
                  <Heading as={"h4"} size={"3"}>
                    {shell.name}
                  </Heading>
                  <a
                    onClick={() => {
                      setSelectedShellId(shell.id);
                    }}
                  >
                    <SRCImage
                      data={shell.thumbnail.responsiveImage}
                      imgClassName={`${styles.colorOption} ${shell.id === selectedShellId && styles.selected}`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </Flex>
      </Flex>
    </>
  );
};
