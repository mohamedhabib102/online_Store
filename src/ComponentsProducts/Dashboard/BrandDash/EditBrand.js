import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../Dahsboard.css";


function EditBrand(){
    const { authToken, linkProxy } = useAuth()
    const navigate = useNavigate()
    let  { Id } = useParams();
    const [edit, setEdit] = useState({name: "", description: ""})
    useEffect(() => {
        axios.get(`${linkProxy}http://namehost.runasp.net/api/Brand/${Id}`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((data) => setEdit(data.data))
        .catch((err) => console.log(err))
    }, [])
    async function SendData(e){
        e.preventDefault()
        try{
            let res = await axios.put(`${linkProxy}http://namehost.runasp.net/api/Brand/${Id}`,
                edit,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                }})
            navigate("/dashboard/brands")
        }catch(error){
            console.log(error)
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setEdit(prevState => ({...prevState, [name]: value}))
    }
    return(
        <>
        <div>
            <form
            onSubmit={SendData} 
            className="form"
            >
                <input  
                type="text" 
                placeholder="Name Product"
                value={edit.name}
                onChange={handleChange}
                name="name"
                />
                <input  
                type="text" 
                placeholder="Dec Product"
                value={edit.description}
                onChange={handleChange}
                name="description"
                />
                <button type="submit" >Update Product</button>
            </form>
        </div>
        </>
    )
}


export default EditBrand;