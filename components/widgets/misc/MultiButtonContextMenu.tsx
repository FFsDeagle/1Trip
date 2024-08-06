import { styles } from "@/components/util/Theme";
import { Animated, View } from "react-native";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { SecondaryView, TouchableOpacity } from "@/components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "@/app/store/hooks";
import { useFocusEffect } from "expo-router";

export type MultiButtonContextMenuProps = {
    buttons: ReactNode[];
};

export default function MultiButtonContextMenu(props: MultiButtonContextMenuProps) {
    const [showItems, setShowItems] = useState<boolean>(false);
    const [buttonList, setButtonList] = useState<ReactNode[]>([]);
    const theme = useAppSelector((state) => state.theme);
    const expandAnim = useRef(new Animated.Value(0)).current;

    // Initialize buttons list with a cancel button
    useEffect(() => {
        setButtonList([
            ...props.buttons,
            <TouchableOpacity
                style={{ marginLeft: 25 }}
                key="cancel"
                onPress={() => setShowItems(false)}
            >
                <FontAwesome5 name="times" size={24} color={theme.colors.iconColor} />
            </TouchableOpacity>,
        ]);
    }, [props.buttons, theme.colors.iconColor]);

    // UseFocusEffect will hide the context menu when the screen loses focus
    // Add the useFocusEffect as a dependency to useCallback so that it will be called when the screen loses focus
    useFocusEffect(
        useCallback(() => {
            if (showItems) {
                setShowItems(false);
            }
        }, [useFocusEffect])
    );

    // Animation to expand
    useEffect(() => {
        Animated.timing(expandAnim, {
            toValue: showItems ? buttonList.length * 50 : 50,
            duration: 50,
            useNativeDriver: false,
        }).start();
    }, [expandAnim, showItems, buttonList]);

    return (
        <Animated.View style={[styles.absoluteBottomRight, { width: expandAnim }]}>
            {!showItems && (
                <TouchableOpacity
                    style={{
                        padding: 10,
                        borderRadius: 50,
                        display: "flex",
                        height: 50,
                        width: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        elevation: 5,
                        borderWidth: 2,
                        zIndex: 100,
                    }}
                    onPress={() => setShowItems(true)}
                >
                    <FontAwesome5 name="ellipsis-v" size={24} color="black" />
                </TouchableOpacity>
            )}
            {showItems && (
                <SecondaryView
                    style={{
                        padding: 10,
                        borderRadius: 50,
                        display: "flex",
                        flexDirection: "column",
                        height: 50,
                        elevation: 5,
                        borderWidth: 2,
                        zIndex: 50,
                    }}
                >
                    <SecondaryView style={{ display: "flex", flexDirection: "row" }}>
                        {buttonList.map((button, index) => (
                            <SecondaryView
                                style={{ display: "flex", flexDirection: "row" }}
                                key={index}
                            >
                                {button}
                            </SecondaryView>
                        ))}
                    </SecondaryView>
                </SecondaryView>
            )}
        </Animated.View>
    );
}
