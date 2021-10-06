import React,{useState} from 'react';
 function Demo(){
    const[value, setValue]=useState("");
    const[result, setResult]=useState([]);
   function res(){
       console.log(result);
       setResult([...result,value])
       setValue('')
}
function handleDelete(id){
    setResult(result.filter((arr,index)=>{
        return index !== id;
    }))
}   
    return(
        <div>
            <input type="text" value={value} name="textfield" placeholder="input here"
            onChange={(a)=>{setValue(a.target.value)}}/>
            <input type="button" value="result"
            onClick={()=>{res()}}/>
            <div>{
            result.map((re,index)=>(
                <div key={index}>
                <p>{re} </p>
                <p onClick={()=>handleDelete(index)}>delete</p>
                </div>            
            ))
            }</div>
        </div>
    )
}
export default  Demo;
