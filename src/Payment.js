import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './Axios';
import {db} from './firebase';
import { doc,setDoc } from 'firebase/firestore';
import { collection} from "firebase/firestore"
import { round } from 'mathjs';
function Payment() {
const [{basket, user}, dispatch] = useStateValue();
const navigate = useNavigate();

 const stripe = useStripe();
 const elements = useElements();

 const[succeeded, setSucceeded] = useState(false);
 const[processing, setProcessing] = useState("");
const[error, setError] = useState(null);
const[disabled, setDisabled] = useState(true);
const[clientSecret, setClientSecret] = useState('');


useEffect(() => {
    //generate the special stripe secret which allow us to charge
 console.log('I am in use effect');
 
 
 const getClientSecret = async () => {
    try{

        const response = await axios({ 
         
         method : 'post',
         //Stripe expects the total in a currencies submits
         url: `/payments/create?total=${getBasketTotal(basket)}`
});
/*({ //axios is used for handling get or post request
         
      method : "post",
         //Stripe expects the total in a currencies submits
         url:'/payments/create?total= ${getBasketTotal(basket)*100}',
});*/
 console.log('response data', response.data);

 

setClientSecret(response.data.clientSecret)

} catch(err){
    console.log(err);
}
 }
getClientSecret();

}, [basket]);// get client secret from stripe whenever basket change


console.log('THE client SECRET IS >>>', clientSecret);




 const handleSubmit = async (event) => {
     //handle fancy stripe stuff
    try{
    event.preventDefault();
    setProcessing(true);
   const payload = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
           card: elements.getElement(CardElement),
       }
   })
   .then(( paymentIntent ) =>{
       //paymentIntent = payment confirmation
       //db.collection('users')
       //.doc(user?.uid)
       //.collection('orders')
       //.doc(paymentIntent.id).set({
       // basket: basket,
        //amount: paymentIntent.amount,
        //created: paymentIntent.created
        if(paymentIntent.paymentIntent.id){
        console.log('paymentintent'+paymentIntent);
        console.log('paymentintent'+JSON.stringify(paymentIntent));
        setDoc(doc(db, user?.uid, paymentIntent.paymentIntent.id), {
            basket: basket,
            amount: paymentIntent.paymentIntent.amount,
           created: paymentIntent.paymentIntent.created});
       
    }
        /*if (paymentIntent.id){
        console.log('PaymentIntent>>', paymentIntent.paymentIntent.id);
        const paymentRef = doc(db, collection, user?.uid, 'users',paymentIntent.id);
        setDoc(paymentRef, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
        });
        console.log('paymentref'+paymentRef)
    }*/

       
       setSucceeded (true);
       setError(null);
       setProcessing(false);
       dispatch({
        type : 'EMPTY_BASKET'
       })
       navigate("/orders", { replace :true })
   })
}
   catch(err){
    console.log(err);
}
    };
    

const handleChange = event =>{
//Listen for changes in the CardElement
//and display any errors as the customer types their card details

setDisabled(event.empty);
setError(event.error ? event.error.message : "");
}


    return (
        <div className='payment'>
           <div className="payment__container">
                 <h1>
                    Checkout {<Link to="/checkout">  ({basket?.length} items)  </Link>} 
                 </h1>

               {/*pAYMENT SECTION - delivery address*/}
               <div className="payment__section">
                  <div className="payment__title">
                      <h3>Delivery Address</h3>
                  </div>
                  <div className="payment__Address">
            <p>{user?.email}</p>
            <p>456 React Fullstack Amazon-clone</p>
            <p>Hyderabad, India</p>
                  </div>
               </div>
                {/*pAYMENT SECTION - review item*/}
                <div className="payment__section">
                <div className="payment__title">
                   <h3>Review items and delivery</h3>
                    </div>

                    <div className="payment__items">
                   {basket.map(item => (
                    <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    />
         ))}
                      
                   </div>

                   </div>


                    {/*pAYMENT SECTION - payment method*/}
                    <div className="payment__section">
                  <div className="payment__title">
                      <h3>Payment Method</h3>
                  </div>
                  <div className="payment__details">
                     {/*Stripe payment magic*/} 
                    <form onSubmit={handleSubmit} action="" name='form'>
                        <CardElement onChange={handleChange} />
                        <div className="payment__priceContainer">
                        <CurrencyFormat
                renderText={(value) => (
                <h3> Order Total: {value} </h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
        
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
        />
                   <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span> 
                   </button>
                        </div>
                        {/*Errors */}
                {error &&  <div> {error}</div>}
                    </form>

                  </div>
               </div>
               </div> 
        </div>
    )
}

export default Payment