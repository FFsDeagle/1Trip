import { styles } from "@/components/util/Theme";
import { useNavigation } from "expo-router";
import { ItemsStackParamList } from "@/constants/types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import BackButton from "@/components/util/BackButton";
import { LinearGradient, SecondaryView, TextPrimary, TextSecondary, TouchableOpacityItem } from "@/components/Themed";
import { TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useRef, useState } from "react";
import AnimatedModal from "@/components/animations/AnimatedModal";
import { deleteItem, InventoryItem } from "./ItemSlice";
import AddOrEditProduct from "./AddOrEditProduct";

type ItemInfoRouteProp = RouteProp<ItemsStackParamList, 'ItemInfo'>;

type InputValidation = {
  name: boolean;
  description: boolean;
  uom: boolean;
  category: boolean;
  defaultExpiry: boolean;
}

export default function ItemInfo() {
  const route = useRoute<ItemInfoRouteProp>();
    const navigation = useNavigation<NavigationProp<ItemsStackParamList, 'ItemInfo'>>();
    const item = useAppSelector(state => state.item.items.find(item => item.name === route.params.searchValue)!);
    const theme = useAppSelector(state => state.theme.colors);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { id } = useAppSelector(state => state.login.loginResponse);
    
    useEffect(() => {
      if (isDelete) {
        (async () => {
          if (item?._id) await dispatch(deleteItem({ userId: id, id: item._id }));
          navigation.navigate('ProductSearch', { nav: 'ItemInfo', placeholder: "Search for your Products.." });
        })();
      }
    }, [isDelete])
    

    return (
      <LinearGradient colors={[]} style={[styles.container, styles.justifiedStart]}>
        {showModal && <AnimatedModal message="Delete item?" setShowModal={setShowModal} showModal={showModal} setAction={setIsDelete} />}
        <View style={styles.justifiedCenter}>
          <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.secondary, marginTop: 20 }]}>
            <TextSecondary style={[styles.getStartedText, { letterSpacing: 1 }]}>Item Info</TextSecondary>
            {!isEdit ? <View style={[styles.flexRow, styles.justified]}>
              <TouchableOpacity style={{ margin: 10 }} 
                onPress={() => setIsEdit(true)}
              >
                  <FontAwesome6 name="edit" size={24} color={theme.iconColor2} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{margin: 10}} 
                onPress={() => setShowModal(true)}
              >
                <FontAwesome6 name="trash" size={24} color={theme.iconColor2} />
              </TouchableOpacity>
            </View> :
            <View style={[styles.flexRow, styles.justified]}>
              <TouchableOpacity style={{ margin: 10 }} 
                onPress={() => setIsEdit(false)}
              >
                <MaterialIcons name="cancel" size={24} color={theme.iconColor2} />
              </TouchableOpacity>
            </View>
            }
          </View>
        </View>
        {!isEdit ?
        <View>
          <View style={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Name</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
              <TextPrimary style={[styles.title, { color: theme.background }]}>{item?.name}</TextPrimary>
            </View>
          </View>
          {/* <View style={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Description</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
              <TextPrimary style={styles.title}>{item?.description}</TextPrimary>
            </View>
          </View> */}
          <View style={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Category</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
              <TextPrimary style={[styles.title, { color: theme.background }]}>{item?.category}</TextPrimary>
            </View>
          </View>
          <View style={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Unit of Measure</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
              <TextPrimary style={[styles.title, { color: theme.background }]}>{item?.uom}</TextPrimary>
            </View>
          </View>
          {/* <View style={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Default Expiry (days)</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
              <TextPrimary style={styles.title}>{item?.defaultExpiry}</TextPrimary>
            </View>
          </View> */}
        </View> 
        :
        <AddOrEditProduct item={item} adding={false} />
        }
        <BackButton />
      </LinearGradient>
    );
};
