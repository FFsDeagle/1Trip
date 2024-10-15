import { useAppSelector } from '@/app/store/hooks';
import { PrimaryView, SecondaryView, TextPrimary } from '@/components/Themed';
import { useEffect } from 'react';

export default function Themes() {
    const theme = useAppSelector(state => state.theme);
    
    useEffect(() => {
        
    }, [])

    return (
        <PrimaryView>
            <TextPrimary>Current Theme: {theme.mode}</TextPrimary>
            <SecondaryView>
                <TextPrimary>Themes</TextPrimary>
            </SecondaryView>
        </PrimaryView>
    )
}