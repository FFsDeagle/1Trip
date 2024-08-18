import { styles } from "@/components/util/Theme";
import { ScrollView, SecondaryView, TextSecondary } from "@/components/Themed";
import ItemsCategoryWidget from "@/components/widgets/items/ItemsCategoryWidget";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import FavItemsWidget from "@/components/widgets/items/FavItemsWidget";
import { useEffect } from "react";
import { getItemList } from "./ItemSlice";

export default function ItemMain() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.item.items);

  // Check if products have already been fetched to prevent unnessesary API calls
  useEffect(() => {
    if (items.length === 0) {
      dispatch(getItemList());
    }
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
