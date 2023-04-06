import React, { useState } from 'react'

export default function CreateListing() {
  const [ formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1
  });
  const { type, name, bedrooms, bathrooms } = formData;
  function onChange(e){
    
  }

  return (
    <main 
      className='max-w-md px-2 mx-auto'
    >
      <h1 className='text-3xl font-bold text-center mt-6'>Create a Listing</h1>
      <form>
        <p className='text-lg mt-6 font-semibold'>
          Sell / Rent
        </p>
        <div className='flex'>
          <button 
            type='button'
            id='type'
            value="sale"
            onClick={onChange}
            className={`
              mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadov-lg transition ease-in-out duration-150 w-full
              ${
                type === "rent" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`
            }
          > 
            Sell
          </button>

          <button 
            type='button'
            id='type'
            value="rent"
            onClick={onChange}
            className={`
              ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadov-lg transition ease-in-out duration-150 w-full
              ${
                type === "sale" ? "bg-white text-black" : "bg-slate-600 text-white"
              }`
            }
          >
            rent
          </button>
        </div>
        <p
          className='text-lg mt-6 font-semibold'
        >
            Name
        </p>
        <input 
          type='text'
          id="name"
          value={name}
          onChange={onChange}
          placeholder='Name'
          maxLength="32"
          minLength="10"
          required
          className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 '
        />

        <div className=''>
          <div className=''>
            <p className='text-lg font-semibold'>Beds</p>
            <input 
              type='number'
              id='bedrooms'
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className='w-full px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
            />
          </div>

          <div className=''>
            <p className='text-lg font-semibold'>Baths</p>
            <input 
              type='number'
              id='bathrooms'
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className='px-4 py-2 text-lg text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center'
            />
          </div>

          
        </div>
      </form>
    </main>
  )
}

// testing git 
// something went wrong with git


//   4:16