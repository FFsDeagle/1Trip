import { TextPrimary, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <TextPrimary {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}
