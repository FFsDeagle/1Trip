import { styles } from "@/components/util/Theme";
import { LinearGradient, LinearGradientSecondary, SecondaryView } from "@/components/Themed";
import { ScrollView } from 'react-native';
import RenderShoppingLists from "./RenderShoppingLists";
import { GetLists, ShoppingListTypes } from "./ShoppingSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ShoppingListWidget from "@/components/widgets/shopping/ShoppingListWidet";
import AddShoppingListButton from "./AddShoppingListButton";
import { Dimensions, View } from "react-native";

export default function ShoppingMain() {
  const { generatedLists, history, savedLists } = useAppSelector(state => state.shoppingLists.lists);
  const { id } = useAppSelector(state => state.login.loginResponse);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch shopping lists from server
    if (savedLists && savedLists.length === 0){
      GetShoppingLists();
    }
  }, []);

  const GetShoppingLists = async () => {
    await dispatch(GetLists(id));
  }

  return (
    <LinearGradient colors={[]} style={[styles.container]}>
      <ScrollView contentContainerStyle={{backgroundColor: 'transparent'}}>
          <ShoppingListWidget />
      </ScrollView>
      <AddShoppingListButton />
    </LinearGradient>
  )
};
