import axios from "axios";
import Navbar from "../Navbar/Navbar"
import { useEffect, useState} from "react";
import "./Brand.css"




function GetBrand(){
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        axios.get("http://namehost.runasp.net/api/Brand")
        .then((res) => setBrand(res.data))
    }, [])
    return(
    <>
    <Navbar />
        <div className="brands">
            <div className="container">
                <div className="brands-content">
                    {
                        brand.map((brand) => (
                            <div className="brand" 
                            key={brand.id}
                            >
                                {
                                <>
                                    <h2>{brand.name}</h2>
                                    <p>{brand.description}</p>
                                </>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
    )
}

export default GetBrand;