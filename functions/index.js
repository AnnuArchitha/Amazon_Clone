/**
/* * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const express=require("express");
const cors=require("cors");
const stripe=require("stripe")
('sk_test_51NCdoFSAyIh6qE6BREdGhauDF8FfD75DtmCDz1vaNh6rX7lyS1YWTZhyio4xCPU5RR8viSxVUhAklOvRBWTed9Nz00KCO38rnm')
//app

//app config
const app=express();
//middlewares
app.use(cors({origin:true}));
app.use(express.json());
//api routes
app.get('/',(request,response)=> {response.status(200).send('hello world')});
app.post('/payments/create', async (request,response)=>{
    const total= request.query.total;
    console.log('payment request : received boom',total);
    const paymentIntent= await stripe.paymentIntents.create({
        
        automatic_payment_methods:{
        enabled:'true',
        },
        amount: total,
        currency:'INR',
        description: "payment",
        
    });
    response.status(201).send({
        clientSecret : paymentIntent.client_secret,
    })
});


//listen command
exports.api= functions.https.onRequest(app);
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });






// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
