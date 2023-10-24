import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/products";
import OrderLists from "./pages/orderlists";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route>
              <Route path="/" index element={<Products />} />
              <Route path="orderlists" element={<OrderLists />} />
              <Route path="*" element={<>404</>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
