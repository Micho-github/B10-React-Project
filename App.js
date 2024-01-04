import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import MyItemsPage from "./pages/myitemsPage";
import ReservedPage from "./pages/ReservedPage";
import ProfilePage from "./pages/profilePage";
import LoginPage from "./pages/loginPage";
import AddItemPage from "./pages/additemPage";
import './App.css'
import FilterPage from "./pages/FilterPage";
import ItemPage from "./pages/itemPage";
import UpdatePage from "./pages/updatePage"

function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/:id' element={<MainPage/>}/>
            <Route path='/:id/Myitems' element={<MyItemsPage/>}/>
            <Route path='/:id/Myitems/update/:id' element={<UpdatePage/>}/>
            <Route path='/:id/Reserved' element={<ReservedPage/>}/>
            <Route path='/:id/Profile' element={<ProfilePage/>}/>
            <Route path='/:id/Additem' element={<AddItemPage/>}/>
            <Route path="/:id/Filters" element={<FilterPage/>}/>
            <Route path="/:id/item/:itemId" element={<ItemPage/>} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
