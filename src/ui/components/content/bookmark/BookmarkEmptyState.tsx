import { Paragraph, YStack } from "tamagui";

import BookmarkIllustration from "@/assets/illustrations/BookmarkIllustration";
import CreateBookmarkSheet from "@/ui/components/content/bookmark/CreateBookmarkSheet";
import Heading from "@/ui/components/typography/Heading";

export default function BookmarkEmptyState() {
    return (
        <YStack flex={1} alignItems="center" justifyContent="center" gap="$2">
            <BookmarkIllustration width={250} height={250} />
            <Heading alignSelf="center">Empty Bookmarks</Heading>
            <Paragraph textAlign="center">
                Create a bookmark to save your favorite articles and access them later.
            </Paragraph>

            <CreateBookmarkSheet />
        </YStack>
    );
}
