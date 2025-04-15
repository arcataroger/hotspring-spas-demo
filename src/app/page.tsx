import {Heading} from "@radix-ui/themes";
import Link from "next/link";
import {datoQuery} from "@/lib/datocms/datoQuery";
import {energyCalcQuery} from "@/app/energy-calculator/queries.graphql";

export default async function Home() {

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

    const {allSpas} = allSpaRequest;

    return (
    <>
      <Heading size={"9"} as={"h1"}>DatoCMS Spa Demo</Heading>

      <Heading size={"3"}>Spa pages:</Heading>
      <ul>
          {allSpas.map(spa => <li key={spa.id}><Link  href={`/spas/${spa.slug}`}>{spa.name}</Link></li>)}
      </ul>

        <Heading size={"3"}>Other pages:</Heading>
        <ul>
            <li><Link href={"energy-calculator"}>Energy Calculator</Link></li>
        </ul>

    </>
  );
}
