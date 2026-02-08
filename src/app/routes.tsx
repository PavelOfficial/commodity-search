import { Routes, Route } from "react-router"

import { Login } from "../pages/Login/Login"
import { NoMatch } from "../pages/NoMatch"
import { IndexPage } from "../pages/IndexPage"
import { Search } from "../pages/Search"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<IndexPage />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<Search />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
