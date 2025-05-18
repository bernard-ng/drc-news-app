import type React from "react";

import { Link } from "expo-router";
import { GetProps, Paragraph, styled, XStack, YStack } from "tamagui";

import { SourceOverview } from "@/api/aggregator/source";
import SourceFollowButton from "@/ui/components/content/source/SourceFollowButton";
import SourceProfileImage from "@/ui/components/content/source/SourceProfileImage";

const SourceCardFrame = styled(YStack, {
    alignItems: "center",
    gap: "$2",
    borderRadius: "$4",

    variants: {
        horizontal: {
            true: {
                maxWidth: 100,
                flexShrink: 0,
            },
            false: {
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                gap: "$4",
                paddingVertical: "$2",
            },
        },
    },
} as const);

type SourceCardProps = GetProps<typeof SourceCardFrame> & {
    data: SourceOverview;
    horizontal?: boolean;
};

export function SourceOverviewCard(props: SourceCardProps) {
    const { data, horizontal = true, ...rest } = props;

    const nameFontSize = horizontal ? "$3" : "$4";

    return (
        <SourceCardFrame horizontal={horizontal} {...rest}>
            <Link href={`/(authed)/(tabs)/sources/${data.name}`}>
                <SourceProfileImage name={data.name} image={data.image} size={horizontal ? 65 : 50} />
            </Link>

            <Link href={`/(authed)/(tabs)/sources/${data.name}`} asChild>
                {horizontal ? (
                    <Paragraph
                        fontSize={nameFontSize}
                        fontWeight="bold"
                        numberOfLines={1}
                        textAlign="center"
                        maxWidth="100%"
                    >
                        {data.displayName ?? data.name}
                    </Paragraph>
                ) : (
                    <YStack flex={1} gap="$1">
                        <XStack alignItems="center" gap="$1">
                            <Paragraph fontSize={nameFontSize} fontWeight="bold" numberOfLines={1}>
                                {data.displayName ?? data.name}
                            </Paragraph>
                        </XStack>

                        <Paragraph color="$accent6" fontSize="$3" numberOfLines={1}>
                            {data.url}
                        </Paragraph>
                    </YStack>
                )}
            </Link>

            <SourceFollowButton name={data.name} followed={data.followed} />
        </SourceCardFrame>
    );
}
