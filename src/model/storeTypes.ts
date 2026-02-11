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
  accessToken: null | string,
  refreshToken: null | string,

  rememberMe: boolean

  isAuthorizated: boolean,
  isLoading: boolean,
  error: null | string,
};

export type AuthActions = {
  authUser: (params: AuthParams) => void,
  logout: () => void,
};

export interface CommodityResponse {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}

export interface Product {
  id:                   number;
  title:                string;
  description:          string;
  category:             string;
  price:                number;
  discountPercentage:   number;
  rating:               number;
  stock:                number;
  tags:                 string[];
  brand:                string;
  sku:                  string;
  weight:               number;
  dimensions:           Dimensions;
  warrantyInformation:  string;
  shippingInformation:  string;
  availabilityStatus:   string;
  reviews:              Review[];
  returnPolicy:         string;
  minimumOrderQuantity: number;
  meta:                 Meta;
  thumbnail:            string;
  images:               string[];
}

export interface Dimensions {
    width:  number;
    height: number;
    depth:  number;
}

export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode:   string;
    qrCode:    string;
}

export interface Review {
    rating:        number;
    comment:       string;
    date:          Date;
    reviewerName:  string;
    reviewerEmail: string;
}

export type CommodityState = {
  selectedProducts: Set<number>
  products: Product[],
  total: number | null
  skip: number | null
  limit: number | null
  isLoading: boolean,
  error: null | string,
  query: string
  sortBy: null | string,
  order: null | "asc" | "desc"
};

export interface CommodityListOptions {
  skip?: number
  limit?: number
}

export interface SortChangeOptions {
  order: "asc" | "desc"
  sortBy: string
}

export type CommodityActions = {
  getCommodityList: (options?: CommodityListOptions | Record<string, unknown>) => void
  setSelectedProduct: (id: number, selected: boolean) => void
  setAllProductsSelected: (selected: boolean) => void
  setCommodityQuery: (query: string) => void
  setSortOptions: (options: SortChangeOptions) => void
};
