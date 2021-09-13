
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { firebaseDB } from "../config/firebase";
import  "./videoCard.css"



let VideoCard = (props) =>{

    let [playing ,setPlaying] =useState(false);
    let [commmentBoxOpen , setCommentBoxOpen] =useState(false);
    let [currentComment ,setCurrentComment]=useState("");
    let [comments ,setComments]=useState([]);

    let {user} =useContext(AuthContext);

     let currUserLiked ;

    if(user){
        currUserLiked =props.data.likes.includes(user.uid);
    }

    useEffect(()=>{

        let f =async ()=>{

            let commentsArr=props.data.comments;
            let arr =[];

            for(let i=0; i<commentsArr.length;i++){
                
                let commentDoc =await firebaseDB
                .collection("comments")
                .doc(commentsArr[i])
                .get();

                arr.push(commentDoc.data());
            }

            setComments(arr);

        };
        f();
    },[props]);





    return( <div className="video-card">

        <p className="video-card-username">{props.data.name}</p>
        
        <span className="video-card-music">
            <span class="material-icons">music_note</span>
            <marquee> some song </marquee>
        </span>

        <span 
        onClick={(e)=>{

            if(commmentBoxOpen){
                setCommentBoxOpen(false);
            }
            else{
                setCommentBoxOpen(true);
            }
        }}
        
        
        className="material-icons-outlined video-card-comment">

            
            
            chat</span>

        <span  className="material-icons-outlined video-card-like"
        
        onClick ={()=>{

            let likesArr =props.data.likes;

            if(currUserLiked){
                likesArr = likesArr.filter((el)=>el!=user.uid);

            }
            else{
                likesArr.push(user.uid);
            }

            firebaseDB.collection("posts")
            .doc(props.data.id)
            .update({likes: likesArr});

        }}
        
        >
     {currUserLiked ? "favorite": " favorite_border" }
            
           </span>


       {commmentBoxOpen ?(
       
       <div className="video-card-comment-box"> 

        <div className="actual-comments">

            {comments.map((el)=>{
              
              return (
                <div className="post-user-comment">
                <img src= {el.photo}/>
               
               <div>
                   <h4>{el.name}</h4>
                   <p>{el.comment}</p>
               </div>

            </div>

              );

            })}


        </div>


        <div className="comment-form">
            <input type="text" 
            value={currentComment}
            onChange={(e)=>{
                setCurrentComment(e.currentTarget.value);
            }}
            
            />
            <button 
            onClick={ async ()=>{
              let docRef =  await firebaseDB.collection("comments").add({
                    name:user.displayName,
                    comment :currentComment,
                    photo:user.photoURL,
                });

                setCurrentComment("");
               let doc =await docRef.get();
               let commentId =doc.id;

               let postDoc =await firebaseDB.collection("posts")
               .doc(props.data.id).get();

               let postCommentsArr =postDoc.data().comments;

               postCommentsArr.push(commentId);

               await firebaseDB.collection("posts")
               .doc(props.data.id).update({
                   comments:postCommentsArr
               })


            }}
            
            >Post</button>
        </div>
       </div>
       ):(
           ""
       )}









        <video  onClick={(e)=>{

            if(playing){
                e.currentTarget.pause();
                setPlaying(false);
            }
            else{
                e.currentTarget.play();
                setPlaying(true);
            }
        }}
        
        loop
       
       src={props.data.url}
        className="video-card-video"
        ></video>

    </div>
    )
};

export default VideoCard;