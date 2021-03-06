import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import NavBar from './components/NavBar'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
            <Route path="product" element={<ProductScreen />} />
            <Route path="product/:productId" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
