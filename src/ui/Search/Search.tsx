import { useCallback, useEffect, useMemo, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { debounce } from 'lodash'

import SearchIcon from "./search.svg?react"
import "./Search.scss"

import { getCommodityList, setSelectedProduct, setAllProductsSelected, useCommodityStore, setCommodityQuery, setSortOptions } from '@/model/commodity'
import { authGuard } from '@/ui/authGuard'

import ArrowsClockwise from "./arrows-clockwise.svg?react"

import { Checkbox } from '@/lib/ui-kit/Checkbox/Checkbox'
import { ProductTableLine } from './ProductTableLine/ProductTableLine'
import { Pagination } from './Pagination/Pagination'
import type { SortChangeOptions } from '@/model/storeTypes'
import { SortHeader } from '@/lib/ui-kit/SortHeader/SortHeader'
import { AddProductButton } from './AddProductButton/AddProductButton'

const PAGINATION_LIMIT = 30;

export const SearchBase = () => {
  useEffect(() => {
    getCommodityList({
      limit: PAGINATION_LIMIT,
    });
  }, []);

  const [
    products, 
    selectedProducts,
    paginationTotal,
    paginationSkip,
    query,
    isLoading,
    sortBy,
    order,
  ] = useCommodityStore(useShallow((state) => [
    state.products,
    state.selectedProducts,
    state.total,
    state.skip,    
    state.query,
    state.isLoading,
    state.sortBy,
    state.order,
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

  const getCommodityListByQuery = useCallback(() => {
    getCommodityList({
      skip: 0,
      limit: PAGINATION_LIMIT,
    });
  }, []);

  const getCommodityListByQueryDebounced = useMemo(() => {
    return debounce(getCommodityListByQuery, 500);
  }, [getCommodityListByQuery]);
  

  const handleChangeQuery: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
    setCommodityQuery(event.target.value);

    getCommodityListByQueryDebounced();
  };

  const [isLoadingDelayed, setIsLoadingDelayed] = useState(false);
  useEffect(() => {
    let timeoutDescriptor = null;
    if (isLoading) {
      setIsLoadingDelayed(isLoading);
    } else {
      timeoutDescriptor = setTimeout(() => {
        setIsLoadingDelayed(isLoading);
      }, 1500);
    }

    return () => {
      if (timeoutDescriptor !== null) {
        clearTimeout(timeoutDescriptor);
      }
    };
  }, [isLoading]);

  const handleSortChange = (options: SortChangeOptions) => {
    setSortOptions(options);

    getCommodityList({
      skip: 0,
      limit: PAGINATION_LIMIT,
    });
  };
  
  return (
    <>
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
                value={query}
                onChange={handleChangeQuery}
              />
            </div>
          </div>
        </div>
        <div className="search-list-box">
          {isLoadingDelayed && 
            <div className="progress-bar"></div>
          }
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
                <AddProductButton />
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
                <div>
                  <SortHeader
                    order={order}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    name="title"
                  >
                    Наименование
                  </SortHeader>
                </div>
                <div className="center-text">
                  <SortHeader
                    order={order}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    name="brand"
                  >
                    Вендор
                  </SortHeader>
                </div>
                <div className="center-text">
                  <SortHeader
                    order={order}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    name="sku"
                  >
                    Артикул
                  </SortHeader>
                </div>
                <div className="center-text">
                  <SortHeader
                    order={order}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    name="rating"
                  >
                    Оценка
                  </SortHeader>
                </div>
                <div className="center-text">
                  <SortHeader
                    order={order}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                    name="price"
                  >
                    Цена, ₽
                  </SortHeader>
                </div>
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
    </>
  );
}

export const Search = authGuard(SearchBase);
