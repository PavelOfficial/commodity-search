import { authGuard } from './authGuard';

export const SearchBase = () => {
  return (
    <div>Search</div>
  );
}

export const Search = authGuard(SearchBase);
