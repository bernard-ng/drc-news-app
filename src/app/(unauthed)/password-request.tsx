import React, { useState } from "react";

import { Link, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Button, YStack } from "tamagui";

import { usePasswordForgotten } from "@/api/identity-and-access/password";
import { ErrorResponse, safeMessage } from "@/api/shared";
import { BackButton } from "@/ui/components/controls/BackButton";
import { EmailInput } from "@/ui/components/controls/forms";
import { ScreenView } from "@/ui/components/layout";
import { Heading, Text } from "@/ui/components/typography";

export default function PasswordRequest() {
    const [email, setEmail] = useState("");
    const { mutate, isPending } = usePasswordForgotten();
    const disabled = isPending || email.length === 0;
    const router = useRouter();

    const handleRequest = () => {
        mutate(
            { email },
            {
                onSuccess: () => {
                    Toast.show({
                        text1: "Succès",
                        text2: "Un mail avec les instructions vous a été envoyé",
                        type: "success",
                    });
                    router.push("/(unauthed)/signin");
                },
                onError: (error: ErrorResponse) => {
                    Toast.show({
                        text1: "Erreur de connexion",
                        text2: safeMessage(error),
                        type: "error",
                    });
                },
            }
        );
    };

    return (
        <ScreenView>
            {router.canGoBack() && <BackButton onPress={() => router.dismissTo("/(unauthed)/signin")} />}
            <YStack flex={1} gap="$4" width="100%" justifyContent="flex-start">
                <YStack gap="$4">
                    <Heading>Mot de passe oublié ?</Heading>
                    <Text>
                        Veuillez entrer votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
                    </Text>
                </YStack>

                <EmailInput label="Email" onChangeText={setEmail} placeholder="Addresse e-mail" />

                <Link href="/signin" asChild>
                    <Text>Vous avez pas de compte ? Se connecter</Text>
                </Link>
            </YStack>
            <Button
                width="100%"
                disabled={disabled}
                onPress={handleRequest}
                theme={disabled ? "disabled" : "accent"}
                fontWeight="bold"
            >
                {isPending ? <ActivityIndicator /> : "Réinitialiser le mot de passe"}
            </Button>
        </ScreenView>
    );
}
