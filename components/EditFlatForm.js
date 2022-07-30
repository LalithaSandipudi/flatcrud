import React , {useContext, useEffect, useState} from 'react'

export default function EditFlatForm(props){
    


    const [flat, setFlat ] = useState(props.currentFlat)
    
    console.log(JSON.stringify(flat)+" from editflatform")
      const handleInputChange = (event)=>{
         const {name,value} =event.target;
          setFlat({...flat,[name]:value});
  
       }
       console.log(JSON.stringify(flat)+" from handleupdate flatform")
     const submitHandler=(event)=>{event.preventDefault();
  
         props.updateFlat(flat.flatId,flat);
  
      }
      console.log(JSON.stringify(flat)+" from submitupdate flatform")
        return(

            <form onSubmit={submitHandler}>

            <label>FlatId</label>
            <h1>{props.currentFlat.flatId}</h1>
            <label>Cost</label>
            <input 
            type='number'
            name='cost'
            value={flat.cost}
            onChange={handleInputChange}/>

            <label>Availability</label>
            <input 
            type='string'
            name='availability'
            value={flat.availability}
            onChange={handleInputChange}/> 
            
           
            <button>Update Flat</button>
            <button onClick={()=>props.setEditing(false)}
            className="button muted-button">Cancel</button>
        </form>
        )
}