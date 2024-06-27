import React, { useState } from 'react';
import { FaPlus, FaPen } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import data from "@/data/BookingData.json";
// import { useRouter } from 'next/router';

const Bookings = () => {
  const [activeHeading, setActiveHeading] = useState('Recents');
  const [room,setRoom]=useState([]);
  // const router = useRouter();
  // const { value } = router.query;
  const api=`https://theluxuryhotelconcierge.onrender.com`

  const today = new Date().toISOString().split('T')[0];

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date);
  };

  const filteredData = data.filter((booking) => {
    if (activeHeading === 'Recents') {
      return (
        booking.date === "Today" ||
        (isValidDate(booking.date) &&
          new Date(booking.date).toISOString().split('T')[0] === today)
      );
    } else if (activeHeading === 'Pending Bookings') {
      return booking.status === 'Pending';
    }
    return true;
  });

  const handleHeadingClick = (heading) => {
    setActiveHeading(heading);
  };

  // useEffect(() => {

  //   const fetchHotels = async () => {
  //     try {
  //       const res = await axios.get(`${api}/admin/room/hotel/getAllRoomsInHotelWithPopulate`);
  //       // if (res.data.success) {
  //         setRoom(res.data);
  //         console.log(res.data);
  //       // } else {
  //         // }
  //       } catch (error) {
  //       // console.error('Failed to fetch hotels:', res.data.message);
  //       console.error('Error fetching hotels:', error);
  //     }
  //   };

  //   fetchHotels();
  // }, []);



  return (
    <div className='w-full h-full m-5 flex flex-col'>
      <h1 className='text-black text-xl font-bold mb-5'>Bookings</h1>

      <div className='flex items-center justify-between mx-10 mb-5'>
        <div className='flex items-center justify-center gap-5'>
          {['Recents', 'All Bookings', 'Pending Bookings'].map((heading) => (
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
          <span><FaPlus/></span>Add Booking
        </button>
      </div>

      <div className='bg-white mx-10 p-5 rounded-md shadow-md overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className=''>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Hotel Name & Code</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Status</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Date & Time</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {room.map((item, index) => (
              <tr key={index} className='bg-white border border-gray-400 '>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-10 w-10'>
                      <img className='h-10 w-10 rounded-full' src={item.img} alt='Hotel' />
                    </div>
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>{item.name}</div>
                      <div className='text-sm text-gray-500'>Code: XYZ123</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  {item.status === 'Booked' ? (
                    <span className='bg-green-500 text-white px-2 py-1 rounded-md'>{item.status}</span>
                  ) : (
                    <span className='bg-red-500 text-white px-2 py-1 rounded-md'>{item.status}</span>
                  )}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.date}</td>
                <td className='px-6 py-4 whitespace-nowrap flex gap-5'>
                  <button className='text-gray-500 hover:text-gray-900'><FaPen/></button>
                  <button className='text-gray-500 hover:text-gray-900'><LuDelete/></button>
                  <button className='text-gray-500 hover:text-gray-900'><HiDotsHorizontal/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
