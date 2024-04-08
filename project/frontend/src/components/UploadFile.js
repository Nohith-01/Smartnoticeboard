import React, { useState } from 'react';
import axios from 'axios';

export default function UploadFile() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('sports');
  const [text,setText] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', fileType === 'image' ? 'images_preset' : 'videos_preset');

    try {
      let cloudName = process.env.CLOUD_NAME;
      let resourceType = fileType === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/dewyxcn9b/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log('Uploaded URL:', secure_url);
      axios.post('http://localhost:4000/vignan/upload',{category , text , secure_url , fileType })
    } catch (error) {
      console.log(error);
      setError('Failed to upload file. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    uploadFile().finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='form-main'>
      <form onSubmit={handleSubmit}>
      <label>Choose a category:</label>
      <select value={category} onChange={handleCategoryChange}>
        <option value="sports">Sports</option>
        <option value="events">Events</option>
        <option value="Circular">Circulars</option>
        <option value="Others">Others</option>
      </select>
      <br/>

        <label>Select file type:</label>
        <select value={fileType} onChange={handleTypeChange}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <br />
        <label>Enter the text:(regarding the upload)</label>
        <input 
         className='yas'
         type='textarea'
         onChange={(e)=>setText(e.target.value)}
         value={text}
        
        />
        <label>Choose file:</label>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button type="submit" disabled={!file || loading}>
          Upload
        </button>
      </form>
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
