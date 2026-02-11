import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { enableMapSet } from 'immer';

import { ToastContainer } from 'react-toastify';

import './index.scss'
import { AppRoutes } from "./routes";

import 'react-responsive-modal/styles.css';

// init
enableMapSet();

// mount
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer />?
  </StrictMode>,
)
