import { useEffect } from 'react'
import { useShallow } from 'zustand/shallow'

import SearchIcon from "./search.svg?react"
import "./Search.scss"

import { getCommodityList, setSelectedProduct, setAllProductsSelected, useCommodityStore } from '../../model/commodity'
import { authGuard } from '../authGuard'
import PlusCircle from "./plus-circle.svg?react"
import ArrowsClockwise from "./arrows-clockwise.svg?react"

import { Checkbox } from '../../lib/ui-kit/Checkbox'
import { ProductTableLine } from './ProductTableLine/ProductTableLine'
import { Pagination } from './Pagination/Pagination'

const PAGINATION_LIMIT = 30;

export const SearchBase = () => {
  useEffect(() => {
    // ?limit=10&skip=10
    getCommodityList({
      limit: PAGINATION_LIMIT,
    });
  }, []);

  const [
    products, 
    selectedProducts,
    paginationTotal,
    paginationSkip,
    paginationLimit,
  ] = useCommodityStore(useShallow((state) => [
    state.products,
    state.selectedProducts,
    state.total,
    state.skip,
    state.limit,
  ]));

  const handleAllSelectedChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
    const selected = event.target.checked;

    setAllProductsSelected(selected);
  };

  const handleSkipChange = (skip: number) => {
    getCommodityList({
      skip,
      limit: PAGINATION_LIMIT,
    })
  };
  
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
              <div>
                <Checkbox 
                  checked={products.length === selectedProducts.size}
                  onChange={handleAllSelectedChange} 
                />
              </div>
              <div>Наименование</div>
              <div className="center-text">Вендор</div>
              <div className="center-text">Артикул</div>
              <div className="center-text">Оценка</div>
              <div className="center-text">Цена, ₽</div>
              <div></div>
            </div>
            {products.map((product) => {
                return (
                    <ProductTableLine
                      key={product.id}
                      product={product}
                      selected={selectedProducts.has(product.id)}
                      onSelect={setSelectedProduct}
                    />
                );
            })}
            <div className="commodity-table__footer">
              <div className="commodity-table__total-caption">
                {paginationTotal !== null && paginationSkip !== null  &&
                  <>
                    Показано 
                    <span className="important-caption"> {paginationSkip + 1}-{Math.min(paginationSkip + PAGINATION_LIMIT, paginationTotal)} </span> из 
                    <span className="important-caption"> {paginationTotal}</span>
                  </>
                }
              </div>
              <div className="commodity-table__pagination">
                {paginationTotal !== null && paginationSkip !== null &&
                  <Pagination 
                    total={paginationTotal}
                    skip={paginationSkip}
                    limit={PAGINATION_LIMIT}
                    onSkipChange={handleSkipChange}
                  />                   
                }
              </div>
            </div>
          </div>          
        </div>
      </div>
    </div>
  );
}

export const Search = authGuard(SearchBase);
