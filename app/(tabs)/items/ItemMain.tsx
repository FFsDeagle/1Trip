import { styles } from "@/components/util/Theme";
import { ScrollView, SecondaryView, TextSecondary } from "@/components/Themed";
import ItemsCategoryWidget from "@/components/widgets/items/ItemsCategoryWidget";
import { useAppSelector } from "@/app/store/hooks";

export default function ItemMain() {
  const theme = useAppSelector(state => state.theme.colors);

  return (
    <SecondaryView style={styles.container}>
      <ScrollView>
        <ItemsCategoryWidget />
        <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>Favorites</TextSecondary>
      </ScrollView>
    </SecondaryView>
  )
};
