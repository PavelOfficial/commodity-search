import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import SearchIcon from "./search.svg?react"
import "./Search.scss"

import { getCommodityList, useCommodityStore } from '../../model/commodity'
import { authGuard } from '../authGuard'
import PlusCircle from "./plus-circle.svg?react"
import ArrowsClockwise from "./arrows-clockwise.svg?react"
import { Checkbox } from '../../lib/ui-kit/Checkbox'

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
          <label className="card-input-label" htmlFor="search-input">Товары</label>
          <div className="icon-input">
            <div className="icon-input__icon">
                <SearchIcon />
            </div>
            <input 
              id="search-input"
              placeholder="Найти" 
              className="whide-card-input icon-input__input" 
              type="text" 
            />
          </div>
        </div>
      </div>
      <div className="search-list-box">
        <div className="content-container card-content">
          <div className="content-header">
            <div>
              <h2>
                Все позиции
              </h2>
            </div>
            <div className="content-header__controls">
              <button type="button" className="ghost-button">
                <ArrowsClockwise />
              </button>
              <button type="button" className="primary-button primary-button_simple">
                <div className="button-icon"><PlusCircle /></div>Добавить
              </button>
            </div>
          </div>
          <div className="commodity-table">
            <div className="commodity-table-line commodity-table-line_header">
              <div><Checkbox /></div>
              <div>Наименование</div>
              <div className="center-text">Вендор</div>
              <div className="center-text">Артикул</div>
              <div className="center-text">Оценка</div>
              <div className="center-text">Цена, ₽</div>
              <div></div>
            </div>
          </div>          
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
