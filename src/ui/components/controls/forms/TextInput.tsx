import React from "react";

import Input, { InputProps } from "@/ui/components/controls/forms/Input";

export default function TextInput(props: InputProps) {
    const { label, caption, error, leadingAdornment, onChangeText, ...rest } = props;

    return (
        <Input
            label={label}
            caption={caption}
            error={error}
            leadingAdornment={leadingAdornment}
            onChangeText={onChangeText}
            {...rest}
        />
    );
}
