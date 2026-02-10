import { create, type StateCreator } from 'zustand';
import type { AxiosResponse } from 'axios';

import { axios } from '../query';
import type { CommodityActions, CommodityResponse, CommodityState } from './storeTypes';

import { immer } from "zustand/middleware/immer";
import { produce } from 'immer';

const commoditySlice: StateCreator<
  CommodityState & CommodityActions,
  [["zustand/immer", unknown]]
> = (set) => ({
  // State
  selectedProducts: new Set<number>(),
  products: [],
  total: null,
  skip: null,
  limit: null,

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

  // Action to fetch data
  getCommodityList: async () => {
    set({ isLoading: true, error: null }); // Set loading to true and clear previous errors
    try {
      const response = await axios.get<void, AxiosResponse<CommodityResponse>>('https://dummyjson.com/products', {
        headers: { 'Content-Type': 'application/json' },
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

export const useCommodityStore = create<CommodityState & CommodityActions>()(immer(commoditySlice));

export const getCommodityList = () =>
  useCommodityStore.getState().getCommodityList();

export const setSelectedProduct = (id: number, selected: boolean) =>
  useCommodityStore.getState().setSelectedProduct(id, selected);

export const setAllProductsSelected = (selected: boolean) =>
  useCommodityStore.getState().setAllProductsSelected(selected);