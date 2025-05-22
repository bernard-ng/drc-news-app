import React, { useCallback, useState } from "react";

import { ActivityIndicator, Alert } from "react-native";
import { Button, GetProps } from "tamagui";

import { useFollowSource, useUnfollowSource } from "@/api/feed-management/source";

type SourceFollowButtonProps = GetProps<typeof Button> & {
    name: string;
    followed: boolean;
};

export default function SourceFollowButton(props: SourceFollowButtonProps) {
    const { followed, name, ...rest } = props;
    const [isFollowed, setIsFollowed] = useState<boolean>(followed);
    const { mutate: follow, isPending: following } = useFollowSource(name);
    const { mutate: unfollow, isPending: unfollowing } = useUnfollowSource(name);
    const loading = following || unfollowing;

    const handlePress = useCallback(() => {
        if (isFollowed) {
            Alert.alert(
                "Confirmation",
                `Êtes-vous sûr de vouloir ne plus suivre ${name} ?`,
                [
                    {
                        text: "Annuler",
                        style: "cancel",
                    },
                    {
                        text: "Ne plus suivre",
                        style: "destructive",
                        onPress: () => {
                            unfollow();
                            setIsFollowed(prev => !prev);
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            follow();
            setIsFollowed(prev => !prev);
        }
    }, [isFollowed, name, unfollow, follow, setIsFollowed]);

    return (
        <Button
            size="$2"
            theme={isFollowed ? "alt1" : "surface1"}
            chromeless={isFollowed}
            onPress={handlePress}
            minWidth={80}
            paddingHorizontal="$2"
            {...rest}
        >
            {loading ? <ActivityIndicator /> : isFollowed ? "Suivi" : "Suivre"}
        </Button>
    );
}
