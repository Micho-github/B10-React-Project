import Reserveditemcard from "./Reserveditemcard";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function ReservedItemsList() {
    const [reservedItems, setReservedItems] = useState([]);
    const location = useLocation();
    const user_Id = location.pathname.split("/")[1];

    useEffect(() => {
        // Wrap the async function in an IIFE to use async/await in useEffect
        (async () => {
            try {
                const res = await axios.get(`http://localhost:8000/${user_Id}/Reserved`);
                console.log(res.data);
                setReservedItems(res.data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [user_Id]);

    return (
        <div className="align-top bg-gray-200 mt-40 mb-10 mx-20 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 rounded-lg">
            <h1 className="text-center font-bold text-5xl w-full text-indigo-500 pb-4">My Reserved Items</h1>

            {reservedItems.length === 0 ? (
                <p className="h-20 text-xl text-center p-10 align-center text-gray-400">No reserved items found</p>
            ) : (
                reservedItems.map((item) => (
                    <Reserveditemcard
                        key={item.Item_id}
                        id={item.Item_id}
                        image={item.Item_Image}
                        name={item.Username}
                        email={item.Email}
                        phone={item.Phone_no}
                        requestdate={item.Date_Of_Request}
                        price={item.price}
                    />
                ))
            )}
        </div>
    );
}

export default ReservedItemsList;
