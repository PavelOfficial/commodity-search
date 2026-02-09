import { create, type StateCreator } from 'zustand';
import type { AxiosResponse } from 'axios';

import { axios } from '../query';
import type { CommodityActions, CommodityResponse, CommodityState } from './storeTypes';


const commoditySlice: StateCreator<CommodityState & CommodityActions> = (set) => ({
  // State
  products: [],
  isLoading: false,
  error: null,

  // Action to fetch data
  getCommodityList: async () => {
    set({ isLoading: true, error: null }); // Set loading to true and clear previous errors
    try {
      const response = await axios.get<void, AxiosResponse<CommodityResponse>>('https://dummyjson.com/products', {
        headers: { 'Content-Type': 'application/json' },
      });

      set({ products: response.data.products, isLoading: false }); // On success, store data and set loading to false
    } catch (err) {
      set({ error: err.message, isLoading: false }); // On failure, store error and set loading to false
    }
  },
})

export const useCommodityStore = create(commoditySlice);

export const getCommodityList = () =>
  useCommodityStore.getState().getCommodityList();