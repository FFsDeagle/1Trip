import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch } from '@/app/store/hooks';
import { showHeader } from '../inventory/InventorySlice';

const useToggleHeader = (state: boolean) => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(showHeader(state));
      return () => dispatch(showHeader(!state));
    }, [dispatch, state])
  );
};

export default useToggleHeader;
