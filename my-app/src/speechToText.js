import React,{ useState }  from 'react'
import axios from 'axios';

function SpeechToText() {
    const [texts,getText]=useState("");
    const getDetail=(e)=>{
        const newText=e.target.value;
        getText(newText);

    }
    const postData=async (e)=>{
        e.preventDefault();
        const letText={
          texts:texts
        }
         try{
            const config={
                headers:{
                    'Content-Type':'application/json'
                }
            }

            const body=JSON.stringify(letText);
            const res=await axios.post('/server',body,config);
            console.log(res.data);
         }catch(err){
           console.error(err.response.data);
          
         }
           
    }
  
    return (
        <div className="header">
            <div className="textArea">
            <form method="POST"><h3>Speech-Text</h3>
             <input onChange={getDetail}></input>
             <button type="submit" onClick={postData}>Submit</button></form>
            
            </div>
        </div>
    )
}

export default SpeechToText
       