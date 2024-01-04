import Navbar from "../components/navbar";
import ItemListHome from "../components/itemListHome";
import SearchBar from "../components/searchBar";
import Footer from "../components/footer";


function MainPage(){
    return(
        <div>
            <Navbar/>
            <div>
                <h1 id="welcome" className="text-blue-500">Welcome To MAG</h1>
                <h1 id="welcoming_description" className="text-gray-900">The Best Marketplace For YOU</h1>
            </div>
            <SearchBar/>
            <ItemListHome/>
            <Footer/>
        </div>
    );
}
export default MainPage;