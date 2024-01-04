import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useLocation } from "react-router-dom";
function ProfilePage(){
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    return(
        <div>
            <Navbar USERID={user_Id}/>
            <h1>Profile Page</h1>
            <Footer/>
        </div>
    );
}
export default ProfilePage;