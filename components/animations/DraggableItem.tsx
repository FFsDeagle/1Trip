import React, { Dispatch, SetStateAction, useRef } from "react";
import { Animated, PanResponder, TouchableOpacity, ViewStyle, LayoutChangeEvent } from "react-native";
import { useAppSelector } from "@/app/store/hooks";

type DraggableItemProps = {
    item: { key: string; iconComponent: JSX.Element };
    setMenu: Dispatch<SetStateAction<string>>;
    style: ViewStyle | ViewStyle[];
    onDrop: (key: string, dropPosition: { x: number, y: number }) => void; // New prop for handling the drop event
    panResponder?: any;
    setItemDragged: React.Dispatch<React.SetStateAction<boolean>>;
};

const DraggableItem = ({ setItemDragged, setMenu, item, style, onDrop }: DraggableItemProps) => {
    const theme = useAppSelector(state => state.theme.colors);
    const pan = useRef(new Animated.ValueXY()).current;
    const initialPosition = useRef({ x: 0, y: 0 }).current;
    const [positionX, setPositionX] = React.useState(0);
    const [positionY, setPositionY] = React.useState(0);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                const { dx, dy } = gestureState;
                // Start drag if movement is greater than 10px in any direction
                return Math.abs(dx) > 10 || Math.abs(dy) > 10;
            },
            onPanResponderGrant: () => {
                setItemDragged(true);
            },
            onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gesture) => {

                // Figured out correct property to use for the Gesture State
                // MoveX/Y returns the position of the item relevant to the screens Width & Height
                const dropPosition = {
                    x: gesture.MoveX,
                    y: gesture.MoveY,
                };

                // Save drop position and indicate dropped
                onDrop(item.key, dropPosition);
                setItemDragged(false);
                // Old code to remove after testing
                // handleDrop(item.key, dropPosition);

                // After drop position is handled then return item to its original position
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    // Old code to remove after testing
    // const handleDrop = (key: string, dropPosition: { x: number, y: number }) => {
    //     onDrop(item.key, dropPosition);
    //     setItemDragged(false);
    // };

    const handleLayout = (event: LayoutChangeEvent) => {
        const { x, y } = event.nativeEvent.layout;
        initialPosition.x = x;
        initialPosition.y = y;
    };

    return (
        <Animated.View
            {...panResponder.panHandlers}
            onLayout={handleLayout}
            style={[style,
                {
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                }
            ]}>
            <TouchableOpacity onPress={() => setMenu(item.key)}>
                {React.createElement(item.iconComponent.type, item.iconComponent.props)}
            </TouchableOpacity>
        </Animated.View>
    );
};

export default DraggableItem;
