import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Login.css"
import photo   from "./app-feautures.png";



import {
  TextField,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Container,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  let { login,loginWithGoogle,user } = useContext(AuthContext);
  
    
    
  const handleLogin = async (e) => {
    //   email , password
    try {
      await login(email, password);
      props.history.push("/"); //navigate to /
    } catch (err) {
      setMessage(err.message);
      setEmail("");
      setPassword("");
    }
  };


  const loginwithGooglesignIn = async (e)=>{
      try{
         await loginWithGoogle();
       
        props.history.push("/");
      }
      catch(err){
       console.log(err);

      }


  }






  let useStyles = makeStyles({
    centerDivs: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      width: "100vw",
    },
    carousal: { height: "10rem", backgroundColor: "lightgray" },
    fullWidth: {
      width: "100%",
    },
    centerElements: {
      display: "flex",
      flexDirection: "column",
    },
    mb: {
      marginBottom: "1rem",
    },
    padding: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
    },
    alignCenter: {
      justifyContent: "center",
    },
  });
  let classes = useStyles();

  return (
    <div>


      <Container>
        <Grid container spacing={2} style={{justifyContent:"space-around"}}>
          {/* Carousel */}
          <Grid item sm={5}>
           
<div class="col-md-6 ">
					<img src={photo} alt="[+]" />
				</div>
          </Grid>
          <Grid item sm={3}>
            <Card variant="outlined" className={classes.mb} style={{width:"400px",height:"350px",marginLeft:"-60px",marginTop:"10px"}}>
              <CardMedia
                image={logo}
                style={{ height: "5rem", backgroundSize: "contain" }}
              ></CardMedia>
              <CardContent className={classes.centerElements}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className = {classes.mb}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  className = {classes.mb}
                ></TextField>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  className={classes.fullWidth}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
            <Card variant="outlined" className={classes.padding} style={{width:"400px",marginLeft:"-60px"}}>
              <Typography style={{ textAlign: "center" }}>
                Don't have an account ?
                <Button variant="contained" color="primary">
                  <Link style={{ color: "white" }} to="/signup">
                    SignUp
                  </Link>
                </Button>
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
       <h2 style={{ color: "red" }}>{message}</h2>{" "} 

{/* 
    <button  onClick={ loginwithGooglesignIn}

    
class="btn-text">Login With google </button> */}


<div class="google-btn btn-google">
  <div class="google-icon-wrapper">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p class="btn-text">
    <button class="btn-logo"  onClick={ loginwithGooglesignIn}

    
><b>Login With google </b></button>
</p>
</div>






      {/* <h1>Login Page</h1>
      <div>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        Password
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button onClick={handleLogin}>Login</button>
      <h2 style={{ color: "red" }}>{message}</h2>{" "} */}
    </div>
  );
};

export default Login;
