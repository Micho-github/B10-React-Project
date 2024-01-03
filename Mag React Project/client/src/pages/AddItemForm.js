import React, { useEffect , useRef, useState } from "react";
import getSubcategories from "../components/subcategories"
import getCategoryDropdown from "../components/getCategoryDropdown";
import getCityDropdown from "../components/getCityDropdown";
import Uploader from "../components/uploader";
function AddItemForm(){
    useEffect(() => {
        const categoryDropdown = document.getElementById("category");
    
        const handleChange = () => {
          getSubcategories();
        };
    
        if (categoryDropdown) {
          categoryDropdown.addEventListener("change", handleChange);
    
          // Call the populateSubcategories function initially to populate subcategories based on the default selected category
          getSubcategories();
    
          return () => {
            categoryDropdown.removeEventListener("change", handleChange);
          };
        }
      }, []); // Empty dependency array ensures this effect runs once after the initial render
    
      const NumberInput = () => {
        const [value, setValue] = useState('');
      
        const handleInputChange = (e) => {
          // Allow only numeric input
          const inputValue = e.target.value.replace(/[^0-9]/g, '');
          setValue(inputValue);
          
        };
      }

  
    const ItemImageRef = useRef();
    const ItemNameRef = useRef();
    const ItemPriceRef = useRef();
    const ItemCategoryRef = useRef();
    const ItemSubcategoryRef = useRef();
    const ItemCityRef = useRef();
    const ItemDescriptionRef = useRef();
  
    function submitHandler(event) {
      event.preventDefault();
  
      const enteredImage = ItemImageRef.current && ItemImageRef.current.getImageRef();
      const enteredItemName = ItemNameRef.current.value;
      const enteredItemPrice = ItemPriceRef.current.value;
  
      // Access the selected indices within the submitHandler function
      const enteredItemCategory = ItemCategoryRef.current.options.selectedIndex;
      const enteredItemSubcategory = ItemSubcategoryRef.current.options.selectedIndex;
      const enteredItemCity = ItemCityRef.current.selectedIndex;
  
      const enteredDescription = ItemDescriptionRef.current.value;
  
      const formDataArray = [
        { name: "Image", value: enteredImage },
        { name: "Item Name", value: enteredItemName },
        { name: "Item Price", value: enteredItemPrice },
        { name: "Item Category", value: enteredItemCategory },
        { name: "Item Subcategory", value: enteredItemSubcategory },
        { name: "Item City", value: enteredItemCity },
        { name: "Description", value: enteredDescription },
      ];
  
      console.log("Form Data:", formDataArray);
    }
    return(
        <form onSubmit={submitHandler}>
            <Uploader ref={ItemImageRef} />

            <input type="text" required id="name" ref={ItemNameRef} name="name" placeholder="Item Name" className="text-center flex mx-auto mt-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            <input type="text" required id="price" ref={ItemPriceRef} onChange={NumberInput.handleInputChange} name="price" placeholder="Price ($)" className=" text-center flex mx-auto mt-5 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            
            <div className="mt-5 h-10 place-content-center items-center flex mb-4">
            <div dangerouslySetInnerHTML={{ __html: getCategoryDropdown() }} ref={ItemCategoryRef}/>
            </div>

            <div className="h-10 place-content-center items-center flex mb-4">
            <select id="subcategory" name="subcategory" ref={ItemSubcategoryRef} required>
            <option value="">Select a subcategory</option>
            </select>
            </div>
            
            <div className="h-10 place-content-center items-center flex mb-4">
        <div dangerouslySetInnerHTML={{ __html: getCityDropdown() }} ref={ItemCityRef}/>
        </div>
        
        <div className="flex flex-col mb-4 text-center">
        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
        <textarea id="description"ref={ItemDescriptionRef} required rows='5' name="description" className="mx-auto w-1/2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
        </div>
        <button className=" flex mx-auto mt-5 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Add Item</button>
        </form>
    );
}
export default AddItemForm;