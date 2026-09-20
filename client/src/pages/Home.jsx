import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listingitem from '../components/Listingitem';

const Home = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation]);
   // Fix: Ensured clean console logs to prevent ReferenceErrors
  // console.log("Current Offer Listings:", offerListings);
  // console.log("Current Sale Listings:", saleListings);
 
 
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log("offer fetch error:",error);
        
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log("rent fetch error:",error);
        
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log("sale fetch error:",error);
        
      }
    }
    fetchOfferListings();
  }, [])
  
  return (
    <div>
      {/* top */}

      <div className="flex flex-col gap-6 p-26 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>Perfect</span> 
          <br />
          place with ease
        </h1>
        <div className="text-gray-500 text-sm sm:text-sm">
          Mughal'z Estate is the best place to find your next perfect place to live.
          <br />
          We have the wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-sm sm:text-sm text-blue-800 font-bold hover:underline'>
        Let's het started...
        </Link>
      </div>

      {/* swiper */}      

     {offerListings && offerListings.length > 0 && (
        <div className="max-w-6xl mx-auto px-3 my-6">
          {/* Added modules and navigation props directly to force Swiper initialization */}
          <Swiper 
            modules={[Navigation]} 
            navigation={true}
            className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg"
          >
            {offerListings.map((listing) => (
              /* CRITICAL: React 'key' attribute must stay on the top component inside the map loop */
              <SwiperSlide key={listing._id}>
                <div  
                  style={{  
                    background: `url(${listing.imageUrls && listing.imageUrls[0] ? listing.imageUrls[0] : ''}) center no-repeat`, 
                    backgroundSize: 'cover'
                  }} 
                  className='h-full w-full'
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* listing results for offer, sale and rent */}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-500'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?offer=true'}>
                Show more offers 
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <Listingitem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-500'>Recent places for Rent</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?type=rent'}>
                Show more places for rent 
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <Listingitem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }

        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl font-semibold text-slate-500'>Recent places for Sale</h2>
                <Link className='text-sm text-blue-800 hover:underline ' to={'/search?type=sale'}>
                Show more places for sale
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <Listingitem listing={listing} key={listing._id}/>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home