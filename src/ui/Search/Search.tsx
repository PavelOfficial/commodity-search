import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import SearchIcon from "./search.svg?react"
import "./Search.scss"

import { getCommodityList, useCommodityStore } from '../../model/commodity'
import { authGuard } from '../authGuard'
import PlusCircle from "./plus-circle.svg?react"
import ArrowsClockwise from "./arrows-clockwise.svg?react"
import PlusIcon from "./plus-ico.svg?react"
import MoreIcon from "./more-icon.svg?react"
import ArrowLeft from "./arrow-left.svg?react"
import ArrowRight from "./arrow-right.svg?react"
import { Checkbox } from '../../lib/ui-kit/Checkbox'

const renderLine = () => {
  return (
    <div className="commodity-table-line commodity-table-line__table-row commodity-table-line__table-row_active">
      <div><Checkbox /></div>
      <div>
        <div className="commodity-figure">
          <div className="commodity-figure__image">
            <img src="#" alt="" />
          </div>
          <div className="commodity-figure__caption">
            <div className="commodity-figure__caption-name">USB Флэшкарта 16GB</div>
            <div className="commodity-figure__caption-category">Аксессуары</div>
          </div>
        </div>
      </div>
      <div className="center-text bold-text">Samsung</div>
      <div className="center-text">RCH45Q1A</div>
      <div className="center-text">4.3/5</div>
      <div className="center-text">48 652<span className="decimals">,00</span></div>
      <div className="center-content">
        <button type="button" className="primary-button primary-button_tiny">
          <PlusIcon />
        </button>
        <button type="button" className="icon-button button-more">
          <MoreIcon />
        </button>
      </div>
    </div>
  )
}

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
            {renderLine()}
            {renderLine()}
            {renderLine()}
            {renderLine()}
            {renderLine()}
            {renderLine()}
            <div className="commodity-table__footer">
              <div className="commodity-table__total-caption">
                Показано <span className="important-caption">1-20</span> из <span className="important-caption">120</span>
              </div>
              <div className="commodity-table__pagination">
                <button type="button" className="icon-button pagination-slide-button pagination-arrow-button">
                  <ArrowLeft />
                </button>
                <button type="button" className="ghost-button pagination-slide-button">
                  1
                </button>
                <button type="button" className="ghost-button pagination-slide-button pagination-slide-button_selected">
                  2
                </button>
                <button type="button" className="ghost-button pagination-slide-button">
                  3
                </button>
                <button type="button" className="ghost-button pagination-slide-button">
                  4
                </button>
                <button type="button" className="ghost-button pagination-slide-button">
                  5
                </button>
                <button type="button" className="icon-button pagination-slide-button pagination-arrow-button">
                  <ArrowRight />
                </button>
              </div>
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
