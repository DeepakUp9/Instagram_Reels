// import React, { useContext, useState } from "react";
// import { firebaseDB, firebaseStorage } from "../config/firebase";
// import { AuthContext } from "../context/AuthProvider";

// const Signup = (props) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const { signUp } = useContext(AuthContext);
  


//   const handleFileSubmit = (event) => {
//     let fileObject = event.target.files[0];
//     setProfileImage(fileObject);
//   };

//   const handleSignUp = async () => {
//     try {
//       let response = await signUp(email, password);
//       let uid = response.user.uid;
//       //   you are signed up
//       const uploadPhotoObject = firebaseStorage
//         .ref(`/profilePhotos/${uid}/image.jpg`)
//         .put(profileImage);
//       //   console.log(uploadPhotoObject);
//       uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
//       // to track the progress of the upload
//       function fun1(snapshot) {
//         // bytes transferred
//         // totoal bytes
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(progress);
//       }
//       // if indicates a error !!
//       function fun2(error) {
//         console.log(error);
//       }
//       // it indicates success of the upload !!
//       async function fun3() {
//         let profileImageUrl =
//           await uploadPhotoObject.snapshot.ref.getDownloadURL();
//         // db me collection => document => {username , email , profileImageUrl};
//         firebaseDB.collection("users").doc(uid).set({
//           email: email,
//           userId: uid,
//           username: username,
//           profileImageUrl: profileImageUrl,
//           postsCreated:[]
//         });
//         props.history.push("/login");
//       }
//     } catch (err) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <>
//       <h1>Signup Page</h1>
//       <div>
//         <div>
//           Username
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           Email
//           <input
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           Password
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//         </div>
//         <div>
//           Profile Image
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               handleFileSubmit(e);
//             }}
//           ></input>
//         </div>
//       </div>
//       <button onClick={handleSignUp}>SignUp</button>
//       <h2 style={{ color: "red" }}>{message}</h2>{" "}
//     </>
//   );

 
// };

// export default Signup;
















import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
import logo from "./logo.png"
import { Link } from "react-router-dom";
// import BackupIcon from '@material-ui/icons/Backup';
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

const Signup = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [message, setMessage] = useState("");
    const { signUp } = useContext(AuthContext);


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

    const handleFileSubmit = (event) => {
        let fileObject = event.target.files[0];
        setProfileImage(fileObject);
    };

    const handleSignUp = async () => {
        try {
            let response = await signUp(email, password);
            let uid = response.user.uid;
            //   you are signed up
            const uploadPhotoObject = firebaseStorage
                .ref(`/profilePhotos/${uid}/image.jpg`)
                .put(profileImage);
            //   console.log(uploadPhotoObject);
            uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
            // to track the progress of the upload
            function fun1(snapshot) {
                // bytes transferred
                // totoal bytes
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }
            // if indicates a error !!
            function fun2(error) {
                console.log(error);
            }
            // it indicates success of the upload !!
            async function fun3() {
                let profileImageUrl =
                    await uploadPhotoObject.snapshot.ref.getDownloadURL();
                // db me collection => document => {username , email , profileImageUrl};
                firebaseDB.collection("users").doc(uid).set({
                    email: email,
                    userId: uid,
                    username: username,
                    profileImageUrl: profileImageUrl,
                    postsCreated: []
                });
                props.history.push("/login");
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <>
            <Container style={{ marginTop: "20px" }} >
                <Grid container justify="center">

                    <div>
                        <Grid item sm={12} style={{ width: "200px" }}>
                            <Card variant="outlined" className={classes.mb} style={{ width: "340px", height: "500px" }}>

                                <CardMedia
                                    image={logo}
                                    style={{ height: "5rem", backgroundSize: "contain" }}
                                ></CardMedia>

                                <Typography style={{ textAlign: "center", color: "grey" }}>
                                    Sign up to see photos and videos<br></br> from your friends.
                                </Typography>

                                <CardContent className={classes.centerElements} >


                                    <TextField
                                        label="username"
                                        type="username"

                                        variant="outlined"

                                        style={{ width: "300px", marginLeft: "5px" }}
                                        size="small"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    ></TextField>



                                    <TextField
                                        label="email"
                                        type="email"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "300px", marginTop: "5px", marginLeft: "5px" }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></TextField>



                                    <TextField
                                        label="password"
                                        type="password"
                                        style={{ width: "300px", marginTop: "5px", marginLeft: "5px" }}
                                        variant="outlined"
                                        size="small"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></TextField>
                                    <CardActions>
                                        <Button style={{ width: "315px", border: "2px solid red", marginLeft: "5px" }}
                                            component="label">
                                                {/* <BackupIcon style={{marginLeft:"-10px"}}> */}
                                            
                                            {/* </BackupIcon> */}
                                            <Typography style={{marginLeft:"5px"}}>
                                            Upload File
                                            </Typography>
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) => {
                                                    handleFileSubmit(e);
                                                }}
                                            ></input>
                                        </Button>
                                    </CardActions>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"

                                        color="primary"
                                        onClick={handleSignUp}
                                        className={classes.fullWidth}
                                    >
                                        SignUp
                                    </Button>
                                </CardActions>

                                <Typography style={{ textAlign: "center", color: "grey", marginTop: "18px" }}>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</Typography>
                                {/* <button onClick={handleSignUp}>SignUp</button> */}
                            </Card>
                            <Card variant="outlined" className={classes.padding} style={{ width: "340px" }}>
                                <Typography style={{ textAlign: "center" }}>
                                    Have an account?
                                    <Button variant="contained" color="primary">
                                        <Link style={{ color: "white" }} to="/login">
                                            Login
                                        </Link>
                                    </Button>
                                </Typography>
                            </Card>
                        </Grid>

                    </div>
                </Grid>
            </Container>

            <h2 style={{ color: "red" }}>{message}</h2>{" "}
        </>
    );
};

export default Signup;