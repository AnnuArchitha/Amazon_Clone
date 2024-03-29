import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';


function Checkout() {
  const [{basket,user},dispatch]=useStateValue();
  
  return (
    <div className = 'checkout'>
      <div className='checkout__left'>
        <img className='checkout__ad' src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt=''/>
      <div>
        <h3>Hello,{user? user.email : 'Guest'}</h3>
        //user.email works
        <h2 className='checkout__title'>Your shopping basket</h2> 
      
      {/*checkout product*/}
      
      {basket.map(item=>(<CheckoutProduct id={item.id} image={item.image} title={item.title} price={item.price} rating={item.rating}/>))}
      
      </div>
      </div>
      <div className='checkout__right'><Subtotal/></div>
    </div>
  )
}

export default Checkout