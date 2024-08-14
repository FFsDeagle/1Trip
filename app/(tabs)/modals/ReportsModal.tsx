import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "@/components/util/Theme";

export default function ReportsModal() {
    const items = [
        // write items related to reportsModal
        'History',
        'Settings',
    ];

    return (
        <>
        {items.map((item, index) => (
            <TouchableOpacity
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
                <View style={styles.title}>{item}</View>
                {/* <View style={styles.separator} /> */}
                </TouchableOpacity>
            </TouchableOpacity>
        ))}
        </>
    )
}

