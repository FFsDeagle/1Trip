import { useState } from "react";
import { TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBarProp } from "@/constants/types";
import { Link, useRouter } from "expo-router";

export default function SearchBarWidget({ componentToRender }: SearchBarProp) {
  // Reusable searchbar widget
  // Uses animations to render modal with search results
  const [searchText, setSearchText] = useState<string>("");
  const router = useRouter();
  
  const handleSubmit = () => {
    console.log('componentToRender', componentToRender)
    if (searchText.trim()) {
      const searchQuery = searchText;
      setSearchText(""); // Clear the search text
      router.push({
        pathname: "/modal",
        params: { modal: componentToRender, title: `Search - ${searchQuery}`, navigationParam: componentToRender }, 
      });
    }
  };

  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 40,
        marginRight: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
    }}>
        <TextInput 
          onChange={(e) => setSearchText(e.nativeEvent.text)}
          onSubmitEditing={handleSubmit}
          placeholderTextColor={'white'}
          value={searchText}
          style={{
              color: 'white',
              fontSize: 18,
              marginRight: 10,
          }}
        placeholder="Search"></TextInput>
        <FontAwesome style={{ marginRight: 10 }} color="white" name="search"/>
    </View>
  )
};
