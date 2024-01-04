import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import './uploader.css'
const Uploader = forwardRef((props, ref) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  const imageRef = useRef(null);

  // Expose the imageRef to the parent component
  useImperativeHandle(ref, () => ({
    getImageRef: () => imageRef.current,
  }));

  return (
    <main>
      <div
        className='uploader'
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          accept='image/*'
          className='input-field'
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
              imageRef.current = files[0]; // Update imageRef with the file object
            }
          }}
        />

        {image ? (
          <img
            src={image}
            width={150}
            height={150}
            alt={fileName}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        ) : (
          <>
            <MdCloudUpload color='#3F51B5' size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </div>

      <section className='uploaded-row'>
        <AiFillFileImage color='#1475cf' />
        <span className='upload-content'>
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No selected File");
              setImage(null);
            }}
          />
        </span>
      </section>
    </main>
  );
});

export default Uploader;
