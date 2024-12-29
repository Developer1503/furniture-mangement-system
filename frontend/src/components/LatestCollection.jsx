import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';


const LatestCollection = () => {
      const { products } = useContext(ShopContext);
      const {latestProducts,setLatestProducts }= useState([]);
      useEffect(()=>{
      setLatestProducts=(products.slice(0,5))

      },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
         <Title text1={'NEW'} text2={'COLLECTION'}/>
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500'>
         These products are made with wood from forest certified to be respo2nsibly
         </p>
          </div>
        
        {/* Latest Collection rendering */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
          <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

          ))


        }



    </div>


      
    </div>
  )
}

export default LatestCollection
