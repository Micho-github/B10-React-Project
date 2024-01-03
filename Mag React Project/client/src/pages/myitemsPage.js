import Navbar from "../components/navbar";
import Myitemcard from "../components/MyItemscard";
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const MyItemsPage = () => {
    const [MyItem,setItem] = useState([]);

    useEffect(()=>{
        const fetchAllItems = async ()=>{
            try{
                const res= await axios.get("http://localhost:8000/Allitems")
                console.log(res.data)
                setItem(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllItems()
    },[])
    
    
    return(
        <div>
            <Navbar/>
            <Link to="/additem">
                <div>
                <button className="flex mx-auto mt-16 mb-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg items-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full text-white text-3xl font-bold cursor-pointer mr-4 border-white border-2 align-middle p-5 pb-6">
                 +
                </div>
                 Add New Item
                </button>
            </div></Link>
            <div className="align-top bg-gray-200 my-10 mx-10 border-double border-black border-2 rounded-lg">
            <h1 className=" text-center text-5xl w-full text-black border-b-2 border-black pb-4">My Items</h1>
                {MyItem.map(item=>(
                    <Myitemcard 
                    id={item.id}
                    image={item.Item_Image}
                    name={item.Item_Name}
                    description={item.Item_Description}
                    price={item.Price}
                    />
                ))}
            </div>
        </div>
    );
}
export default MyItemsPage;