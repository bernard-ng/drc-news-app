import React from "react";

import { GetProps, Label, Switch as TamaguiSwitch, XStack, YStack } from "tamagui";

import Caption from "@/ui/components/typography/Caption";

type SwitchProps = GetProps<typeof TamaguiSwitch> & {
    label: string;
    description?: string;
    isChecked: boolean;
    onCheckedChange: (checked: boolean) => void;
    id?: string;
};

export default function Switch(props: SwitchProps) {
    const { label, description, isChecked, onCheckedChange, id, ...rest } = props;

    return (
        <XStack alignItems="center" gap="$10" justifyContent="space-between" width="100%">
            <YStack flex={1} gap="$1">
                <Label fontWeight="bold" htmlFor={id}>
                    {label}
                </Label>
                {description && <Caption>{description}</Caption>}
            </YStack>
            <TamaguiSwitch id={id} checked={isChecked} onCheckedChange={onCheckedChange} size="$3" {...rest}>
                <TamaguiSwitch.Thumb animation="bouncy" />
            </TamaguiSwitch>
        </XStack>
    );
}
