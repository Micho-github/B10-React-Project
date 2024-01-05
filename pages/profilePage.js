import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProfileCard from "../components/profileCard";
import { useLocation } from "react-router-dom";
function ProfilePage(){
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];
    return(
        <div>
            <Navbar USERID={user_Id}/>
            <ProfileCard/>
            <Footer/>
        </div>
    );
}
export default ProfilePage;
