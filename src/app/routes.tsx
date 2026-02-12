import { Routes, Route, Navigate } from "react-router"

import { Login } from "@/ui/Login/Login"
import { Search } from "@/ui/Search/Search"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate replace to="/search" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
      <Route path="*" element={<Navigate replace to="/search" />} />
    </Routes>
  );
}
