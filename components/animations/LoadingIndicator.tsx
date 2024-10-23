import { Animated, Dimensions, View } from "react-native";
import { TextSecondary, ThirdView } from "../Themed";
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
    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pan, {
                    toValue: screenWidth + 100, // Adjust for icon size
                    duration: 2000,
                    delay: 250,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pan, screenWidth]);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotate, {
                    toValue: 1,
                    duration: 500,
                    delay: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(rotate, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                })
            ])
        ).start();
    },[rotate]);

    return (
        <ThirdView style={[styles.container]}>
            <Animated.View
                style={[styles.alignContentStart, {
                    position: 'absolute',
                    zIndex: 100,
                    marginTop: screenHeight / 2,
                    transform: [
                        {
                            translateX: pan
                        },
                        {
                            translateY: -50
                        }
                    ],
                }]}
            >
                <Animated.View
                    style={{
                        transform: [
                            {
                                rotate: rotate.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '-45deg']
                                })
                            },
                        ],
                        left: -60,
                    }}
                >
                    <FontAwesome5 style={[{
                        transform: [
                            { scale: 1.5 },
                        ],
                    }]}
                        name="shopping-cart" size={38} color={theme.iconColor} />
            </Animated.View>
                </Animated.View>
            <View style={[styles.justified, styles.container, { marginTop: 50 }]}>
                <TextSecondary style={[styles.getStartedText, { color: theme.textPrimary }]}>
                    {displayText}
                </TextSecondary>
            </View>
        </ThirdView>
    );
}
