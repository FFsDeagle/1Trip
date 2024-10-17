import { styles } from "@/components/util/Theme";
import { LinearGradient, PrimaryView } from "@/components/Themed";
import { ScrollView } from 'react-native';
import { GetLists } from "./ShoppingSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ShoppingListWidget from "@/components/widgets/shopping/ShoppingListWidet";
import AddShoppingListButton from "./AddShoppingListButton";
import { getCategories } from "../items/ItemSlice";

export default function ShoppingMain() {
  const { savedLists } = useAppSelector(state => state.shoppingLists.lists);
  const { id } = useAppSelector(state => state.login.loginResponse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch all shopping lists from server
    if (savedLists && savedLists.length === 0){
      GetShoppingLists();
    }
  }, []);

  const GetShoppingLists = async () => {
    await dispatch(GetLists(id));
    // Disabled until future implementation
    // await dispatch(GetInventoryItems(id));
    await dispatch(getCategories(id));
  }

  return (
    <PrimaryView style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: 'transparent'}}>
          <ShoppingListWidget />
      </ScrollView>
      <AddShoppingListButton />
    </PrimaryView>
  )
};
