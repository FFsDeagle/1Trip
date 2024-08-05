import { styles } from "@/components/util/Theme";
import { SecondaryView } from "@/components/Themed";
import RenderShoppingLists from "./RenderShoppingLists";
import { GetLists, ShoppingListTypes } from "./ShoppingSlice";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/store/hooks";

export default function ShoppingMain() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Fetch shopping lists from server
    dispatch(GetLists());
  }, [dispatch]);

  return (
    <SecondaryView style={styles.container}>
        <RenderShoppingLists title={'Saved Lists' as string} listType={'savedLists' as keyof ShoppingListTypes} />
        <RenderShoppingLists title={'Generated Lists'} listType={'generatedLists' as keyof ShoppingListTypes} />
        <RenderShoppingLists title={'History'} listType={'history' as keyof ShoppingListTypes} />
    </SecondaryView>
  )
};
