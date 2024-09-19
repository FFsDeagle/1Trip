import { styles } from "@/components/util/Theme";
import { Animated, Dimensions, PanResponder, View } from "react-native";
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
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (e, gesture) => {
            return Math.abs(gesture.dx) > 10 || Math.abs(gesture.dy) > 10;
          },
          onPanResponderGrant: () => {
            // Extract the offset to use as the initial starting point for the pan
            pan.extractOffset();
          },
          onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: () => {
            // Flatten the offset to save the position
            pan.flattenOffset();
    
            // Animate the snap to the left or right side of the screen
            Animated.spring(pan.x, {
              toValue: 0,
              useNativeDriver: false,
            }).start();
          }
        })
      ).current;

    // Initialize buttons list with a cancel button
    useEffect(() => {
        setButtonList([
            ...props.buttons,
            <TouchableOpacity
                style={[styles.justified, { marginRight: 5 }]}
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
            toValue: showItems ? buttonList && buttonList.length * 50 : 50,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [expandAnim, showItems, buttonList]);

    return (
        <Animated.View 
            style={[styles.absoluteBottomRight, { width: expandAnim, transform: [{translateX: pan.x}, {translateY: pan.y}] }]}
            {...panResponder.panHandlers}
        >
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
                        zIndex: 100,
                    }}
                    onPress={() => setShowItems(true)}
                >
                    <FontAwesome5 name="ellipsis-v" size={24} color="black" />
                </TouchableOpacity>
            )}
            {showItems && (
                <SecondaryView
                    style={[styles.justified, {
                        padding: 10,
                        borderRadius: 50,
                        display: "flex",
                        flexDirection: "column",
                        height: 50,
                        elevation: 5,
                        zIndex: 50,
                        overflow: 'hidden'
                    }]}
                >
                    <SecondaryView style={[styles.flexRow, styles.justifiedApart]}>
                        {buttonList.map((button, index) => (
                            <SecondaryView
                                style={[styles.justified, {zIndex: 40, marginLeft: 10, marginRight: 10 }]}
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
