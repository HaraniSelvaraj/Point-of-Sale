import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './Service.css';
export default function Service() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/Features');
  };

  return (
    <div>
       <h1 style={{textAlign:'center', fontFamily:"roboto",color:'lightcoral'}}>Our Services</h1>
      <div className="main-container">
        <div className="grid-container">
          <div className="grid-item img-cont">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-tiJsF3EirFMuHSBvmrP3B802VAM3sJlLA&s" alt="POS Setup" className='img'/>
          </div>
          <div className="grid-item content-container">
            <h2>Easy Setup</h2>
            <p>
              Get your POS system up and running quickly with our easy-to-follow setup guide and support.
            </p>
          </div>
        </div><div className="grid-container">
          <div className="grid-item img-cont">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShdIacp6QHLe6PbhL-5iuRymZL6sl-QNKfWw&s" alt="POS Security" className='img'/>
          </div>
          <div className="grid-item content-container">
            <h2>Secure Transactions</h2>
            <p>
              Our POS system ensures your transactions are safe and secure, protecting both you and your customers.
            </p>
          </div>
        </div>
      </div>
        
      <div className="main-container" style={{marginTop:'20px',marginBottom:'30px'}}>
        <div className="grid-container" style={{marginBottom:'300px',padding:'30px'}}>
          <div className="grid-item img-cont">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAOOmyaJXFtiYMBmsrSFcIiwyHuxpCUQZAg&s" alt="POS Analytics" className='img'/>
          </div>
          <div className="grid-item content-container">
            <h2>Advanced Analytics</h2>
            <p>
              Use our advanced analytics to track sales, inventory, and customer behavior, helping you make informed business decisions.
            </p>
          </div>
        </div>
      </div>  
      <center><button className="home-button" onClick={handleHomeClick}>
        ← Home
      </button></center>
    </div>
  )
}
