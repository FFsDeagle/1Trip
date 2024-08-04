import { defaultTheme, getTheme, ThemeProps } from './themeSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useEffect, useState } from 'react';

export default function GetTheme() {
  // Theme handler, set to default theme
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme);
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);

  // useEffect on mount to make api call to get saved theme
  useEffect(() => {
    if (theme) {
      return;
    }
    dispatch(getTheme());
    if (themeState.status === 'success') {
      setTheme(themeState);
    }
  }, [])

  return theme;
}
