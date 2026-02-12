import type { SortChangeOptions } from './storeTypes';
import { create, type StateCreator } from 'zustand';
import type { AxiosResponse } from 'axios';

import { axios } from '@/query';
import type { CommodityActions, CommodityListOptions, CommodityResponse, CommodityState } from './storeTypes';

import { immer } from "zustand/middleware/immer";
import { persist } from 'zustand/middleware';
import { produce } from 'immer';

const commoditySlice: StateCreator<
  CommodityState & CommodityActions,
  [["zustand/persist", unknown],["zustand/immer", unknown]]
> = (set, get) => ({
  // State
  selectedProducts: new Set<number>(),
  products: [],
  total: null,
  skip: null,
  limit: null,
  sortBy: null,
  order: null,
  query: "",

  isLoading: false,
  error: null,

  setSelectedProduct(id: number, selected: boolean) {
    if (selected) {
      set(
        produce<CommodityState>((draft) => {
          draft.selectedProducts.add(id)
        })
      );
    } else {
      set(
        produce<CommodityState>((draft) => {
          draft.selectedProducts.delete(id)
        })
      );
    }
  },

  setAllProductsSelected(selected: boolean) {
    if (selected) {
      set(
        produce<CommodityState>((draft) => {
          draft.products.forEach(({ id }) => {            
            draft.selectedProducts.add(id);
          });
        })
      );
    } else {
      set({
        selectedProducts: new Set<number>(),
      });
    }
  },

  setCommodityQuery:(query: string) => {
    set({
      query,
    });
  },

  setSortOptions(options: SortChangeOptions) {
    set({
      sortBy: options.sortBy,
      order: options.order,
    });
  },

  // Action to fetch data
  getCommodityList: async (options: CommodityListOptions = {}) => {
    set({ isLoading: true, error: null }); // Set loading to true and clear previous errors
    try {
      const url = get().query ? "https://dummyjson.com/products/search" : "https://dummyjson.com/products";
      const response = await axios.get<void, AxiosResponse<CommodityResponse>>(url, {
        headers: { 'Content-Type': 'application/json' },
        params: {
          ...options,
          ...(get().query ? { q: get().query } : {}),
          ...(get().sortBy ? { sortBy: get().sortBy } : {}),
          ...(get().order ? { order: get().order } : {}),
        },
      });

      const data = response.data;

      set({ 
        selectedProducts: new Set<number>(),
        products: data.products, 
        total: data.total,
        skip: data.skip,
        limit: data.limit,
        isLoading: false 
      }); // On success, store data and set loading to false
    } catch (err) {
      set({ 
        error: err.message, 
        isLoading: false 
      }); // On failure, store error and set loading to false
    }
  },
})

export const useCommodityStore = create<CommodityState & CommodityActions>()(persist(
  immer(commoditySlice), {
    name: "commodityStore",
    partialize: (state) => ({ 
      sortBy: state.sortBy,
      order: state.order,
    })
  })
);

export const getCommodityList = (options?: CommodityListOptions) =>
  useCommodityStore.getState().getCommodityList(options);

export const setSelectedProduct = (id: number, selected: boolean) =>
  useCommodityStore.getState().setSelectedProduct(id, selected);

export const setAllProductsSelected = (selected: boolean) =>
  useCommodityStore.getState().setAllProductsSelected(selected);

export const setCommodityQuery = (query: string) =>
  useCommodityStore.getState().setCommodityQuery(query);

export const setSortOptions = (options: SortChangeOptions) =>
  useCommodityStore.getState().setSortOptions(options);