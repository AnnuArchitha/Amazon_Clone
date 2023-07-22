import React,{useEffect, useState} from 'react'
import './Orders.css'
import Order from './Order';
import { db,auth } from './firebase';
import { useStateValue } from './StateProvider';
import { collection, getDocs} from "firebase/firestore"


function Orders() {
    const [orders,setOrders]= useState([]);
    const [{basket, user}, dispatch] = useStateValue();
    useEffect(()=>{ 
    // import from firestore    
    //import { getFirestore, collection, getDocs} from "firebase/firestore";
    
    
    
    // access the db collection
    if (user){
        console.log('hello');
    const getFirestoreData = async () => {
    const querySnapshot = await getDocs(collection(db,auth.currentUser.uid ));
      querySnapshot.forEach((doc) => {
      setOrders(current=>[...current,{id: doc.id,
                data:doc.data()}])
       console.log(doc.id, " => ", doc.data());

     });
    
    }
    getFirestoreData();
    console.log('orders'+ orders);
    }
    else{
        setOrders([])
    }
     },[user])
    /*if (user){
        const getFirestoreData = async () => {
            const querySnapshot = await getDocs(collection(db, auth.currentUser.uid, auth.currentUser.uid, "favorites"));
            console.log('querysnapshot')
            setOrders(querySnapshot.forEach((doc) => ({
                id: doc.uid,
                data:doc.data()} )));
        }
   
}
    else{
            setOrders([])
        }
    },[user])
    console.log({orders});
    console.log({user});*/
      /* if (user){
        db.collection('users').doc(user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapchot=>
            {
                setOrders(snapchot.docs.map(doc=>({
            id:doc.id,
            data: doc.data()
                })))
            })
        }
        else{
            setOrders([])
        }
    },[user])*/
  return (
    <div className='orders'>
        <h1>Your orders</h1>
        
        <div className='orders__order'>
            {orders?.map((order)=>(<Order order={order}/>))}
        </div>
        </div>
  )
}

export default Orders