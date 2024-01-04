import Navbar from "../components/navbar";
import ItemListHome from "../components/itemListHome";
import SearchBar from "../components/searchBar";
import FilterButton from "../components/filterButton";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";

function MainPage(){

    const location = useLocation();
  const user_Id = location.pathname.split("/")[1];
    console.log(user_Id);
    return(
        <div>
            
            <Navbar USERID={user_Id}/>
            <div>
                <h1 id="welcome" className="text-blue-500">Welcome To MAG</h1>
                <h1 id="welcoming_description" className="text-gray-900">The Best Marketplace For YOU</h1>
            </div>
            <SearchBar/>
            <FilterButton/>
            <ItemListHome/>
            <Footer/>
        </div>
    );
}
export default MainPage;