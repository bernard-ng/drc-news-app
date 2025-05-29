import React from "react";

import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Theme } from "tamagui";

import { RootProviders } from "@/providers/root-providers";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const insets = useSafeAreaInsets();

    return (
        <React.StrictMode>
            <RootProviders>
                <Theme name={colorScheme || "dark"}>
                    <Stack screenOptions={{ headerShown: false }} />
                    <Toast topOffset={insets.top + 10} position="top" visibilityTime={6_000} />
                </Theme>
            </RootProviders>
        </React.StrictMode>
    );
}
