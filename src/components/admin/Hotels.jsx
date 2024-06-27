import React, { useState,useEffect } from 'react';
import { FaPlus, FaPen } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from 'axios';
// import { useRouter } from 'next/router';



const Hotels = () => {
  
  // const router = useRouter();
  const api=`https://theluxuryhotelconcierge.onrender.com`

  const [activeHeading, setActiveHeading] = useState('All Hotels');
  const [hotels, setHotels] = useState([]);

  useEffect(() => {

    const fetchHotels = async () => {
      try {
        
        const res = await axios.get(`${api}/hotel/getHotel`);
        // if (res.data.success) {
          setHotels(res.data);
          console.log(res.data);
        // } else {
          // }
        } catch (error) {
        // console.error('Failed to fetch hotels:', res.data.message);
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);


  // const data = [
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
    // {
    //   img: "./y2.png",
    //   heading: "Dubai International Airport Hotel",
    //   location: "Dubai International Air..",
    //   date: "2 Rooms",
    // },
  // ];

  const handleHeadingClick = (heading) => {
    setActiveHeading(heading);
  };



  const openRooms=(i)=>{
    const value = i; // Replace with your actual value
    router.push({
      pathname: `/destination/${i}`
    });
  };

  return (
    <div className='w-full h-full m-5 flex flex-col'>
      <h1 className='text-black text-xl font-bold mb-5'>Hotels</h1>

      <div className='flex items-center justify-between mx-10 mb-5'>
        <div className='flex items-center justify-center gap-5'>
          {['All Hotels', 'Active Hotels', 'Blocked Hotels'].map((heading) => (
            <div 
              key={heading} 
              className={`flex flex-col cursor-pointer ${activeHeading === heading ? 'text-black' : 'text-gray-500'}`}
              onClick={() => handleHeadingClick(heading)}
            >
              <h1 className='text-xl'>{heading}</h1>
              <span className={`w-full h-[2px] ${activeHeading === heading ? 'bg-black' : 'bg-transparent'}`}></span>
            </div>
          ))}
        </div>
        <button className='bg-black rounded-md flex p-3 items-center gap-2 justify-center text-white'>
          <span><FaPlus/></span>Add Hotels
        </button>
      </div>

      <div className='bg-white mx-10 p-5 rounded-md shadow-md overflow-x-auto'>
        {/* Table */}
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className=''>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Hotel Name & Phone</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Location</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Availability</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {hotels.map((item, index) => (
              <tr key={index} className='bg-white border border-gray-400'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    {item.photoUrls.map((i)=>{

                    <div className='flex-shrink-0 h-10 w-10'>
                      <img className='h-10 w-10 rounded-full' src={i} alt='Hotel' />
                    </div>

                    // <button>hi</button>
                    
                    })}
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>{item.name}</div>
                      <div className='text-sm text-gray-500'>{item.phone}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium'>
                  {item.location.city+" "+item.location.country}
                </td>
                {/* <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.date}</td> */}
                <td className='px-6 py-4 whitespace-nowrap flex gap-5'>
                  <button className='text-gray-500 hover:text-gray-900'><FaPen/></button>
                  <button className='text-gray-500 hover:text-gray-900'><LuDelete/></button>
                  <button className='text-gray-500 hover:text-gray-900'><HiDotsHorizontal/></button>
                </td>
                {/* <td><button onClick={openRooms(item._id)}>View Rooms</button></td> */}
              </tr>
              // <button>hi</button>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Hotels;
