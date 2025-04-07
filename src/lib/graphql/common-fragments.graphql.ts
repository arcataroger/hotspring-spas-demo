// noinspection GraphQLUnresolvedReference

import {gql} from "@/lib/graphql/gqltada";

export const FileFragment = gql(
    `fragment FileFragment on FileField @_unmask {
        id
        title
        thumbhash
        tags
        smartTags
        md5
        mimeType
        alt
        author
        basename
        blurUpThumb
        blurhash
        copyright
        exifInfo
        customData
        format
        height
        width
        responsiveImage {
            src
            srcSet
            sizes
            base64
            bgColor
            aspectRatio
            height
            width
        }
        video {
            thumbnailUrl
            thumbhash
            streamingUrl
            title
            width
            height
            blurUpThumb
            blurhash
            alt
        }
    }
    `,
);


export const ImageFragment = gql(
        `fragment ImageFragment on ImageFileField @_unmask {
        id
        title
        thumbhash
        tags
        smartTags
        md5
        mimeType
        alt
        author
        basename
        blurUpThumb
        blurhash
        copyright
        exifInfo
        customData
        format
        height
        width
        responsiveImage {
            src
            srcSet
            webpSrcSet
            sizes
            base64
            bgColor
            aspectRatio
            height
            width
        }
        video {
            thumbnailUrl
            thumbhash
            streamingUrl
            title
            width
            height
            blurUpThumb
            blurhash
            alt
        }
    }
    `,
);