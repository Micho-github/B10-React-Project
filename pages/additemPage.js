import Navbar from "../components/navbar";
import AddItemForm from "../components/AddItemForm";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
function AddItemPage() {

    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    return(
        <div>
            <Navbar USERID={user_Id}/>
            <div className="align-top pb-5 bg-gray-200 my-10 mx-10 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-center font-bold text-5xl w-full text-indigo-500 pb-4">Add Item</h1>
            <AddItemForm/>
    </div>
    <Footer/>
</div>
        
    );
}
export default AddItemPage;
