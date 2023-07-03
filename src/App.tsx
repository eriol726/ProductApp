// import React from 'react'
import "./App.scss"
import { Routes, Route, Link } from 'react-router-dom'
import ProductDetail from "./Pages/product-details/product-detail"

import ProductSearch from "./Pages/product-search/product-search"
import About from "./Pages/about"
import Home from "./Pages/home"

function App() {
  return (
    <div className="App">
      <header>
         <div className="header-links">
          <div className="header-links__item">
            <Link to="/product-search">Products</Link>
          </div>
          <div className="header-links__item">
            <Link to="/">Home</Link>
          </div>
          <div className="header-links__item">
            <Link to="/about">About</Link>
          </div>
        </div>
      </header>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/product-search/" element={<ProductSearch />} />
          <Route path="/product-search/:id" element={<ProductSearch />} />
        </Routes>
      </div>
      <footer />
    </div>
  )
}

export default App
