import { useState } from 'react';
import axios from 'axios';

const Pinata = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [jsonFileUrl, setJsonFileUrl] = useState('');

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert('Please select an image!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', image);

    try {
      // Upload image to Pinata
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': '56beee8eaad7b6bb9d40',
          'pinata_secret_api_key': '59468f96394c29587a3050cbdcc4e9ea4e9711b6adbe3444d492e15fb215f595',
        },
      });

      const ipfsHash = response.data.IpfsHash;
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setImageUrl(ipfsUrl);
      
      // Now create a JSON object containing the image URL
      const jsonObject = {
        imageUrl: ipfsUrl,
      };

      // Create a Blob from the JSON object
      const blob = new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });

      // Create a FormData object for the JSON file
      const jsonFormData = new FormData();
      jsonFormData.append('file', blob, 'imageData.json');

      // Upload JSON file to Pinata
      const jsonResponse = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', jsonFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'pinata_api_key': '56beee8eaad7b6bb9d40',
          'pinata_secret_api_key': '59468f96394c29587a3050cbdcc4e9ea4e9711b6adbe3444d492e15fb215f595',
        },
      });

      const jsonFileHash = jsonResponse.data.IpfsHash;
      setJsonFileUrl(`https://gateway.pinata.cloud/ipfs/${jsonFileHash}`);

      alert('Image and JSON uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image or JSON:', error);
      alert('Failed to upload image or JSON');
    }

    setLoading(false);
  };

  return (
    <div>

      <div className="relative flex size-full min-h-screen flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <div className="flex flex-col p-4">
              <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-[#344d65] px-6 py-14">
                <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag &amp; drop your image here</p>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Choose an image from your device</span>
                </button>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image and JSON'}
      </button>
      
      {imageUrl && (
        <div>
          <h3>Image URL:</h3>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className='text-white'>
            {imageUrl}
          </a>
        </div>
      )}

      {jsonFileUrl && (
        <div>
          <h3>JSON File URL:</h3>
          <a href={jsonFileUrl} target="_blank" rel="noopener noreferrer" className='text-white'>
            {jsonFileUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default Pinata;
