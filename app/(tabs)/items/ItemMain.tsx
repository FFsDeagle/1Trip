import { styles } from "@/components/util/Theme";
import { ScrollView, SecondaryView } from "@/components/Themed";
import ItemsCategoryWidget from "@/components/widgets/items/ItemsCategoryWidget";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import PlusFeaturesWidget from "@/components/widgets/items/PlusFeaturesWidget";
import { useEffect } from "react";
import { getCategories, getItemList } from "./ItemSlice";
import AddNewItemButton from "./AddNewItemButton";

export default function ItemMain() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.item.items);
  const { id } = useAppSelector(state => state.login.loginResponse);

  // Check if products have already been fetched to prevent unnessesary API calls
  useEffect(() => {
    console.log('ItemMain useEffect', id);
    if (items && items.length === 0) {
      getItems();
    }
  }, [dispatch])

  const getItems = async () => {
    await dispatch(getItemList(id));
    await dispatch(getCategories(id));
  }

  return (
    <SecondaryView style={styles.container}>
      <ScrollView>
        <ItemsCategoryWidget />
        <PlusFeaturesWidget />
      </ScrollView>
      <AddNewItemButton />
    </SecondaryView>
  )
};
