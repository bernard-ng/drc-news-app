import React from "react";

import { Link } from "expo-router";
import { Avatar, GetProps, Paragraph, XStack } from "tamagui";

import { SourceReference } from "@/api/aggregator/source";

type SourceReferencePillProps = GetProps<typeof XStack> & {
    data: SourceReference;
};

export default function SourceReferencePill(props: SourceReferencePillProps) {
    const { data, ...rest } = props;

    return (
        <Link href={`/(authed)/(tabs)/sources/${data.name}`}>
            <XStack alignItems="center" gap="$2" justifyContent="flex-start" {...rest}>
                <Avatar circular size="$1">
                    <Avatar.Image
                        accessibilityLabel={data.name}
                        objectFit="contain"
                        backgroundColor="white"
                        source={{
                            uri: data.image,
                            cache: "force-cache",
                        }}
                    />
                    <Avatar.Fallback backgroundColor="$gray10" />
                </Avatar>
                <Paragraph size="$2" fontWeight="bold">
                    {data.displayName ?? data.name}
                </Paragraph>
            </XStack>
        </Link>
    );
}
