import { LinearGradient, TextPrimary, TextSecondary } from "@/components/Themed";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";

export default function CreateShoppingList() {
    return (
        <LinearGradient 
            style={[styles.container, {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }]}
            colors={[]}
        >
                <TextPrimary style={styles.title}>Create Shopping List</TextPrimary>
                <TextSecondary style={styles.subtitle}>Create a new shopping list</TextSecondary>
            <BackButton />
        </LinearGradient>
    )
};