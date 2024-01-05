import axios from "axios";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

function ItemInfoCard({ item }) {
  const location = useLocation();

  const user_Id = location.pathname.split("/")[1];
  const [successMessage, setSuccessMessage] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState('');

  const handleRequestButtonClick = async (itemId) => {
    try {
      const response = await axios.put(`http://localhost:8000/item/${itemId}/reserve`, { userId: user_Id });
      console.log(response.data); // Success message or any response from the server
      setSuccessMessage(response.data.message);

      // Clear the success message after a few seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Clear the message after 3 seconds
    } catch (error) {
      console.error("Error reserving item:", error);
    }
  };


  const handleReportButtonClick = (username) =>{
    setSuccessMessage("Seller '" + username + "' has been reported.");
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear the message after 3 seconds 
  }
  const handleFavoritesButtonClick = (itemName) =>{
    setSuccessMessage("Item '" + itemName + "' added to Favorites.");
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000); // Clear the message after 3 seconds 
  }
  useEffect(() => {
    // Check if item and item.image are defined before accessing data
    if (item && item.Item_Image) {
      // Convert ArrayBuffer to base64 string
      const base64String = arrayBufferToBase64(item.Item_Image.data);
      setImageDataUrl(`data:image/png;base64,${base64String}`);
    }
  }, [item]);

  // Convert ArrayBuffer to base64
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

    return(
     <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
    <img src={imageDataUrl} alt="Item" style={{ width: "500px",height: "400px" }} />
      <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">Seller Name : {item.Username}</h2>

        <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>
          
        </div>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{item.Item_Name}</h1>
        <p class="leading-relaxed">{item.Item_Description}</p>
        <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          
         
        </div>
        <div class="flex">
          <span class="title-font font-medium text-2xl text-gray-900"> $ {item.Price}</span>
          <button onClick={() => handleRequestButtonClick(item.Item_id)}  class="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Request Item</button>
          <button onClick={() => handleReportButtonClick(item.Username)} class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-500 rounded">Report Seller</button>
          <button onClick={() => handleFavoritesButtonClick(item.Item_Name)} class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4 hover:bg-red-500">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24 ">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
        {successMessage && 
        <div className="mt-4 bg-gray-100 border  text-black-700 px-4 py-2 rounded">
            {successMessage}
          </div>}
      </div>
    </div>
  </div>
</section>

    );
}


export default ItemInfoCard;
