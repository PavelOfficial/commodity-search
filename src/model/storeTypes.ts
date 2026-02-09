import { CoffeItem, CoffeeQueryParams, CoffeeType } from "../types/coffeTypes";

export type CoffeeCartState = {
  cart?: CoffeItem[];
  address?: string;
};

export type CoffeeCartActions = {
  setAddress: (address: string) => void;
  addToCart: (item: CoffeeType) => void;
  orderCoffee: () => void;
  clearCart: () => void;
};

export type CoffeeListState = {
  coffeeList?: CoffeeType[];
  controller?: AbortController;
  params: CoffeeQueryParams;
};

export type CoffeeListActions = {
  getCoffeeList: (params?: CoffeeQueryParams) => Promise<CoffeeType[]>;
  setParams: (params?: CoffeeQueryParams) => void;
};

//-----
export interface AuthParams {
  userName: string,
  password: string,
  rememberMe: boolean,
}

export interface AuthResponse {
  accessToken: string
  email: string
  firstName: string
  gender: string
  id: number
  image: string
  lastName: string
  refreshToken: string
  username: string
}

export type AuthState = {
  isAuthorizated: boolean,
  isLoading: boolean,
  error: null | string,
};

export type AuthActions = {
  authUser: (params: AuthParams) => void
};
