// noinspection GraphQLUnresolvedReference

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
        __typename
        id
        title
        linkUrl
        linkText
        bodyText
    }
    `,
  [ImageFragment],
);

export const ConfiguratorImageFragment = gql(
        `fragment ConfiguratorImageFragment on ImageFileField @_unmask {
        responsiveImage(imgixParams: {fm: jpg}) {
            src
            height
            width
        }
    }
    `,
);

export const ShellWithPhotoFragment = gql(
  `fragment ShellWithPhotoFragment on ShellWithPhotoRecord @_unmask {
        __typename
        shell {
            id
        }
        shellPhoto {
            ...ConfiguratorImageFragment
        }
    }`,
  [ConfiguratorImageFragment],
);

export const ColorCombinationFragment = gql(
  `fragment ColorCombinationFragment on ColorCombinationRecord @_unmask {
        id
        shells {
            id
            name
            thumbnail {
                ...ConfiguratorImageFragment
            }
        }
        cabinet {
            id
            name
            thumbnail {
                ...ConfiguratorImageFragment
            }
        }
        cabinetPhoto {
            ...ConfiguratorImageFragment
        }
    }`,
  [ConfiguratorImageFragment],
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
                shellPhotos {
                    ...ShellWithPhotoFragment
                }
                colorCombinations {
                    ...ColorCombinationFragment
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
                        id
                        url
                        width
                        height
                        alt
                    }
                }
            }
        }`,
  [
    FileFragment,
    ImageBlockFragment,
    StructTextBlockFragment,
    TextWithLinkBlockFragment,
    ColorCombinationFragment,
    ShellWithPhotoFragment,
  ],
);
