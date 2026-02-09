import { Routes, Route } from "react-router"

import { Login } from "../ui/Login/Login"
import { NoMatch } from "../ui/NoMatch"
import { IndexPage } from "../ui/IndexPage"
import { Search } from "../ui/Search"

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
