import './UploadImagePage.css'
import React, { useState, useRef } from 'react';

const ProfilePhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    // Logic for uploading the selected file
    // You can make an API call here or perform any other necessary operations
    console.log('Uploading file:', selectedFile);
  };

  return (
    <div className="profile-photo-upload">
      <h3>Profile Photo Upload</h3>
      <div
        className="image-section"
        onClick={handleFileClick}
        style={{ backgroundImage: selectedFile ? `url(${URL.createObjectURL(selectedFile)})` : 'none' }}
      >
        {!selectedFile && <span>Click to select photo</span>}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default ProfilePhotoUpload;
