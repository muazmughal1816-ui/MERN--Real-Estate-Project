import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('')

    const onChange = (e) =>{

        setMessage(e.target.value);
    }

    useEffect(() => {
      const fetchLandlord = async () => {
        try {
            const rest = await fetch(`/api/user/${listing.userRef}`);
            const data = await rest.json();
            setLandlord(data);
        }
        catch (error) {
            console.log(error);
        }
      }

      fetchLandlord();
    }, [listing.userRef])
    

  return (
    <>
    {landlord && (
        <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea onChange={onChange} 
            className='border w-full p-3 rounded-lg' placeholder='Enter your message here...' name="message" id="message" rows='2' value={message} ></textarea>
             <a 
              href={`mailto:${landlord.email}?subject=Regarding ${encodeURIComponent(listing.name)}&body=${encodeURIComponent(message)}`}
              className='bg-slate-700 text-white cursor-pointer text-center p-3 uppercase rounded-lg hover:opacity-95 block w-full mt-2'
            >
              Send Message
            </a>
        </div>
    )}
    </>
  )
}

export default Contact