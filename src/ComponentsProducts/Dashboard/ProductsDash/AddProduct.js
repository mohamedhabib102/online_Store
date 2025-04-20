import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function AddProduct(){
    const { authToken } = useAuth()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [des, setDes] = useState("");
    const [image, setimage] = useState("");
    const [brand, setBrand] = useState(0);
    const [ides, setIdes] = useState([]);
    const navigate = useNavigate()
    
    
    useEffect (() => {
        axios.get("http://namehost.runasp.net/api/Brand",{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }})
            .then((res) => setIdes(res.data)) 
            .catch((err) => console.log(err))
    }, [])

    async function AddData(e){
        e.preventDefault()
        try{
            let res = await axios.post("http://namehost.runasp.net/api/Product",
                {
                    name: name,
                    description: des,
                    price: price,
                    photoName: image,
                    brandId: brand
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": 'application/json'
                }})
                navigate("/dashboard/products")
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
                value={des}
                onChange={(e) => setDes(e.target.value)}
                />
                <input  
                type="number" 
                placeholder="Price Product"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <input  
                type="text" 
                placeholder="Name Image Product"
                value={image}
                onChange={(e) => setimage(e.target.value)}
                />
                    <select 
                        value={brand} 
                        onChange={(e) => setBrand(e.target.value)}>
                        {ides.map((idd) => (
                            <option key={idd.id} value={idd.id}>
                                {idd.id}
                            </option>
                        ))}
                    </select>

                <button type="submit" >Add Product</button>
            </form>
        </div>
        </>
    )
}


export default AddProduct;