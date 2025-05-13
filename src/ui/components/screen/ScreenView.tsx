import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {styled, YStack} from "tamagui";
import {StatusBar} from "expo-status-bar";
import {ScreenHeading} from "./ScreenHeading";

type ScreenViewProps = React.ComponentProps<typeof YStack> & {
    showStatusBar?: boolean;
    statusBarStyle?: "auto" | "inverted" | "light" | "dark";
    statusBarBackgroundColor?: string;
    children?: React.ReactNode;
};

type ScreenViewComponent = React.FC<React.PropsWithChildren<ScreenViewProps>> & {
    Heading: typeof ScreenHeading;
};

const ScreenContent = styled(YStack, {
    flex: 1,
    gap: "$4",
    paddingHorizontal: "$4",
    alignItems: "center",
});

const ScreenView: ScreenViewComponent = (props) => {
    const {
        showStatusBar = true,
        statusBarStyle = "auto",
        statusBarBackgroundColor = "transparent",
        padding,
        children,
        ...rest
    } = props;
    const insets = useSafeAreaInsets();

    let headingElement: React.ReactNode | null = null;
    const otherChildren: React.ReactNode[] = [];

    // Iterate through children to find the Heading and separate others
    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type === ScreenView.Heading) {
                headingElement = child;
            } else {
                otherChildren.push(child);
            }
        } else {
            otherChildren.push(child);
        }
    });

    return (
        <>
            {showStatusBar ? <StatusBar style={statusBarStyle} backgroundColor={statusBarBackgroundColor}/> : null}

            <YStack flex={1} paddingTop={insets.top} backgroundColor="$background">
                {headingElement}

                <ScreenContent
                    paddingBottom={insets.bottom}
                    paddingHorizontal={padding ?? rest.paddingHorizontal ?? "$4"}
                    {...rest}
                >
                    {otherChildren}
                </ScreenContent>
            </YStack>
        </>
    );
};

ScreenView.Heading = ScreenHeading;

export default ScreenView;
