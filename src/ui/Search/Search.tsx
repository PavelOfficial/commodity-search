import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import "./Search.scss"

import { getCommodityList, useCommodityStore } from '../../model/commodity'
import { authGuard } from '../authGuard'

export const SearchBase = () => {
  useEffect(() => {
    getCommodityList()
  }, []);

  const [products] = useCommodityStore(useShallow((state) => [state.products]));

  console.log("products: ", products);
  
  return (
    <div className="search-backdrop">
      <div className="search-input-box">
        <div className="content-container search-input-card">
          <div>Товары</div>
          <div><input className="whide-card-input" type="text" /></div>
        </div>
      </div>
      <div className="search-list-box">
        <div className="content-container">
          wqe wqe<br/><br/>
        </div>
      </div>
      {/* 
        <div>Search</div>
        {JSON.stringify(products)}
      */}
    </div>
  );
}

export const Search = authGuard(SearchBase);
