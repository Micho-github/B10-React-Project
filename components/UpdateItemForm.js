import React, { useEffect, useRef, useState } from "react";
import Uploader from "../components/uploader";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateItemForm() {
  
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  
  const navigate = useNavigate()
  const location = useLocation()
  const ItemId= (location.pathname.split("/")[4])
  const user_Id = (location.pathname.split("/")[1])

  
  const ItemImageRef = useRef();
  const ItemNameRef = useRef();
  const ItemPriceRef = useRef();
  const ItemCategoryRef = useRef();
  const ItemSubcategoryRef = useRef();
  const ItemCityRef = useRef();
  const ItemDescriptionRef = useRef();


  const handleNumberInputChange = (e) => {
    // Allow only numeric input
    const inputValue = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = inputValue;
  };

  useEffect(() => {
    // Fetch categories from your server
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8000/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    // Call the fetchCategories function
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/subcategories/${ItemCategoryRef.current.value}`
        );
        setSubcategories(res.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
  
    const handleChange = () => {
      fetchSubcategories();
    };
  
    // Adding an event listener to handle category changes
    const categoryRef = ItemCategoryRef.current;
    if (categoryRef) {
      categoryRef.addEventListener("change", handleChange);
    }
  
    // Cleanup the event listener on component unmount
    return () => {
      if (categoryRef) {
        categoryRef.removeEventListener("change", handleChange);
      }
    };
  }, [ItemCategoryRef]);
  
  useEffect(() => {
    // Fetch cities from your server
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:8000/cities");
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };

    // Call the fetchCities function
    fetchCities();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    // Access the selected indices within the submitHandler function
    const enteredItemCategory = ItemCategoryRef.current.value;
    const enteredItemSubcategory = ItemSubcategoryRef.current.value;
    const enteredItemCity = ItemCityRef.current.value;

    const enteredImage = ItemImageRef.current.getImageRef();
    const enteredItemName = ItemNameRef.current.value;
    const enteredItemPrice = ItemPriceRef.current.value;
    const enteredDescription = ItemDescriptionRef.current.value;
    
    try {
      console.log(enteredImage);
    const res = await axios.put("http://localhost:8000/MyItems/update/" + ItemId, {
      image: "",
      name: enteredItemName,
      description: enteredDescription,
      price: enteredItemPrice,
      userid: user_Id,
      category: enteredItemCategory,
      subcategory: enteredItemSubcategory,
      city: enteredItemCity,
    });
    console.log("Form Data:", res);
    navigate(`/${user_Id}/myitems`)
  } catch (error) {
    console.error("Error submitting form:", error);
  }
  };

  return (
    <form onSubmit={submitHandler}>
      <Uploader ref={ItemImageRef} />

      <input
        type="text"
        required
        id="name"
        ref={ItemNameRef}
        name="name"
        placeholder="Item Name"
        className="text-center flex mx-auto mt-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
      <input
        type="text"
        required
        id="price"
        ref={ItemPriceRef}
        onChange={handleNumberInputChange}
        name="price"
        placeholder="Price ($)"
        className=" text-center flex mx-auto mt-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />

      <div className="mt-5 h-10 place-content-center items-center flex mb-4">
        <select             className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          id="category" name="category" ref={ItemCategoryRef} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.Category_Code} value={category.Category_Code}>
              {category.Category_Description}
            </option>
          ))}
        </select>
      </div>

      <div className="h-10 place-content-center items-center flex mb-4">
  <select             className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          id="subcategory" name="subcategory" ref={ItemSubcategoryRef} required>
    <option value="">Select a subcategory</option>
    {subcategories.map((subcategory) => (
      <option key={subcategory.Sub_Category_Code} value={subcategory.Sub_Category_Code}>
        {subcategory.Sub_Category_Description}
      </option>
    ))}
  </select>
</div>


      <div className="h-10 place-content-center items-center flex mb-4">
        <select             className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-indigo-600 focus:outline-none dark:focus:ring-blue-800"
          id="city" name="city" ref={ItemCityRef} required>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.City_Code} value={city.City_Code}>
              {city.City_Description}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col mb-4 text-center">

        <textarea
          id="description"
          placeholder="Enter Your Item Description here"
          ref={ItemDescriptionRef}
          required
          rows="5"
          name="description"
          className=" bg-gray-100 mx-auto w-1/2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
      </div>
      <button type="submit" className=" flex mx-auto mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Update
      </button>
    </form>
  );
}
export default UpdateItemForm;
