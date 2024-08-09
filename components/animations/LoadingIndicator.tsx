import { Animated, Dimensions, View } from "react-native";
import { SecondaryView, TextSecondary } from "../Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef } from "react";
import { styles } from "../util/Theme";

type LoadingIndicatorProps = {
    displayText: string;
};

export default function LoadingIndicator({ displayText }: LoadingIndicatorProps ) {
    const theme = useAppSelector((state) => state.theme.colors);
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const pan = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pan, {
                    toValue: screenWidth + 100, // Adjust for icon size
                    duration: 2000,
                    delay: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pan, screenWidth]);

    return (
        <SecondaryView style={[styles.container]}>
            <Animated.View
                style={[styles.alignContentStart, {
                    position: 'absolute',
                    zIndex: 100,
                    marginTop: screenHeight / 2,
                    transform: [
                        {
                            translateX: pan,
                        },
                    ],
                }]}
            >
                <FontAwesome5 style={[{
                    transform: [
                        { rotate: '45deg', },
                        { scale: 1.5 },
                        { translateX: -60 },
                    ]
                }]}
                    name="location-arrow" size={38} color={theme.textPrimary} />
            </Animated.View>
            <View style={[styles.justified, styles.container, { marginTop: 50 }]}>
                <TextSecondary style={[styles.getStartedText, { color: theme.background }]}>
                    {displayText}
                </TextSecondary>
            </View>
        </SecondaryView>
    );
}
