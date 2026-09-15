import { getDatabase, ref, set } from 'firebase/database';
import React, { useState } from 'react'
import { app } from '../firebase';

const CreateListing = () => {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    console.log(formData);
    const [imageUploadError, setImageUploadError] = useState(false);
       const [uploading, setUploading] = useState(false);
    
    const handleImageSubmit = (e) =>{
        if (files.length > 0 && files.length + formData .imageUrls.length< 7){
            setUploading(true);
            setImageUploadError(false)
            const promises = [];
        for (let i = 0; i < files.length; i++) {
                // Check size limit (2MB) since we are storing as strings
                if (files[i].size > 2 * 1024 * 1024) {
                    setImageUploadError('Each image must be less than 2MB');
                    setUploading(false);
                    return;
                }
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) =>{
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls),});
                setUploading(false);
            })
            . catch((err) =>{
                setImageUploadError('Image uplaod failed( 2mb max per image)');
                setUploading(false)
            });
        }else{
            setImageUploadError('You can only upload 6 images per listing')
            setUploading(false);
        }
    };

     // 2. FIXED: Replaced Storage code with pure Realtime Database Base64 handling
   const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const dbInstance = getDatabase(app);
            const fileName = new Date().getTime() + '_' + file.name.replace(/[.#$[\]]/g, '_');
            const storageRef = ref(dbInstance, `listing_images/${fileName}`);

            const reader = new FileReader();
            reader.readAsDataURL(file); // Converts raw binary into Base64 string
            
            reader.onload = async () => {
                const base64String = reader.result;
                try {
                    // Save base64 data to database path location
                    await set(storageRef, { url: base64String });
                    resolve(base64String); // Send string back to the form loop
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => reject(error);
        });
    };


    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };
    
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input className='border p-3 rounded-lg' id='name' type="text" placeholder='Name' maxLength='62' minLength='10' required />
                <textarea className='border p-3 rounded-lg' id='description' type="text" placeholder='Description' required />
                <input className='border p-3 rounded-lg' id='address' type="text" placeholder='Address' required />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id='sale' />
                        <span>Sell</span>
                    </div>

                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id='rent' />
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id='parking' />
                        <span>Parking spot</span>
                    </div>

                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id='furnished' />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id='offer' />
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id='bedrooms' min='1' max='10' required />
                        <p>Beds</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id='bathrooms' min='1' max='10' required />
                        <p>Baths</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id='regularPrice' min='1' max='10' required />
                        <div className='flex flex-col items-center'>
                        <p>Regular price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input className='p-3 border border-gray-400 rounded-lg' type="number" id='discountPrice' min='1' max='10' required />
                        <div className='flex flex-col items-center'>
                        <p>Discounted price</p>
                        <span className='text-xs'>($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The First image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files)}
                    className='p-3 border border-gray-400 rounded w-full' type="file" id='images' accept='image/*' multiple />
                    <button type='button' onClick={handleImageSubmit} 
                    className='p-3 border text-green-600 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
            <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                    return (
                    <div key={url} className='flex justify-between p-3 border items-center'>
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button onClick={() =>handleRemoveImage(index)}
                        type='button' className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                    </div>
                    )
                })
            }
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing