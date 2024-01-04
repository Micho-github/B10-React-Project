import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import MyItemsList from "../components/MyItemsList";
import { useLocation } from "react-router-dom";

const MyItemsPage = () => {
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    console.log(user_Id)
    return(
        <div>
            <Navbar USERID={user_Id}/>
            <Link to={`/${user_Id}/additem`}>
                <div>
                <button className="flex mx-auto mt-16 mb-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white text-3xl font-bold cursor-pointer mr-4 border-white border-2 align-middle p-5 pb-6">
                 +
                </div>
                 Add New Item
                </button>
            </div></Link>
            <MyItemsList/>
            <Footer/>

        </div>
    );
}
export default MyItemsPage;