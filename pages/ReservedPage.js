import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
import ReservedItemsList from "../components/ReservedItemsList";

function ReservedPage(){
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    return(
        
        <div>
            <Navbar USERID={user_Id}/>
            <ReservedItemsList/>
            <Footer/>
        </div>
    );
}
export default ReservedPage;