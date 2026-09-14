import React from 'react'

const CreateListing = () => {
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
                    <input className='p-3 border border-gray-400 rounded w-full' type="file" id='images' accept='image/*' multiple />
                    <button className='p-3 border text-green-600 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                </div>
            <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}

export default CreateListing