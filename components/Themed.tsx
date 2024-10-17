
import { Text as DefaultText, View as DefaultView, TouchableOpacity as DefaultTouchableOpacity, StyleProp, ViewStyle, ScrollView as DefaultScrollView } from 'react-native';
import { initialState } from './util/themeSlice';
import { LinearGradient as DefaultLinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';
import GetTheme from './util/GetTheme';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export type LinearGradientProp = DefaultLinearGradient['props'];
export type TouchableOpacityProps = DefaultTouchableOpacity['props'];
export type ScrollViewProps = DefaultScrollView['props'];

export function useThemeColor(
  colorName: keyof typeof initialState.colors, 
) {
  const { colors } = GetTheme();
    return colors[colorName];
}

// Different types of Components are returned here
// Custom Text and View components can be created for example TextMain and TextSecondary
// Or ViewMain and ViewSecondary
// This allows us to create a more consistent look and feel throughout the app without having to style each component individually
export function TextPrimary(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = useThemeColor('textPrimary');

  return <DefaultText style={[{ color }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function TextSecondary(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = useThemeColor('textSecondary');

  return <DefaultText style={[{ color }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function PrimaryView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background');

  return <DefaultView style={[{ backgroundColor }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function SecondaryView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background2');

  return <DefaultView style={[style, { backgroundColor, borderRadius: 30 }] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function ThirdView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background2');

  return <DefaultView style={[style, { backgroundColor }] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function TertiaryView(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background3');

  return <DefaultView style={[{ backgroundColor }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background2');
  const borderColor = useThemeColor('borderColor');

  return <DefaultTouchableOpacity style={[{ backgroundColor, borderColor }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function TouchableOpacityItem(props: TouchableOpacityProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background2');

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}

export function LinearGradient(props: LinearGradientProp) {
  const { style, colors, ...otherProps } = props;
  const gradientColors = useThemeColor('linearBackground') as string[];
  const stableColors = useMemo(() => gradientColors, [gradientColors]);

  return <DefaultLinearGradient colors={stableColors} style={style} {...otherProps} />;
}

export function LinearGradientSecondary(props: LinearGradientProp) {
  const { style, colors, ...otherProps } = props;
  const gradientColors = useThemeColor('linearBackground2') as string[];
  const stableColors = useMemo(() => gradientColors, [gradientColors]);

  console.log('Gradient Colors:', stableColors);

  return <DefaultLinearGradient colors={stableColors} style={style} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps){
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor('background2');

  return <DefaultScrollView style={[{ backgroundColor }, style] as StyleProp<ViewStyle>} {...otherProps} />;
}