import React from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Header from './Header';
import Footer from './Footer';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App(){
    return (
            <BrowserRouter>
            <Header/>
            <Routes>
             <Route path="/login" element={<Login/>}/>
             <Route path="/" element={<Signup/>}/>
              <Route path="/home" element={<Home/>}/>
            </Routes>
            <Footer/>
            </BrowserRouter>
    );
}

export default App;