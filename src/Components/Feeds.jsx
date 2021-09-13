
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {firebaseAuth, firebaseStorage, firebaseDB} from "../config/firebase";

import VideoCard from "./videoCard"


import { AuthContext } from '../context/AuthProvider';


import "./home.css"



const Feeds = () => {

    let{ user} = useContext(AuthContext);
    let [posts,setPosts] =useState([]);

    console.log(user,"user");

    useEffect(()=>{
        
       let unsub = firebaseDB.collection("posts").onSnapshot((querySnapshot)=>{

            let docArr=querySnapshot.docs;

            let arr=[];

            for(let i=0; i<docArr.length;i++){
                arr.push({
                    id: docArr[i].id,
                    ...docArr[i].data(),
                });
            }

            setPosts(arr);
        });

        return ()=>{
            unsub();
        }


    },[]);


  
    return (
       
        <>




    <div className="video-container">
       
       {posts.map((el)=>{

           return  <VideoCard  key={el.id} data={el} />;
       })}
        

    </div>


    <button  className="home-logout-btn"
    
    onClick={()=>{

        firebaseAuth.signOut()

   }}>LogOut</button>











   <input type="file"   id="filePicker" style={{visibility:"hidden"}}
   
   
   onClick={(e)=>{
    e.currentTarget.value=null
}}
    

    onChange={(e)=>{

        let videoObj=e.currentTarget.files[0];

        let {displayName,size,type}=videoObj;

        size=size/1000000

        if(size>60){
            alert("file size exceeds more 10mb");
            return;
        }

        type=type.split("/")[0];

        if(type!=="video"){
            alert("please upload only video files");
            return;
        }

       let uploadTask =firebaseStorage.ref(`posts/${user.uid}/${Date.now() + "-"+ displayName }`).put(videoObj);

       function fun1(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        <>
              <div>{progress}</div>
            <progress value={progress} max="100"  style={{background : "red"}}>10%</progress>
        </>
       
        console.log(progress);
      }
       uploadTask.on("state_changed" ,fun1, null,()=>{

        
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url);


            firebaseDB.collection("posts")
            .add({ name : user.displayName ,url,likes:[],comments:[]});



        });

       })


}}
   
   
        />

         


    
          <label  class="input-file-label"  htmlFor="filePicker" >

{<PhotoCamera style={{marginTop:"3px"} }></PhotoCamera>}
<strong style={{marginTop:"4px"}} >UPLOAD</strong> 
</label>



    </>
   
   );
}
 
export default Feeds;