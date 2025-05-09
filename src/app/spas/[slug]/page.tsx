import { gql } from "@/lib/graphql/gqltada";
import { datoQuery } from "@/lib/datocms/datoQuery";
import { notFound } from "next/navigation";
import { spaQuery } from "./queries.graphql";
import { Box, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { SRCImage, StructuredText } from "react-datocms";
import NextImage from "next/image";
import { ColorConfigurator } from "@/app/spas/[slug]/ColorConfigurator";
import { BuildingBlocksRenderer } from "@/app/spas/[slug]/BuildingBlocksRenderer";
import { EnergyCalculator } from "@/app/energy-calculator/component/EnergyCalculator";
import { energyCalcQuery } from "@/app/energy-calculator/queries.graphql";

export default async function EnergyCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch data for this particular spa
  const singleSpaRequest = await datoQuery(spaQuery, {
    variables: {
      slug: slug,
    },
  });

  // Fetch basic data on all spas for the energy calc. Cache it on a long TTL
  const allSpaRequest = await datoQuery(energyCalcQuery, {
    fetchFn: (input, init) =>
      fetch(input, {
        cache: "force-cache",
        next: {
          revalidate: 300, // The energy calc can be cached for longer, like 5 min
        },
        ...init,
      }),
  });

  const { spa } = singleSpaRequest;

  const { allClimates, allSpas } = allSpaRequest;

  if (!spa) {
    notFound();
  }

  const numOfSpecs = spa.specifications.length;
  const numOfLeftColSpecs = Math.ceil(numOfSpecs / 2);

  const { buildingBlocks } = spa;

  return (
    <>
      <Heading as={"h1"} size={"8"} align={"center"}>
        {spa.name}
      </Heading>

      <Section id={"top-details"}>
        <Flex gap={"3"} justify={"center"} align={"center"}>
          <Box flexGrow={"1"}>
            <Text align={"center"} as={"div"}>
              {spa.specifications.slice(0, numOfLeftColSpecs).map((spec) => (
                <Box key={spec.id} mb={"3"}>
                  <Heading as={"h3"} size={"4"}>
                    {spec.label}
                  </Heading>
                  {spec.value}
                </Box>
              ))}
            </Text>
          </Box>
          <Box flexShrink={"0"}>
            {spa.thumbnail?.responsiveImage && (
              <SRCImage data={spa.thumbnail.responsiveImage} />
            )}
          </Box>
          <Box flexGrow={"1"}>
            <Text align={"center"} as={"div"}>
              {spa.specifications.slice(numOfLeftColSpecs).map((spec) => (
                <Box key={spec.id} mb={"3"}>
                  <Heading as={"h3"} size={"4"}>
                    {spec.label}
                  </Heading>
                  {spec.value}
                </Box>
              ))}
            </Text>
          </Box>
        </Flex>
      </Section>

      <Section id="description">
        <StructuredText data={spa.description} />
        <Grid columns={"4"} rows={"2"} gap={"3"} mt={"5"}>
          {spa.features.map((feature) => {
            const { icon, name } = feature;
            return (
              <Flex
                key={feature.id}
                direction={"column"}
                align={"center"}
                width={"150px"}
              >
                <Box>
                  <NextImage
                    src={icon.url}
                    alt={icon.alt ?? ""}
                    width={50}
                    height={50}
                  />
                </Box>
                <Text
                  style={{ textTransform: "uppercase" }}
                  size={"1"}
                  align={"center"}
                >
                  {name}
                </Text>
              </Flex>
            );
          })}
        </Grid>
      </Section>

      {spa.colorCombinations?.length && (
        <Section id="color-configurator">
          <ColorConfigurator
            colorCombinations={spa.colorCombinations}
            shellPhotos={spa.shellPhotos}
          />
        </Section>
      )}

      {!!buildingBlocks && (
        <Section id="page-builder">
          {buildingBlocks.map((block) => {
            switch (block.__typename) {
              case "LeftRightSplitRecord":
                const rightPart = block.reverseLeftRight
                  ? block.left
                  : block.right;
                const leftPart = block.reverseLeftRight
                  ? block.right
                  : block.left;

                return (
                  <Flex key={block.id}>
                    <Flex width="50%" align="center" justify="center">
                      <BuildingBlocksRenderer block={leftPart} />
                    </Flex>
                    <Flex width="50%" align="center" justify="center">
                      <BuildingBlocksRenderer block={rightPart} />
                    </Flex>
                  </Flex>
                );

              default:
                return (
                  <div key={block.id}>
                    <strong>Unknown block type: {block.__typename}</strong>
                    <pre>{JSON.stringify(block)}</pre>
                  </div>
                );
            }
          })}
        </Section>
      )}

      <Section id="energy-calculator">
        <EnergyCalculator allSpas={allSpas} allClimates={allClimates} />
      </Section>
    </>
  );
}

export async function generateStaticParams() {
  const data = await datoQuery(
    gql(`
            query allSpasQuery {
                allSpas(first: 500) {
                    slug
                }
            }`),
  );

  return data.allSpas.map((spa) => ({
    slug: spa.slug,
  }));
}
