import { useState } from "react";
import { Animated } from "react-native";

export const useFadeIn = (duration: number = 500, delay: number = 0) => {
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    const fadeIn = () => {
        Animated.timing(opacity, {
        toValue: 1,
        delay: delay,
        duration: duration,
        useNativeDriver: true,
        }).start();
    };
    return { opacity, fadeIn };
};