import react from "@heroicons/react";
import REAct from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import FilterBar from "../components/filterBar";


function FilterPage(){
    return( 
        <div>
            <Navbar/>
            <div>
                <h1 id="welcome" className="text-blue-500">Filter</h1>
                <h1 id="welcoming_description" className="text-gray-900">Get Items From YOUR Location, Desired Categories And Their Sub Categories</h1>
            </div>
            <FilterBar/>
            <Footer/>
        </div>
    );
}
export default FilterPage;