import React from 'react'

const OAuth = () => {
    const handleGoogleClick = async ()=>{
        try {
            
        } catch (error){
            console.log('Could not sign in with google', error);
            
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button'
     className='bg-fuchsia-500 text-white rounded-lg uppercase hover:opacity-85'>Continue with google</button>
  )
}

export default OAuth