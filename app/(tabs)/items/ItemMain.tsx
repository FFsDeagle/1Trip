import { styles } from "@/components/util/Theme";
import { SecondaryView, TextPrimary } from "@/components/Themed";

export default function ItemMain() {
  return (
    <SecondaryView style={styles.container}>
        <TextPrimary>
            Item Main
        </TextPrimary>
    </SecondaryView>
  )
};
