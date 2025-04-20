import Navbar from "../Navbar/Navbar"
import Product from "../Products/Product";
import landing from "../images/landing.jpeg"
import "./Home.css";


function Home(){
    return(
        <>
        <Navbar />
        <div className="landing">
            <div className="container">
                <div className="row content-home">
                    <div className="title col-lg-8 col-md-6 col-12">
                        <h2><span>Welcome</span> To <span>Our</span> Egypt Laptops</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quam, eligendi natus, asperiores atque ad ex saepe modi qui laborum accusantium optio vel voluptatibus sunt! Dolor ut nobis nostrum maxime?</p>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12">
                        <img src={landing} alt="image" title="landing"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;