import React, { useMemo, useState } from "react";

import { User } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Button, YStack } from "tamagui";

import { useRegister } from "@/api/identity-and-access/register";
import { ErrorResponse, safeMessage } from "@/api/shared";
import { BackButton } from "@/ui/components/controls/BackButton";
import { EmailInput, PasswordInput, TextInput } from "@/ui/components/controls/forms";
import { ScreenView } from "@/ui/components/layout";
import { Heading, Text, Caption } from "@/ui/components/typography";

export default function SingUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { mutate, isPending, error } = useRegister();

    const isFormValid = useMemo(() => {
        return email.trim().length > 0 && password.trim().length > 0 && name.trim().length > 0;
    }, [email, password, name]);

    if (error) {
        Toast.show({
            text1: "Erreur",
            text2: safeMessage(error),
            type: "error",
        });
    }

    const handleSubmit = () => {
        mutate(
            { name, email, password },
            {
                onSuccess: () => {
                    Toast.show({
                        text1: "Félicitations !",
                        text2: "les détails de votre compte vous ont été envoyés par e-mail.",
                        type: "success",
                    });
                    router.replace("/(unauthed)/signin");
                },
                onError: (error: ErrorResponse) => {
                    Toast.show({
                        text1: "Erreur",
                        text2: safeMessage(error),
                        type: "error",
                    });
                },
            }
        );
    };

    return (
        <ScreenView>
            {router.canGoBack() && <BackButton onPress={() => router.back()} />}
            <YStack flex={1} gap="$4" width="100%" justifyContent="flex-start">
                <YStack gap="$4">
                    <Heading>Inscription</Heading>
                    <Text>Rejoignez la communauté CongoNews et restez informé des dernières actualités</Text>
                </YStack>

                <YStack gap="$2">
                    <TextInput
                        leadingAdornment={User}
                        label="Nom complet"
                        onChangeText={setName}
                        placeholder="John Doe"
                    />
                    <EmailInput label="Email" onChangeText={setEmail} />
                    <PasswordInput onChangeText={setPassword} placeholder="Mot de passe" />
                </YStack>
                <Caption>
                    En continuant, vous acceptez les conditions d&#39;utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
                <Link href="/signin">
                    <Text>Vous avez un compte ? Connectez-vous</Text>
                </Link>
            </YStack>
            <Button
                width="100%"
                onPress={handleSubmit}
                disabled={!isFormValid || isPending}
                theme={!isFormValid || isPending ? "disabled" : "accent"}
                fontWeight="bold"
            >
                {isPending ? <ActivityIndicator /> : "Créer un compte"}
            </Button>
        </ScreenView>
    );
}
