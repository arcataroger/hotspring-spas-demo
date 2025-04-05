import { gql } from "@/lib/graphql/gqltada";
import { datoQuery } from "@/lib/datocms/datoQuery";

export default async function EnergyCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const spaQuery = gql(`
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

  const data = await datoQuery(spaQuery, {
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
    slug: spa.slug
  }));
}
