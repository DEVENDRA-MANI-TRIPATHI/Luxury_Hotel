import React, { useState , useEffect} from 'react';
import { FaPlus, FaPen } from "react-icons/fa";
import { LuDelete } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from 'axios';

const Users = () => {
  const [activeHeading, setActiveHeading] = useState('Recents Users');
  const [user,setUser]=useState([])

  const api=`https://theluxuryhotelconcierge.onrender.com`

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${api}/user/all`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
        console.log('Users data:', data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  // const data = [
  //   {
  //     img: "./img1.jpeg",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  //   {
  //     img: "./img2.webp",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  //   {
  //     img: "./img3.jpeg",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  //   {
  //     img: "./img2.webp",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  //   {
  //     img: "./img1.jpeg",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  //   {
  //     img: "./img4.jpeg",
  //     heading: "John Wick (johnwick12@gmail.com)",
  //     Booking: "23 June ‘24 8.29 pm",
  //     CheckIn: "23 June ‘24 8.29 pm",
  //     CheckOut: "23 June ‘24 8.29 pm",
  //   },
  // ];

  const handleHeadingClick = (heading) => {
    setActiveHeading(heading);
  };

  return (
    <div className='w-full h-full m-5 flex flex-col'>
      <h1 className='text-black text-xl font-bold mb-5'>Guest & Users</h1>

      <div className='flex items-center justify-between mx-10 mb-5'>
        <div className='flex items-center justify-center gap-5'>
          {['Recents Users', 'All Users', 'Pending Users'].map((heading) => (
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
          <span><FaPlus/></span>Add Users
        </button>
      </div>

      <div className='bg-white mx-10 p-5 rounded-md shadow-md overflow-x-auto'>
        {/* Table */}
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className=''>
            <tr>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Guest & Users</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Booking Date</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Check In</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Check Out</th>
              <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className=''>
            {user && user.map((item, index) => (
              <tr key={index} className='bg-white border border-gray-400'>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    {/* <div className='flex-shrink-0 h-10 w-10'> */}
                      {/* <img className='h-10 w-10 rounded-full' src={item.img} alt='User' /> */}
                    {/* </div> */}
                    <div className='ml-4'>
                      <div className='text-sm font-medium text-gray-900'>{item.username}</div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>{item.mail}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.createdAt}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{item.updatedAt}</td>
                <td className='px-6 py-4 whitespace-nowrap flex gap-5'>
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

export default Users;
