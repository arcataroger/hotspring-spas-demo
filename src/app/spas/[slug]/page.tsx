import { gql } from "@/lib/graphql/gqltada";
import { datoQuery } from "@/lib/datocms/datoQuery";
import { notFound } from "next/navigation";
import { spaQuery } from "./queries.graphql";
import { Box, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { SRCImage, StructuredText } from "react-datocms";
import NextImage from "next/image";
import {ColorConfigurator} from "@/app/spas/[slug]/ColorConfigurator";

export default async function EnergyCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await datoQuery(spaQuery, {
    variables: {
      slug: slug,
    },
  });

  const { spa } = data;

  if (!spa) {
    notFound();
  }

  const numOfSpecs = spa.specifications.length;
  const numOfLeftColSpecs = Math.ceil(numOfSpecs / 2);

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

        <Section id="color-configurator">
            <ColorConfigurator colorCombinations={spa.colorCombinations}/>
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
