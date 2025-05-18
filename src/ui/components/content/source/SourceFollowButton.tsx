import type React from "react";
import { useState } from "react";

import { Button, GetProps } from "tamagui";

type SourceFollowButtonProps = GetProps<typeof Button> & {
    name: string;
    followed: boolean;
};

export default function SourceFollowButton(props: SourceFollowButtonProps) {
    const { followed, name, ...rest } = props;
    const [isFollowed, setIsFollowed] = useState<boolean>(followed);

    const handlePress = () => {
        setIsFollowed(!isFollowed);
        console.log(name); // request client to follow/unfollow
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
