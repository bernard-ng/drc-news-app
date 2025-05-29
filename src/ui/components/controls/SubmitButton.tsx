import { ActivityIndicator } from "react-native";
import { Button, GetProps, styled } from "tamagui";

const StyledButton = styled(Button, {
    fontWeight: "bold",
    width: "100%",
});

type SubmitButtonProps = GetProps<typeof StyledButton> & {
    label: string;
    isFormValid: boolean;
    isPending: boolean;
    handleSubmit: () => void;
};

export const SubmitButton = (props: SubmitButtonProps) => {
    const { isFormValid, isPending, label, handleSubmit, ...rest } = props;

    return (
        <StyledButton
            onPress={handleSubmit}
            disabled={!isFormValid || isPending}
            theme={!isFormValid || isPending ? "disabled" : "accent"}
            fontWeight="bold"
            {...rest}
        >
            {isPending ? <ActivityIndicator /> : label}
        </StyledButton>
    );
};
