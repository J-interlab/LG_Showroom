import React from "react";
import './App.css';
import ProductViewer from "./components/ProductViewer";
import AdminPage from "./components/AdminPage";
import {BrowserRouter, HashRouter, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App" style={{backgroundColor: "#d8d8d8", height: "100vh"}}>
        <HashRouter>
            <Routes>
                <Route path='/products/:productName' element={<ProductViewer/>} />
                <Route exact path="/" element={<AdminPage />}/>
            </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
