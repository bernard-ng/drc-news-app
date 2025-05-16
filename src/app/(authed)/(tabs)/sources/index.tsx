import { SourceOverview, useSourceOverviewList } from "@/api/aggregator/source";
import useFlattenedItems from "@/hooks/useFlattenedItems";
import SourceList from "@/ui/components/content/source/SourceList";
import SourceSkeletonList from "@/ui/components/content/source/SourceSkeleton";
import ScreenView from "@/ui/components/layout/ScreenView";

export default function Sources() {
    const { data, isLoading } = useSourceOverviewList();
    const sources: SourceOverview[] = useFlattenedItems(data);

    return (
        <ScreenView>
            <ScreenView.Heading title="Sources" />

            {isLoading && <SourceSkeletonList horizontal={false} />}
            {!isLoading && <SourceList data={sources} horizontal={false} />}
        </ScreenView>
    );
}
