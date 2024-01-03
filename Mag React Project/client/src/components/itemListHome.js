import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemListHome = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAllItem = async () => {
      try {
        const res = await axios.get("http://localhost:8000/itemHome");
        setItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllItem();
  }, []);


  return (
    <div>
      <h1 id="itemTitle" className="text-blue-500">
        All Items
      </h1>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">All Items</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map((item) => (
              <Link key={item.Item_id} to={`/item/${item.Item_id}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  {item.Item_Image && (
                    <img
                      src={`data:image/jpeg;base64,${item.Item_Image}`}
                      alt={item.Item_Name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  )}
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{item.Item_Name}</h3>
                <p className="mt-1 text-lg font-medium text-blue-600">${item.Price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemListHome;