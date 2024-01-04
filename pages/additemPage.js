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
            <div className="align-top pb-5 bg-gray-200 my-10 mx-10 border-double border-blue-500 border-2 rounded-lg">
            <h1 className="pt-10 text-center text-5xl w-full text-blue-600">Add Item</h1>
            <AddItemForm/>
    </div>
    <Footer/>
</div>
        
    );
}
export default AddItemPage;
