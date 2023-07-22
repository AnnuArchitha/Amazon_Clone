/* 

Functions (index.j file)

const functions = require("firebase-functions");
const express=require('express')
const cors=require('cors')
const stripe=require("stripe")
('sk_test_51NCdoFSAyIh6qE6BREdGhauDF8FfD75DtmCDz1vaNh6rX7lyS1YWTZhyio4xCPU5RR8viSxVUhAklOvRBWTed9Nz00KCO38rnm');
//app

//app config
const app=express();
//middlewares
app.use(cors({origin:true}));
app.use(express.json());
//api routes
app.get('/',(request,response)=> {response.status(200).send('hello world')});
app.post('/payments/create', async (request,response)=>{
    const total=request.query.total;
    console.log('payment request : received boom',total);
    try{
    const paymentIntent= await stripe.paymentIntents.create({
        amount: total,
        currency:'usd',
        automatic_payment_methods :{
            enabled : true,
        },
    });
    response.status(201).send(
        paymentIntent.client_secret
    );
    }
    catch(e){
     return response.status(400).send({error : {message:e.message,},})
    }
}
);


//listen command
exports.api= functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// go to functions and run firebase emulators:start

*/


/* 
Payment.js file



import React, { useEffect } from 'react'
import './Payment.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import CheckoutProduct from './CheckoutProduct';

import {getBasketTotal} from './reducer';
import { Link,useNavigate} from "react-router-dom";
import axios from './Axios';
function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const navigate = useNavigate();
    const [processing,setProcessing]=useState('');
    const [succeeded,setSucceeded]=useState(false);
    const [clientSecret,setClientSecret]=useState("");
    const stripe=useStripe();
    const elements=useElements();
    useEffect (()=> { //generate the special stripe secret which allows us to change a customer 
    const getClientSecret= async () => {
        const response= await axios({
            method:'post',
            url: '/payments/create?total=${ getBasketTotal(basket) *100 }' // stripe expects the total in a currencies subunits
        }) ;// fetching library allows us to deal with API's
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
    },[basket])
    console.log("the secret is",clientSecret);
const handleSubmit= async (event)=>{
     // fancy stripe stuff
     event.preventDefault();
      setProcessing(true);
      const payload= await stripe.confirmCardPayment(clientSecret,{payment_method:{ //
        card : elements.getElement(CardElement)
      }}).then(({paymentintent})=>{//paymentintent = payment confirmation
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    navigate("/orders", { replace: true })
})
    }
const handleChange= event=>{
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error?event.error.message : '');
    }
  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout (<Link to ='/checkout'>{basket?.length} items</Link>)</h1>
            // delivery address
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Country India</p>
                </div>
            </div>
             //review item
             <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items and delivery</h3>
                </div>
                <div className='payment__items'>
                    {
                    basket.map(item =>(
                     <CheckoutProduct id={item.id} image={item.image} title={item.title} price={item.price} rating={item.rating}/>
                    ))

                    }
                </div>
                
            </div>
              // payment method
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {
                    //stripe magic 
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                        <CurrencyFormat renderText={(value)=>(<>
                           <h3>Order Total : {value}</h3>
                        </>)}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType='text'
                        thousandSeparator={true}
                        prefix='$'/>
                        <button disabled={processing || disabled || succeeded}>
                        <span>{processing? <p>Processing</p>:"Buy Now" }</span></button>
                        </div>
                      
                      {error && <div>{error}</div>}
                    </form>

                   
                </div>     

            
            </div>
        </div>
        
    </div>
  )
}

export default Payment; */