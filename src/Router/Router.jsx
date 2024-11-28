import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Landing from '../Page/Landing/Landing';
import Auth from '../Page/Auth/auth';
import Payment from '../Page/Payment/Payment';
import Orders from '../Page/Orders/Orders';
import Cart from '../Page/Cart/Cart';
import Results from  "../Page/Results/Results"
import ProductDetail from '../Page/ProductDetail/ProductDetail';
const Router = () => {
    return (
 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path='/category/:categoryName' element={<Results/>}/>
                <Route path='/products/:productID' element={<ProductDetail/>}/>

            </Routes>

         </BrowserRouter>

   

);

}

export default Router;
               


            

            


        
            
        
   



