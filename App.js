import logo from './logo.svg';
import React, { useEffect,useState } from 'react';
import AddFlatForm from './components/AddFlatForm';
import FlatList from './components/FlatList';
import EditFlatForm from './components/EditFlatForm';
import apiClient from './http-common';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes ,Route ,  Link ,useNavigate } from 'react-router-dom'

function App() {

  const [flats, setFlats] = useState([]);

  useEffect(()=>{apiClient.get('/admin_user/viewAllFlat').
  then((response)=>{setFlats(response.data)})},[])

  const[editing,setEditing]=useState(false);

  /* const flatData = [
    {flatId:1, cost:1000, availability:'available'},
    {flatId:2, cost:3000, availability:'available'},
    {flatId:3, cost:7000, availability:'available'},
    {flatId:4, cost:10000, availability:'available'},
  ]  */

  
    
  const initialFormState = {
    availability: '',
    cost: 0,
    flatAddress: {
      city: '',
      country: '',
       pin: 0,
      state: '',
      street: ''
      }
   }
const[currentFlat,setCurrentFlat]=useState(initialFormState);
  
async function addFlat(flat){
  try{
  const response=await apiClient.post('/admin/addFlat',flat);
    setFlats([...flats,response.data]);
    console.log(flats);
    
  }catch(err){
    console.log(err)
  }
  
}



async function deleteFlat(flatId){
  await apiClient.delete(`/admin/deleteFlat/${flatId}`);
    setFlats(flats.filter((flat)=>flat.flatId !== flatId));
  }
  
  const editFlat=(flat)=>{

    setEditing(true);
      setCurrentFlat
      ({cost:flat.cost/* availability:flat.availability,street:flat.flatAddress.street,
        pin:flat.flatAddress.pin,
        city:flat.flatAddress.city,state:flat.flatAddress.state,country:flat.flatAddress.country */})
     
  }
  
  const updateFlat = (flatId,updatedFlat)=>{
    setEditing(false);
    console.log('flat updated');
    apiClient.put(`/admin/updateFlat/${flatId}`,updatedFlat).then((response)=>
    {
      console.log('flat updated');
      setFlats(flats.map((flat)=>
    (flat.flatId === flatId ? updatedFlat : flat)));
    })
   
  }
  return (<div>
    <div className='container'>
    <h1>Flat Crud app with hooks</h1>
    <div className='flex-row'>
      <div className='flex-large'>
        {editing ? (
        <div>
          <h2>Edit Flat Form </h2>
          <EditFlatForm
           setEditing={setEditing}
           currentFlat={currentFlat}
           updateFlat={updateFlat}
           />
           </div>):(

    <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/flats" className="navbar-brand">
          React App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/flats"} className="nav-link">
            Flats
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addFlat"} className="nav-link">
              Add Flat
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
        <Route path='/' element={<FlatList 
    flatData={flats} 
         editFlat={editFlat}
         deleteFlat={deleteFlat} />} ></Route>
          <Route exact path="addFlat" element={<AddFlatForm addFlat={addFlat}/>} />
         
         <Route path='/flats' element={<FlatList 
    flatData={flats} 
         editFlat={editFlat}
         deleteFlat={deleteFlat} />}>

         </Route>
         <Route path="/flats/:flatId" element={<EditFlatForm /> }></Route>
        </Routes>
      </div>
    
    </BrowserRouter>
    )}</div></div></div></div>
)}
export default App;
  
  