import type { ResultOf } from "gql.tada";
import type {
  ImageBlockFragment,
  StructTextBlockFragment,
  TextWithLinkBlockFragment,
} from "./queries.graphql";
import { Box, Heading } from "@radix-ui/themes";
import sanitize from "sanitize-html";
import { SRCImage } from "react-datocms";

type AcceptableBlock =
  | ResultOf<typeof TextWithLinkBlockFragment>
  | ResultOf<typeof ImageBlockFragment>
  | ResultOf<typeof StructTextBlockFragment>;

type BuildingBlocksRendererProps = {
  block: AcceptableBlock;
};

export const BuildingBlocksRenderer =({
  block,
}: BuildingBlocksRendererProps) => {
  switch (block.__typename) {
    case "TextWithLinkBlockRecord":
      return (
        <Box pl={"5"} pr={"5"}>
          <Heading size={"6"} as={"h3"}>
            {block.title}
          </Heading>
          <Box
            dangerouslySetInnerHTML={{
              __html: block.bodyText ? sanitize(block.bodyText) : "",
            }}
          />
        </Box>
      );

    case "ImageBlockRecord":
      return (
        <Box>
          <SRCImage data={block.image.responsiveImage} />
        </Box>
      );

    default:
      return (
        <div>
          <strong>Unknown block type: {block.__typename}</strong>
          <pre>
            <code>{JSON.stringify(block, null, 2)}</code>
          </pre>
        </div>
      );
  }
}
