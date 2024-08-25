import React, { Dispatch, SetStateAction, useRef } from "react";
import { Animated, PanResponder, TouchableOpacity, ViewStyle, LayoutChangeEvent } from "react-native";
import { TextPrimary } from "../Themed";
import { styles } from "../util/Theme";

type DraggableItemProps = {
    item: { name: string, key: string; iconComponent: JSX.Element };
    setMenu: Dispatch<SetStateAction<string>>;
    style: ViewStyle | ViewStyle[];
    onDrop: (key: string, dropPosition: { x: number, y: number }) => void;
    onDrag: (key: string, dragPosition: { x: number, y: number }) => void;
    panResponder?: any;
    setItemDragged: React.Dispatch<React.SetStateAction<boolean>>;
};

const DraggableItem = ({ onDrag, setItemDragged, setMenu, item, style, onDrop }: DraggableItemProps) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const initialPosition = useRef({ x: 0, y: 0 }).current;

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
            onPanResponderMove: (e, gesture) => {
                Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false })(e, gesture);
                const dragPosition = {
                    x: gesture.moveX,
                    y: gesture.moveY,
                };
                onDrag(item.key, dragPosition);
            },
            onPanResponderRelease: (e, gesture) => {
                // MoveX/Y returns the position of the item relevant to the screens Width & Height
                const dropPosition = {
                    x: gesture.moveX,
                    y: gesture.moveY,
                };

                // Save drop position and indicate dropped
                onDrop(item.key, dropPosition);
                setItemDragged(false);

                // After drop position is handled then return item to its original position
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

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
                    padding: 5,
                    marginLeft: 10,
                    marginRight: 10,
                }
            ]}>
            <TouchableOpacity style={[styles.flexColumn, styles.justifiedCenter]} onPress={() => setMenu(item.key)}>
                {React.createElement(item.iconComponent.type, item.iconComponent.props)}
                <TextPrimary style={{ fontSize: 10, marginTop: 5, fontWeight: "500" }}>
                    {item.name}
                </TextPrimary>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default DraggableItem;
