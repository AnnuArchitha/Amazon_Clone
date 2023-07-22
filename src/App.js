
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './Login';
import {auth} from './firebase'
import { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { onAuthStateChanged } from 'firebase/auth';
import  Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';
const stripePromise = loadStripe('pk_test_51NCdoFSAyIh6qE6BLUV2ghsmFtd9Vqb4HXmJwKwDdfFDqPQHc2WPCAnaFImxif6HAmjVy1kSIelfBiyHNEft83gL00nsFHWBhF');
function App() {
  const [{},dispatch]=useStateValue();
  useEffect(()=>{
//will only run once when the app component loads...
/*auth.onAuthStateChanged(authUser => 
  {console.log('USER IS',authUser);
  if(authUser){
    //the user just logged in / the user was logged in
    dispatch({
  type:'SET_USER',
  user:authUser
    })
  }
  else{
    //the user is logged out
    dispatch({
      type:'SET_USER',
      user:null
        })
  }
  })*/
  onAuthStateChanged(auth,authUser => 
    {console.log('USER IS',authUser);
    if(authUser){
      //the user just logged in / the user was logged in
      dispatch({
    type:'SET_USER',
    user:authUser
      })
    }
    else{
      //the user is logged out
      dispatch({
        type:'SET_USER',
        user:null
          })
    }
    })

  },[])
  return (
    <Router>
    <div className="App">
    
     <Routes>
      <Route path="/checkout" element={[<Header/>,<Checkout/>]}></Route>
      <Route path="/" element={[<Header/>,< Home/>]}></Route>
      <Route path="/orders" element={[<Header/>,<Orders/>]}></Route>
      <Route path="/login" element={[<Login/>]}></Route>
      <Route path="/payment" element={[<Header/>,<Elements stripe={stripePromise}><Payment/></Elements>]} ></Route>


      </Routes>
    </div>
    </Router>
  );
}

export default App;
