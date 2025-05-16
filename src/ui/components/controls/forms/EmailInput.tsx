import { Mail } from "@tamagui/lucide-icons";

import Input, { InputProps } from "@/ui/components/controls/forms/Input";

export default function EmailInput(props: InputProps) {
    const { label, caption, error, onChangeText, ...rest } = props;

    return (
        <Input
            label={label}
            caption={caption}
            error={error}
            leadingAdornment={Mail}
            onChangeText={onChangeText}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="votre@email.com..."
            {...rest}
        />
    );
}
