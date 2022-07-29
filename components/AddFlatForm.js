import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { addFlat } from '../actions/flats';
export default function AddFlatForm(props){
   const dispatch=useDispatch();

    const initialFormState = {
       flatId:0,
         availability: '',
            cost: 0,
            flatAddress: {
            flatAddress_id:0,
              city: '',
              country: '',
               pin: 0,
              state: '',
              street: ''
              }
           }
     const initialFlatAddressFormState={
        street:'',
        pin:0,
        city:'',
        state:'',
        country:''
    } 

   const[flatAddress, setFlatAddress] = useState(initialFlatAddressFormState);
    
    const  handleFlatAddressChange=(event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
   
        setFlatAddress({...flatAddress,
          [name]: value
        });
      } 

    const[flat, setFlat] = useState(initialFormState);
    
   const  handleInputChange=(event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
   
        setFlat({...flat,
          [name]: value
        });
      }
         useEffect(()=>{
            setFlat({...flat,flatAddress})},[flatAddress])
   

    const submitHandler=(event)=>{event.preventDefault();
   /*  if(!flat.cost || !flat.availability || !flat.flatAddress.street || !flat.flatAddress.city 
        || !flat.flatAddress.pin
        || !flat.flatAddress.state || !flat.flatAddress.country ) return;  */
        

    console.log(JSON.stringify(flat)+" from addflatform")

    props.addFlat(flat);
    //dispatch(addFlat(flat));
    setFlat(initialFormState);
    }
    return(

        <form onSubmit={submitHandler} className="flat">

             {/* <label>FlatId</label><br/>
             <input 
            type='number'
            name='flatId'
            value={flat.flatId}
            onChange={handleInputChange}/>
            <br/> */}

            <label>Cost</label><br/>
            <input 
             type='number'
             name='cost'
             value={flat.cost}
             onChange={handleInputChange}/>

            <br/>
            <label>Availability</label><br/>
            <input 
             type='checkbox'
             name='availability'
             value={flat.availability}
             onChange={handleInputChange}/>
           
            <br/>
        {/* <label>FlatAddress_Id</label><br/>
            <input 
             type='number'
             name='flataddress_id'
             value={flat.flatAddress.flatAddress_id}
             onChange={handleFlatAddressChange}/>
           
            <br/> */}
            <label>Street</label><br/>
            <input 
             type='text'
             name='street'
             value={flat.flatAddress.street}
             onChange={handleFlatAddressChange}/>
           
            <br/>
            <label>City</label><br/>
            <input 
             type='text'
             name='city'
             value={flat.flatAddress.city}
             onChange={handleFlatAddressChange}/>
           
            <br/>
            <label>Pin</label><br/>
            <input 
             type='number'
             name='pin'
             value={flat.flatAddress.pin}
             onChange={handleFlatAddressChange}/>
           
            <br/>
            <label>State</label><br/>
            <input 
             type='text'
             name='state'
             value={flat.flatAddress.state}
             onChange={handleFlatAddressChange}/>
           
            <br/>
            <label>Country</label><br/>
            <input 
             type='text'
             name='country'
             value={flat.flatAddress.country}
             onChange={handleFlatAddressChange}/>
           
            <br/>
            
           <input type='submit' value='Add New Flat'/>
        </form>

    )
}