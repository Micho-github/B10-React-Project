import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import AddItemPage from "./pages/addItemPage";
import FavoritesPage from "./pages/favoritesPage";
import ProfilePage from "./pages/profilePage";
import LoginPage from "./pages/loginPage";
import ItemPage from "./pages/itemPage";

import './App.css';
import FilterPage from "./pages/filterPage";

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/AddItem' element={<AddItemPage/>}/>
            <Route path='/Favorites' element={<FavoritesPage/>}/>
            <Route path='/Profile' element={<ProfilePage/>}/>
            <Route path='/Login' element={<LoginPage/>}/>
            <Route path="/Filters" element={<FilterPage/>}/>
            <Route path="/item/:itemId" element={<ItemPage/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
