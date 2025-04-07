import type { ResultOf } from "gql.tada";
import type { ColorCombinationFragment } from "@/app/spas/[slug]/queries.graphql";
import {SRCImage} from "react-datocms";
import {Heading} from "@radix-ui/themes";

type ColorConfiguratorProps = {
  colorCombinations: ResultOf<typeof ColorCombinationFragment>[];
};

export const ColorConfigurator = ({
  colorCombinations,
}: ColorConfiguratorProps) => {
  return (
    <>
      {colorCombinations.map(({ id, shells, cabinet }) => (
        <div key={id}>
         <Heading as={"h3"} size={"4"}>{cabinet.name}</Heading>
          <SRCImage data={cabinet.thumbnail.responsiveImage}/>
          <ul>
          {shells.map((shell) => {
            return (
              <li key={`${id}-${shell.id}`}>
               <Heading as={"h4"} size={"3"}>{shell.name}</Heading>
                <SRCImage data={shell.thumbnail.responsiveImage}/>
              </li>
            );
          })}
          </ul>
        </div>
      ))}
    </>
  );
};
