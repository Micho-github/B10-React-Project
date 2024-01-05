import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
import MyItemsList from "../components/MyItemsList";
import { useLocation } from "react-router-dom";
import { PlusCircleIcon } from '@heroicons/react/24/outline'
const MyItemsPage = () => {
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    console.log(user_Id)
    return(
        <div>
            <Navbar USERID={user_Id}/>
                <div>
                <Link to={`/${user_Id}/additem`} className="w-80 flex mx-auto mt-16 mb-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-2xl items-center">
                 <PlusCircleIcon className="w-20 mr-5"/>
                 Add New Item
                 </Link>
            </div>
            <MyItemsList/>
            <Footer/>
        </div>
    );
}
export default MyItemsPage;