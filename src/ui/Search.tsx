import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';

import { getCommodityList, useCommodityStore } from '../model/commodity';
import { authGuard } from './authGuard';

export const SearchBase = () => {
  useEffect(() => {
    getCommodityList()
  }, []);

  const [products] = useCommodityStore(useShallow((state) => [state.products]));
  
  return (
    <>
      <div>Search</div>
      {JSON.stringify(products)}
    </>
  );
}

export const Search = authGuard(SearchBase);
