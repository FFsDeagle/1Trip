import { ListItem, Text } from "@rneui/base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";

export default function SearchResultsModal(inputValue: string) {
    // Search
    const items = [
        // write items related to reportsModal
        inputValue,
    ];

    return (
        <>
        {items.map((item, index) => (
            <ListItem
                key={index}
            >
                <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
                >
                <ListItem.Title style={styles.title}>{item}</ListItem.Title>
                </TouchableOpacity>
            </ListItem>
        ))}
        </>
    )
}

