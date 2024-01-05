import Myitemcard from "../components/MyItemscard";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function MyItemsList() {
    const [MyItem, setMyItems] = useState([]);
    const location = useLocation();
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

    return (
        <div className="align-top bg-gray-200 my-10 mx-20 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-center font-bold text-5xl w-full text-indigo-500 pb-4">My Items</h1>

            {MyItem.length === 0 ? (
                <div className="h-20 text-lg text-center p-10 align-center text-gray-400">No Items found</div>
            ) : (
                MyItem.map((item) => (
                    <Myitemcard
                        key={item.Item_id}
                        id={item.Item_id}
                        image={item.Item_Image}
                        name={item.Item_Name}
                        description={item.Item_Description}
                        price={item.Price}
                    />
                ))
            )}
        </div>
    );
}

export default MyItemsList;
