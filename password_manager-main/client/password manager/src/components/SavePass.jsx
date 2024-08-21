import { useState } from 'react'
import Axios from "axios"



export default function SavePass(){
    const [password,setPass] = useState("")
    const [title,setTitle] = useState("")
    const [loading , setloading] = useState(false)              //professional method
  
   async function savePassword(event){
        event.preventDefault()
        setloading(true)
        await Axios.post('http://localhost:3001/addpassword',
        {password: password, title: title})
        alert("successfully saved")
        setloading(false)
        setPass("")
        setTitle("")
    }

return (
    <>
    <div className='setter'>
        <form className='settercont' onSubmit={savePassword}>
            <input
            type="password"
            placeholder='ex. Mypasscode789'
            onChange={(event)=>setPass(event.target.value)}
            value={password}
            />
            <input 
            type="text" 
            placeholder='ex. twitter' 
            onChange={(event)=>setTitle(event.target.value)}
            value={title}
            />
            <button type="submit" disabled={loading}>{loading?"loading...":"Save Password"}</button>

        </form>
    </div>
    </>
)}
