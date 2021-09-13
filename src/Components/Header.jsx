import React from 'react';
import {Link} from "react-router-dom"
import logo from "./logo.png";

const Header = () => {
    return ( 
    
        <div style={{width:"100vw",margin:"0%",boxSizing:"border-box"}}>

        <div style={{boxShadow:" rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",width:"100vw",marginLeft:"-10px",height:"60px",marginTop:"-5px"}}>

            <Link to="/"><img src={logo} height="60px" style={{marginLeft:"50px",alignItems:"center"}}></img></Link>
        </div>
        </div>
    
        );
}
 
export default Header;