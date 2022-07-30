import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import FlatList from './components/FlatList';
import { useState,useEffect } from 'react';
import apiClient from './http-common'
import {BrowserRouter, Routes ,Route ,  Link ,useNavigate } from 'react-router-dom'
import EditFlatForm from './components/EditFlatForm';
import AddFlatForm from './components/AddFlatForm';

function App() {
  
const [flats,setFlats]=useState([]);

    //when App component gets loaded , a call to api will render the products list as a response
    //which we are setting to the products
    useEffect(()=>{apiClient.get('/admin_user/viewAllFlat').then((response)=>{
      setFlats(response.data);
    })},[])
    const [editing,setEditing]=useState(false);

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
  



const [currentFlat,setCurrentFlat] 
     =useState(initialFormState);

   //child component --AddProductForm child -App is parent ,product object in the form of input fields form 
   //brand price name on submission  
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
      ({flatId:flat.flatId,cost:flat.cost,availability:flat.availability});
     
  }
  
  const updateFlat = (flatId,updatedFlat)=>{
  
    setEditing(false);
    apiClient.put(`/admin/updateFlat/${flatId}`,updatedFlat).then((response)=>
    {
  
      console.log('flat updated');
      setFlats(flats.map((flat)=>
    (flat.flatId === flatId ? updatedFlat : flatId)));

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

