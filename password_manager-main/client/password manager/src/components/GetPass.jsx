import React,{useEffect, useState} from "react";
import Axios  from "axios"
export default function getPass(){
    const [pass,setPass] = useState("")
    const [decPass,setDec] = useState("")

    //this is kind of an API call which happens only once when the page is rendered to get all the data present in the database
    //however we wont be using this as we only want 1 data at a time 
    useEffect(()=>{
        Axios.get('http://localhost:3001/showpassword').then((response)=>{
            // console.log(response.data)
        })
    },[])


    //here I want to implement a post function which will send the title of the 
    //source and then give you the result that maps to it
    function handleClick(){
        
        Axios.post('http://localhost:3001/revealpassword',{title:pass}).then((response)=>{setDec(response.data)

        })
    }
    return (
        <><div className="setter">
            <div className="settercont">
                <input type="text" placeholder="ex.Twitter" onChange={(event)=>{setPass(event.target.value)}}/>
                <button onClick={handleClick}>
                    Reveal Password
                </button>
            </div>
            </div>
            <h3>{decPass}</h3>
        </>
    )
}