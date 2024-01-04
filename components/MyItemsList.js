import Myitemcard from "../components/MyItemscard";
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";

function MyItemsList(){
    const [MyItem,setMyItems] = useState([]);
    const location=useLocation();
    const user_Id = location.pathname.split("/")[1];

    useEffect(() => {
        // Wrap the async function in an IIFE to use async/await in useEffect
        (async () => {
            try {
                const res = await axios.get(`http://localhost:8000/${user_Id}/myitems`);
                console.log(res.data);
                setMyItems(res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
    return(

        <div className="align-top bg-gray-200 my-10 mx-10 border-double border-black border-2 rounded-lg">
        <h1 className=" text-center text-5xl w-full text-black border-b-2 border-black pb-4">My Items</h1>
        {MyItem.map((item) => (
            <Myitemcard 
                key={item.Item_id}
                id={item.Item_id}
                image={item.Item_Image}
                name={item.Item_Name}
                description={item.Item_Description}
                price={item.Price}
            />
        ))}
        </div>

    );
    
}
export default MyItemsList;