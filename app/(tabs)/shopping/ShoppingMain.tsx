import { styles } from "@/components/util/Theme";
import { LinearGradientSecondary, ScrollView, SecondaryView } from "@/components/Themed";
import RenderShoppingLists from "./RenderShoppingLists";
import { GetLists, ShoppingListTypes } from "./ShoppingSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ShoppingListWidget from "@/components/widgets/shopping/ShoppingListWidet";
import AddShoppingListButton from "./AddShoppingListButton";
import { View } from "react-native";

export default function ShoppingMain() {
  const { generatedLists, history, savedLists } = useAppSelector(state => state.shoppingLists.lists);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch shopping lists from server
    if (savedLists && savedLists.length === 0){
      dispatch(GetLists());
    }
  }, []);

  return (
    <LinearGradientSecondary colors={[]} style={styles.container}>
      <ShoppingListWidget />
      <AddShoppingListButton />
    </LinearGradientSecondary>
  )
};
