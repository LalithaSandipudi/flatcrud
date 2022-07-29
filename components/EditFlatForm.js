import React , {useContext, useEffect, useState} from 'react'

export default function EditFlatForm(props){
    

    const[flat, setFlat ] = useState(props.currentFlat)

    const  handleInputChange=(event) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
   
        setFlat({...flat,
          [name]: value
        });
      }

 const submitHandler=(event)=>{event.preventDefault();
            props.updateFlat(flat.flatId, flat);
        }

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
            type='checkbox'
            name='availability'
            value={flat.availability}
            onChange={handleInputChange}/> 
            
           
            <button>Update Flat</button>
            <button onClick={()=>props.setEditing(false)}
            className="button muted-button">Cancel</button>
        </form>
        )
}