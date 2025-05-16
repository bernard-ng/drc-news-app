import type React from "react";
import { useState } from "react";

import { Button, GetProps } from "tamagui";

type FollowToggleButtonProps = GetProps<typeof Button> & {
    source: string;
    followed: boolean;
};

export default function FollowToggleButton(props: FollowToggleButtonProps) {
    const { followed, source, ...rest } = props;
    const [isFollowed, setIsFollowed] = useState<boolean>(followed);

    const handlePress = () => {
        setIsFollowed(!isFollowed);
        console.log(source); // request client to follow/unfollow
    };

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
            {isFollowed ? "Suivi" : "Suivre"}
        </Button>
    );
}
