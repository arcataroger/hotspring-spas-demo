import { gql } from "@/lib/graphql/gqltada";
import {
  FileFragment,
  ImageFragment,
} from "@/lib/graphql/common-fragments.graphql";

const ImageBlockFragment = gql(
  `
        fragment ImageBlockFragment on ImageBlockRecord @_unmask {
            id
            __typename
            image {
                ...ImageFragment
            }
        }`,
  [ImageFragment],
);

const StructTextBlockFragment =
  gql(`    fragment StructTextBlockFragment on StructuredTextBlockRecord @_unmask {
    id
    __typename
    structuredText {
        value
        blocks
        inlineBlocks
        links
    }
}`);

const TextWithLinkBlockFragment = gql(
  ` fragment TextWithLinkBlockFragment on TextWithLinkBlockRecord @_unmask {
        id
        title
        linkUrl
        linkText
        bodyText
    }
    `,
  [ImageFragment],
);

export const spaQuery = gql(
  `
        query SpaQuery($slug: String) {
            spa (filter: {slug: {eq: $slug}}) {
                id
                internalName
                thumbnail {
                    ...FileFragment
                }
                slug
                name
                description {
                    value
                }
                estimatedEnergyConsumption
                capacity
                specifications {
                    value
                    label
                    id
                }
                collection {
                    id
                    name
                    description
                }
                colorCombinations {
                    id
                    shells {
                        id
                        name
                        thumbnail {
                            ...FileFragment
                        }
                    }
                    cabinet {
                        id
                        name
                        thumbnail {
                            ...FileFragment
                        }
                    }
                }
                gallery {
                    url
                }
                buildingBlocks {
                    ... on LeftRightSplitRecord {
                        id
                        reverseLeftRight
                        left {
                            ...TextWithLinkBlockFragment
                            ...ImageBlockFragment
                            ...StructTextBlockFragment
                        }
                        right {
                            ...TextWithLinkBlockFragment
                            ...ImageBlockFragment
                            ...StructTextBlockFragment
                        }
                    }
                    ...StructTextBlockFragment
                    ...TextWithLinkBlockFragment
                }
                features {
                    id
                    name
                    icon {
                        ...FileFragment
                    }
                }
            }
        }`,
  [
    FileFragment,
    ImageBlockFragment,
    StructTextBlockFragment,
    TextWithLinkBlockFragment,
  ],
);
