import { styles } from "@/components/util/Theme";
import { ScrollView, SecondaryView, TextSecondary } from "@/components/Themed";
import ItemsCategoryWidget from "@/components/widgets/items/ItemsCategoryWidget";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FavItemsWidget from "@/components/widgets/items/FavItemsWidget";
import { useEffect } from "react";
import { getItemList } from "./ItemSlice";

export default function ItemMain() {
  const theme = useAppSelector(state => state.theme.colors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getItemList());
  }, [dispatch])

  return (
    <SecondaryView style={styles.container}>
      <ScrollView>
        <ItemsCategoryWidget />
        <FavItemsWidget />
      </ScrollView>
    </SecondaryView>
  )
};
