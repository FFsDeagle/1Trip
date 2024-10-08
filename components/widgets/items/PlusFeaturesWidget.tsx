import { useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

export default function PlusFeaturesWidget(){
    const theme = useAppSelector(state => state.theme.colors);
    
    {/* Paid Features */}
    {/* Meal Suggestions */}
    {/* Daily Meal Planner */}

    return (
        <SecondaryView style={[styles.justified]}>
            <View style={[styles.flexRow, styles.justifiedApart]}>
                <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>
                    Plus Features
                </TextSecondary>
                <TouchableOpacity style={[styles.justified, { right: 15 }]}>
                    {/* <AntDesign name="setting" size={24} color={theme.textPrimary} /> */}
                </TouchableOpacity>
            </View>
            {/* Background image for the plus features, Drawn out or AI Generated */}
            <View style={[styles.cardContainer, styles.justifiedCenter, { backgroundColor: theme.background3 }]}>
                <View style={[styles.justifiedApart, styles.flexRow]}>
                    <View style={[styles.flexColumn, styles.justifiedCenter, { width: '50%', left: 20 }]}>
                        <TextPrimary style={[styles.heading, { width: '100%', padding: 0 }]}>
                            Meal Suggestions
                        </TextPrimary>
                        <TextSecondary style={[styles.subtitle, { alignSelf: 'flex-start', textAlign: 'left', width: '100%' }]}>
                            Search through a list of meal suggestions that are added to your shopping lists
                        </TextSecondary>
                    </View>
                    <TouchableOpacity style={[styles.button , styles.justifiedCenter, styles.flexRow, { right: 20, width: 'auto', alignSelf: 'center', backgroundColor: theme.primary }]}>
                        <TextPrimary style={{ textAlign: 'center' }}>
                            Subscribe Now
                        </TextPrimary><AntDesign name="right" size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.separator} />
            <View style={[styles.cardContainer, styles.justifiedCenter, { backgroundColor: theme.background3, marginBottom: 30 }]}>
                <View style={[styles.justifiedApart, styles.flexRow]}>
                    <TouchableOpacity style={[styles.button , styles.justifiedCenter, styles.flexRow, { left: 20, width: 'auto', alignSelf: 'center', backgroundColor: theme.primary }]}>
                        <TextPrimary style={{ textAlign: 'center' }}>
                            Subscribe Now
                        </TextPrimary><AntDesign name="right" size={24} color={theme.textPrimary} />
                    </TouchableOpacity>
                    <View style={[styles.flexColumn, styles.justifiedCenter, { width: '50%', right: 20 }]}>
                        <TextPrimary style={[styles.heading, { width: '100%', padding: 0 }]}>
                            Daily Meal Planner
                        </TextPrimary>
                        <TextSecondary style={[styles.subtitle, { alignSelf: 'flex-start', textAlign: 'left', width: '100%' }]}>
                            Plan your meals for the week with our daily meal planner
                        </TextSecondary>
                    </View>
                </View>
            </View>
        </SecondaryView>
    )

}