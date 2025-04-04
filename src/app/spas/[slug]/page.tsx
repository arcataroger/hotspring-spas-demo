import { gql } from "@/lib/graphql/gqltada";
import { datoQuery } from "@/lib/datocms/datoQuery";

export default async function EnergyCalculatorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const energyCalcQuery = gql(`
      query SpaQuery($slug: String) {
          spa (filter: {slug: {eq: $slug}}) {
              id
              slug
              name
              estimatedEnergyConsumption
              capacity
              internalName
              thumbnail {
                  responsiveImage {
                      srcSet
                      src
                  }
                  id
              }
              specifications {
                  value
                  label
                  id
              }
          }
      }`);

  const data = await datoQuery(energyCalcQuery, {
    variables: {
      slug: slug,
    },
  });

  const { spa } = data;

  return (
    <>
      <pre>
        <code>{JSON.stringify(spa, null, 2)}</code>
      </pre>
    </>
  );
}
