import React, { useEffect, useState } from 'react'
import './Post.css'
import {db} from './firebase'
import Avatar from '@mui/material/Avatar'

function Post({ postId, username, caption, imageUrl}) {
  const [comments, setCommments] = useState([])


  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .onSnapshot((snapshop) => {
        setCommments(snapshop.docs.map((doc) => doc.data()))
      })
    }
    return () => {
      unsubscribe()
    }
  }, [postId])


  return (
    <div className='post'>
        <div className="post_header">
        <Avatar 
        className='post_avatar'
        alt='Asiya'
        src=''/>
        <h3>{username}</h3>
        </div>
        
        {/* header -> avatar -> username */}
        <img className="post_image" 
        src={imageUrl} alt="" />

        {/* image */}
        <h4 className='post_text'><strong>{username}</strong> {caption}</h4>
        {/* username + caption */}

        from c
    </div>
  )
}

export default Post