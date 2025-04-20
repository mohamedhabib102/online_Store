import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../Dahsboard.css"


function AddBrand(){
    const { authToken , linkProxy} = useAuth()
    const [name, setName] = useState("");
    const [dec, setDec] = useState("");
    const navigate = useNavigate()
    async function AddData(e){
        e.preventDefault()
        try{
            let res = await axios.post(`${linkProxy}http://namehost.runasp.net/api/Brand`,
                {
                    name: name,
                    description: dec,
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${authToken}`
                }})
            navigate("/dashboard/brands")
        }catch(error){
            console.log(error)
        }
    }
    return(
        <>
        <div>
            <form
            onSubmit={AddData} 
            className="form"
            >
                <input  
                type="text" 
                placeholder="Name Product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <input  
                type="text" 
                placeholder="Dec Product"
                value={dec}
                onChange={(e) => setDec(e.target.value)}
                />
                <button type="submit" >Add Product</button>
            </form>
        </div>
        </>
    )
}


export default AddBrand;