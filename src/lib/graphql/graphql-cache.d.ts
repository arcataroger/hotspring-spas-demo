/* eslint-disable */
/* prettier-ignore */
import type { TadaDocumentNode, $tada } from 'gql.tada';

declare module 'gql.tada' {
 interface setupCache {
    "fragment FileFragment on FileField @_unmask {\n        id\n        title\n        thumbhash\n        tags\n        smartTags\n        md5\n        mimeType\n        alt\n        author\n        basename\n        blurUpThumb\n        blurhash\n        copyright\n        exifInfo\n        customData\n        format\n        height\n        width\n        responsiveImage {\n            src\n            srcSet\n            sizes\n            base64\n            bgColor\n            aspectRatio\n            height\n            width\n        }\n        video {\n            thumbnailUrl\n            thumbhash\n            streamingUrl\n            title\n            width\n            height\n            blurUpThumb\n            blurhash\n            alt\n        }\n    }\n    ":
      TadaDocumentNode<{ id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number | null; width: number | null; responsiveImage: { src: string; srcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; } | null; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }, {}, { fragment: "FileFragment"; on: "FileField"; masked: false; }>;
    "fragment ImageFragment on ImageFileField @_unmask {\n        id\n        title\n        thumbhash\n        tags\n        smartTags\n        md5\n        mimeType\n        alt\n        author\n        basename\n        blurUpThumb\n        blurhash\n        copyright\n        exifInfo\n        customData\n        format\n        height\n        width\n        responsiveImage {\n            src\n            srcSet\n            webpSrcSet\n            sizes\n            base64\n            bgColor\n            aspectRatio\n            height\n            width\n        }\n        video {\n            thumbnailUrl\n            thumbhash\n            streamingUrl\n            title\n            width\n            height\n            blurUpThumb\n            blurhash\n            alt\n        }\n    }\n    ":
      TadaDocumentNode<{ id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }, {}, { fragment: "ImageFragment"; on: "ImageFileField"; masked: false; }>;
    "\n        fragment ImageBlockFragment on ImageBlockRecord @_unmask {\n            id\n            __typename\n            image {\n                ...ImageFragment\n            }\n        }":
      TadaDocumentNode<{ id: string; __typename: "ImageBlockRecord"; image: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }, {}, { fragment: "ImageBlockFragment"; on: "ImageBlockRecord"; masked: false; }>;
    "    fragment StructTextBlockFragment on StructuredTextBlockRecord @_unmask {\n    id\n    __typename\n    structuredText {\n        value\n        blocks\n        inlineBlocks\n        links\n    }\n}":
      TadaDocumentNode<{ id: string; __typename: "StructuredTextBlockRecord"; structuredText: { value: unknown; blocks: string[]; inlineBlocks: string[]; links: string[]; } | null; }, {}, { fragment: "StructTextBlockFragment"; on: "StructuredTextBlockRecord"; masked: false; }>;
    " fragment TextWithLinkBlockFragment on TextWithLinkBlockRecord @_unmask {\n        id\n        title\n        linkUrl\n        linkText\n        bodyText\n    }\n    ":
      TadaDocumentNode<{ id: string; title: string | null; linkUrl: string | null; linkText: string | null; bodyText: string | null; }, {}, { fragment: "TextWithLinkBlockFragment"; on: "TextWithLinkBlockRecord"; masked: false; }>;
    "fragment ColorCombinationFragment on ColorCombinationRecord @_unmask {\n        id\n        shells {\n            id\n            name\n            thumbnail {\n                ...ImageFragment\n            }\n        }\n        cabinet {\n            id\n            name\n            thumbnail {\n                ...ImageFragment\n            }\n        }\n    }":
      TadaDocumentNode<{ id: string; shells: { id: string; name: string; thumbnail: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }[]; cabinet: { id: string; name: string; thumbnail: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }; }, {}, { fragment: "ColorCombinationFragment"; on: "ColorCombinationRecord"; masked: false; }>;
    "\n        query SpaQuery($slug: String) {\n            spa (filter: {slug: {eq: $slug}}) {\n                id\n                internalName\n                thumbnail {\n                    ...FileFragment\n                }\n                slug\n                name\n                description {\n                    value\n                }\n                estimatedEnergyConsumption\n                capacity\n                specifications {\n                    value\n                    label\n                    id\n                }\n                collection {\n                    id\n                    name\n                    description\n                }\n                colorCombinations {\n                    ...ColorCombinationFragment\n                }\n                gallery {\n                    url\n                }\n                buildingBlocks {\n                    ... on LeftRightSplitRecord {\n                        id\n                        reverseLeftRight\n                        left {\n                            ...TextWithLinkBlockFragment\n                            ...ImageBlockFragment\n                            ...StructTextBlockFragment\n                        }\n                        right {\n                            ...TextWithLinkBlockFragment\n                            ...ImageBlockFragment\n                            ...StructTextBlockFragment\n                        }\n                    }\n                    ...StructTextBlockFragment\n                    ...TextWithLinkBlockFragment\n                }\n                features {\n                    id\n                    name\n                    icon {\n                        id\n                        url\n                        width\n                        height\n                        alt\n                    }\n                }\n            }\n        }":
      TadaDocumentNode<{ spa: { id: string; internalName: string; thumbnail: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number | null; width: number | null; responsiveImage: { src: string; srcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; } | null; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; } | null; slug: string; name: string | null; description: { value: unknown; } | null; estimatedEnergyConsumption: number | null; capacity: number | null; specifications: { value: string; label: string; id: string; }[]; collection: { id: string; name: string | null; description: string | null; } | null; colorCombinations: { id: string; shells: { id: string; name: string; thumbnail: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }[]; cabinet: { id: string; name: string; thumbnail: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }; }[]; gallery: { url: string; }[]; buildingBlocks: ({ __typename: "StructuredTextBlockRecord"; id: string; structuredText: { value: unknown; blocks: string[]; inlineBlocks: string[]; links: string[]; } | null; } | { __typename?: "TextWithLinkBlockRecord" | undefined; id: string; title: string | null; linkUrl: string | null; linkText: string | null; bodyText: string | null; } | { __typename?: "LeftRightSplitRecord" | undefined; id: string; reverseLeftRight: boolean; left: { __typename: "StructuredTextBlockRecord"; id: string; structuredText: { value: unknown; blocks: string[]; inlineBlocks: string[]; links: string[]; } | null; } | { __typename?: "TextWithLinkBlockRecord" | undefined; id: string; title: string | null; linkUrl: string | null; linkText: string | null; bodyText: string | null; } | { __typename: "ImageBlockRecord"; id: string; image: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }; right: { __typename: "StructuredTextBlockRecord"; id: string; structuredText: { value: unknown; blocks: string[]; inlineBlocks: string[]; links: string[]; } | null; } | { __typename?: "TextWithLinkBlockRecord" | undefined; id: string; title: string | null; linkUrl: string | null; linkText: string | null; bodyText: string | null; } | { __typename: "ImageBlockRecord"; id: string; image: { id: string; title: string | null; thumbhash: string | null; tags: string[]; smartTags: string[]; md5: string; mimeType: string; alt: string | null; author: string | null; basename: string; blurUpThumb: string | null; blurhash: string | null; copyright: string | null; exifInfo: Record<string, string>; customData: Record<string, string>; format: string; height: number; width: number; responsiveImage: { src: string; srcSet: string; webpSrcSet: string; sizes: string; base64: string | null; bgColor: string | null; aspectRatio: number; height: number; width: number; }; video: { thumbnailUrl: string; thumbhash: string | null; streamingUrl: string; title: string | null; width: number; height: number; blurUpThumb: string | null; blurhash: string | null; alt: string | null; } | null; }; }; })[]; features: { id: string; name: string; icon: { id: string; url: string; width: number | null; height: number | null; alt: string | null; }; }[]; } | null; }, { slug?: string | null | undefined; }, void>;
    "\n        query EnergyCalcQuery {\n            allClimates(orderBy: name_ASC) {\n                id\n                name\n                averageTemperature\n                electricityRate\n            }\n            allSpas(orderBy: capacity_ASC) {\n                id\n                slug\n                name\n                estimatedEnergyConsumption\n                capacity\n            }\n        }":
      TadaDocumentNode<{ allClimates: { id: string; name: string; averageTemperature: number; electricityRate: number; }[]; allSpas: { id: string; slug: string; name: string | null; estimatedEnergyConsumption: number | null; capacity: number | null; }[]; }, {}, void>;
    "\n            query allSpasQuery {\n                allSpas(first: 500) {\n                    slug\n                }\n            }":
      TadaDocumentNode<{ allSpas: { slug: string; }[]; }, {}, void>;
  }
}
