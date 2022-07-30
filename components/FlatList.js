import React ,{useState,useEffect}from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'

import {retrieveFlats,}from '../actions/flats'
export default function FlatList(props){
  //we have dispatched the actioncreator retrieveProducts
  //in the component loading time once only
    const dispatch=useDispatch();
    
    
    const [currentFlat,setCurrentFlat]=useState({});
    const [currentIndex,setCurrentIndex]=useState(-1);
    //this products array will hold the state of products 
    const flats = useSelector((state)=>state.flats);
     

    useEffect(()=>{
        dispatch(retrieveFlats());
      },[]);

    
    const refreshData=()=>{
        setCurrentFlat(null);
        setCurrentIndex(-1);
    }
 

    const setActiveFlat = (flat,index)=>{
        setCurrentFlat(flat);
        setCurrentIndex(index);

    }

    //any other method
    //for sorting
    //for searching 


return(
<table>
    <thead>
        <tr>
            <th>FlatId</th>
            <th>Cost</th>
            <th>Availability</th>
            <th>FlatAddress_Id</th>
            <th>Street</th>
            <th>Pin</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
{/*  {props?.productData?.length >0 ?(
        props.productData.map((product)=>(
   */}
{flats?.length > 0 ? (
    flats.map((flat)=>(
    <tr key={flat.flatId}>
        <td>{flat.flatId}</td>
        <td>{flat.cost}</td>
        <td>{flat.availability}</td>
        <td>{flat.flatAddress?.flatAddress_id}</td>
        <td>{flat.flatAddress?.street}</td>
        <td>{flat.flatAddress?.pin}</td>
        <td>{flat.flatAddress?.city}</td>
        <td>{flat.flatAddress?.state}</td>
        <td>{flat.flatAddress?.country}</td>
        <td><button 
         onClick={()=>{props.editFlat(flat)}}
        className="button muted-button">Edit</button></td>
        <td><button 
        onClick={()=>props.deleteFlat(flat.flatId)}
        className="button muted-button">Delete</button></td>
        
     </tr>))):(
        <tr>
            <td colSpan={8}>No flats</td>
        </tr>
     )}

    </tbody>
</table>




)




}