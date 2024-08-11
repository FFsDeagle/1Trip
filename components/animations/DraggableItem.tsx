import React, { useRef } from "react";
import { Animated, PanResponder, TouchableOpacity } from "react-native";
import { useAppSelector } from "@/app/store/hooks";

type DraggableItemProps = {
    item: { key: string; iconComponent: JSX.Element };
};

const DraggableItem = ({ item }: DraggableItemProps) => {
    const theme = useAppSelector(state => state.theme.colors);
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: () => {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={[
                { 
                    margin: 5, backgroundColor: theme.background3, padding: 28, borderRadius: 15,
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                }
            ]}>
            <TouchableOpacity onPress={() => console.log('Selection: ', item.key)}>
                {item.iconComponent}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default DraggableItem;
