import type React from "react";

import { GetProps, Image, styled } from "tamagui";

const StyledImage = styled(Image, {
    borderRadius: "$12",
    backgroundColor: "white",
});

type SourceAvatarProps = GetProps<typeof StyledImage> & {
    size?: number;
    width?: number;
    height?: number;
    source: string;
};

export default function SourceAvatar(props: SourceAvatarProps) {
    const { source, width, height, size, ...rest } = props;
    const resolvedSize = size ?? width ?? height ?? 50;

    return (
        <StyledImage
            source={{
                uri: `https://devscast.org/images/sources/${source}.png`,
                cache: "force-cache",
            }}
            objectFit="contain"
            width={resolvedSize}
            height={resolvedSize}
            {...rest}
        />
    );
}
