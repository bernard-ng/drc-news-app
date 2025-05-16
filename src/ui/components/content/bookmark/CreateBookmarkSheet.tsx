import React, { useCallback, useEffect, useState } from "react";

import { Sheet } from "@tamagui/sheet";
import Toast from "react-native-toast-message";
import { Button, YStack } from "tamagui";

import { useCreateBookmark } from "@/api/feed-management/bookmark";
import { ErrorResponse, safeMessage } from "@/api/shared";
import Switch from "@/ui/components/controls/forms/Switch";
import TextArea from "@/ui/components/controls/forms/TextArea";
import TextInput from "@/ui/components/controls/forms/TextInput";
import SubmitButton from "@/ui/components/controls/SubmitButton";

export default function CreateBookmarkSheet() {
    const { mutate, isPending, error } = useCreateBookmark();
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    const isFormValid = name.trim().length > 0;

    useEffect(() => {
        if (error) {
            Toast.show({
                text1: "Erreur",
                text2: safeMessage(error),
                type: "error",
            });
        }
    }, [error]);

    const handleSubmit = useCallback(() => {
        mutate(
            { name, description, isPublic },
            {
                onSuccess: () => {
                    setName("");
                    setDescription("");
                    setIsPublic(false);
                    Toast.show({
                        text1: "Félicitations !",
                        text2: "Votre signet a été créé avec succès.",
                        type: "success",
                    });
                    setOpen(false);
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
    }, [description, isPublic, mutate, name]);

    return (
        <YStack alignItems="center" justifyContent="center">
            <Button onPress={() => setOpen(true)}>Ajouter un signet</Button>

            <Sheet
                modal={true}
                open={open}
                onOpenChange={setOpen}
                snapPointsMode="percent"
                snapPoints={[65, 90]}
                dismissOnOverlayPress={true}
                dismissOnSnapToBottom={true}
                animation="medium"
            >
                <Sheet.Overlay
                    animation="lazy"
                    backgroundColor="rgba(0, 0, 0, 0.8)"
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                />
                <Sheet.Frame
                    flex={1}
                    backgroundColor="$background"
                    padding="$4"
                    gap="$4"
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <YStack width="100%">
                        <Sheet.Handle theme="accent" />
                        <TextInput
                            id="bookmark-name"
                            label="Name"
                            caption="Enter a name for your bookmark."
                            onChangeText={setName}
                            placeholder="My awesome bookmark"
                        />
                        <TextArea
                            id="bookmark-description"
                            caption="Describe your bookmark for easy retrieval."
                            label="Description"
                            onChangeText={setDescription}
                            placeholder="A brief description..."
                        />
                        <Switch
                            id="bookmark-public"
                            label="Public"
                            description="A public bookmark is visible and accessible to other users"
                            isChecked={isPublic}
                            onCheckedChange={setIsPublic}
                        />
                    </YStack>
                    <SubmitButton
                        label="Créer le signet"
                        handleSubmit={handleSubmit}
                        isPending={isPending}
                        isFormValid={isFormValid}
                    />
                </Sheet.Frame>
            </Sheet>
        </YStack>
    );
}
