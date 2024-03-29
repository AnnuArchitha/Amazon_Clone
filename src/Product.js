import React from 'react'
import './Product.css'
import { useStateValue } from './StateProvider'

function Product({id,title,price,rating,image}) {
  
  const [{basket}, dispatch]=useStateValue();
  console.log("this is basket",{basket});
  
  const addToBasket =()=>{
   //dispatch the item into data layer
   //dispatch - manipulate the data
   dispatch({
    type: 'ADD_TO_BASKET',
    item:{
      id:id,
      title:title,
      image:image,
      price:price,
      rating:rating,
    },
   });
  };
  return (
    <div className='product'>
        <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
            <small>$</small>
            <strong>{price}</strong>
        </p>
        <div className='product__rating'>
            {Array(rating).fill().map((_, i)=>(<p>🌟</p>))}
        </div>
        </div>
        <img src={image} alt=''></img>
        <button onClick={addToBasket}>Add to Basket</button>
        
    </div>
  );
}

export default Product;