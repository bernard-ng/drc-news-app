import React, { useMemo, useState } from "react";

import { Mail } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Button, YStack } from "tamagui";

import { useLogin } from "@/api/request/identity-and-access/login";
import { LoginResponse } from "@/api/schema/identity-and-access/login";
import { ErrorResponse, safeMessage } from "@/api/shared";
import { useAuth } from "@/providers/auth-provider";
import { BackButton } from "@/ui/components/controls/BackButton";
import { EmailInput, PasswordInput } from "@/ui/components/controls/forms";
import { ScreenView } from "@/ui/components/layout";
import { Caption, Heading, Text } from "@/ui/components/typography";

export default function SignIn() {
    const auth = useAuth();
    const router = useRouter();

    if (auth.isLoggedIn) {
        router.replace("/(authed)/(tabs)/articles");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate, isPending } = useLogin();

    const isFormValid = useMemo(() => {
        return email.trim().length > 0 && password.trim().length > 0;
    }, [email, password]);

    const handleSubmit = () => {
        mutate(
            { username: email, password },
            {
                onSuccess: async (data: LoginResponse) => {
                    auth.login(data.token, data.refresh_token);
                    Toast.show({ text1: "Connexion réussie", type: "success" });
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
            {router.canGoBack() && <BackButton onPress={() => router.back()} />}
            <YStack flex={1} gap="$4" width="100%" justifyContent="flex-start">
                <YStack gap="$4">
                    <Heading>Connexion</Heading>
                    <Text>Bienvenue sur CongoNews, la plateforme d&#39;actualités intelligente</Text>
                </YStack>

                <YStack gap="$2">
                    <EmailInput
                        label="Email"
                        value={email}
                        leadingAdornment={Mail}
                        onChangeText={setEmail}
                        placeholder="Adresse e-mail"
                    />
                    <YStack gap="$2">
                        <PasswordInput value={password} onChangeText={setPassword} placeholder="Mot de passe" />
                        <Link href="/password-request" asChild>
                            <Text color="$accent6"> Mot de passe oublié ?</Text>
                        </Link>
                    </YStack>
                </YStack>

                <Caption>
                    En continuant, vous acceptez les conditions d&#39;utilisation de CongoNews et reconnaissez avoir lu
                    notre politique de confidentialité.
                </Caption>
                <Link href="/signup" asChild>
                    <Text>Vous n&#39;avez pas de compte ? Créer un compte</Text>
                </Link>
            </YStack>
            <Button
                width="100%"
                disabled={!isFormValid || isPending}
                onPress={handleSubmit}
                theme={!isFormValid || isPending ? "disabled" : "accent"}
                fontWeight="bold"
            >
                {isPending ? <ActivityIndicator /> : "Se connecter"}
            </Button>
        </ScreenView>
    );
}
