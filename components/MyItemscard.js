import React, { useEffect, useState } from 'react';
import DeleteModal from './DeleteModal';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Myitemcard(props) {
  const location = useLocation();
  const user_Id = location.pathname.split("/")[1];
  const [modalIsOpen, setModalIsOpen ] = useState(false);

  const [imageDataUrl, setImageDataUrl] = useState('');

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

  return (
    <div className="container bg-white px-5 py-3 mx-auto flex flex-wrap" key={props.id}>
      <div className="flex flex-wrap m-4 w-full">
        <div className="p-4 w-full">
          <div className="relative items-center flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
            <div className="sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full  text-indigo-500 flex-shrink-0" style={{ width: '100px', height: '100px' }}>
              <img src={imageDataUrl} alt="Item" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
            <div className="flex-grow">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{props.name}</h2>
              <p className="leading-relaxed text-base">{props.description}</p>
              <a className="mt-3 text-indigo-500 inline-flex items-center">{props.price}</a>
              <div className="absolute bottom-0 right-0">
              <Link to={`/${user_Id}/MyItems/update/${props.id}`}><button className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mr-2">Update</button></Link>
                <button className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mr-5 ml-5" onClick={deleteHandler}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {modalIsOpen && <DeleteModal id={props.id} onCancel={closeModalHandler} onClick={closeModalHandler} />}

    </div>
  );
}

export default Myitemcard;
