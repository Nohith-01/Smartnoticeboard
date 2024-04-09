import React, { useState } from 'react';
import axios from 'axios';

export default function Others() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('others');
  const [text,setText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

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
      axios.post('https://college-web-platform-backend-code.onrender.com/vignan/upload',{category , text , secure_url , fileType, endDate })
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
    
        <h3>Other Data:</h3>
        <label>Select file type:</label>
        <select value={fileType} onChange={handleTypeChange}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <br />

        <label>Select end date:</label>
        <input 
         className='endDate'
         type='date'
         onChange={(e)=>setEndDate(e.target.value)}
         value={endDate}
        
        />
        <br />
        <label>Enter the text:(regarding the upload, should be less than 90 words)</label>
        <input 
         className='yas'
         type='textarea'
         onChange={(e)=>setText(e.target.value)}
         value={text}
        
        />
        <label>Choose file:(Reminder:video should only be 30 seconds long)</label>
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
