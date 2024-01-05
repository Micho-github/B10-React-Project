import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UnreserveModal from './UnreserveModel';
function Reserveditemcard(props) {

  const location = useLocation();
  const user_Id = location.pathname.split("/")[1];

  const [modalIsOpen, setModalIsOpen ] = useState(false);

  const [imageDataUrl, setImageDataUrl] = useState('');
  const [reqdate, setreqdate] = useState('');

  const deleteHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    // Convert ArrayBuffer to base64 string
    const base64String = arrayBufferToBase64(props.image.data);
    setImageDataUrl(`data:image/png;base64,${base64String}`);
  }, [props.image]);

  // Convert ArrayBuffer to base64
  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
useEffect(()=>{
    const datestring = props.requestdate.split("T")[0];
    setreqdate(datestring);
},[props.requestdate]
);

  return (
    <div className="container bg-white px-5 py-3 mx-auto flex flex-wrap" key={props.id}>
      <div className="flex flex-wrap m-4 w-full">
        <div className="p-4 w-full ">
          <div className="relative shadow-md items-center flex border-2 rounded-lg border-gray-300 border-opacity-50 p-8 sm:flex-row flex-col">
            <div className="sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0" style={{ width: '100px', height: '100px' }}>
              <img src={imageDataUrl} alt="Item" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
            <div className="flex-grow">
            <h2 className="text-gray-900 text-lg font-semibold mb-3">Seller Information:</h2>
<p className="text-m font-medium text-gray-900 truncate dark:text-black">Username: {props.name}</p>
<p className="text-m font-medium text-gray-900 truncate dark:text-black">Email: {props.email}</p>
<p className="text-m font-medium text-gray-900 truncate dark:text-black">Phone: {props.phone}</p>
<p className="text-m font-medium text-gray-900 truncate dark:text-black">Date Of Your Request: {reqdate}</p>
<p className="text-m font-medium text-gray-900 truncate dark:text-black">Price: $ {props.price}</p>
<div className="absolute bottom-0 right-0">


                <button className="text-white bg-indigo-500 border-0 mb-2 py-1 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mr-5 ml-4" onClick={deleteHandler}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && <UnreserveModal id={props.id} onCancel={closeModalHandler} onClick={closeModalHandler} />}
    </div>
  );
}

export default Reserveditemcard;
