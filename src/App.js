import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { db, auth } from "./firebase";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import { makeStyles } from "@mui/material/styles";
import { Button, Input } from "@mui/material";
import ImageUpload from "./ImageUpload";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: "absolute",
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
// }));

function App() {
  // const slasses = useStyles();
  const [style] = useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    //  username: 'cleverqazi',
    //  caption: 'Hello Spring',
    //  imageUrl: 'https://www.farmersalmanac.com/wp-content/uploads/2022/02/Hello-Spring.png'
    // },
    //  {
    //   username: 'Melly',
    //   caption:  'Kitty',
    //   imageUrl: 'https://kidssearch.com/picsearch/images/kitty-pic-1024x768-64bf964.png'
    //  },
    //  {
    //   username:'bakehouse',
    //   caption: 'Pretty Cake',
    //   imageUrl:'https://hips.hearstapps.com/clv.h-cdn.co/assets/16/08/1456262739-cl-speckled-malted-coconut-cake.jpg'
    //  },
    //  {
    //   username: 'Seattle',
    //   caption: 'Spring in Seattle',
    //   imageUrl: 'https://sph.washington.edu/sites/default/files/inline-images/Seattle-Rainier%201200x600_0.jpg'
    //  }
  ]);
  const [open, setOpen] = useState(false);
  const [openSingIn, setOpenSingIn] = useState(false);
  const [username, setUserName] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // usre has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out..
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  // useEffect(() => {
  //   db.collection("posts")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       setPosts(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           post: doc.data(),
  //         }))
  //       );
  //     });
  // }, []);

  const singUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPssword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.massage));
    setOpen(false);
  };

  const singIn = (event) => {
    event.preventDefault();
    auth
      .singInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSingIn(false);
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className="app_singup">
              <center>
                <img
                  className="app_headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" onClick={singUp}>
                Sing Up
              </Button>
            </form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      <Modal open={openSingIn} onClose={() => setOpenSingIn(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form className="app_singup">
              <center>
                <img
                  className="app_headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>

              <Input
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" onClick={singIn}>
                Sing In
              </Button>
            </form>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      <div className="App">
        <div className="app_header">
          <img
            className="app_headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
          {user ? (
            <Button onClick={() => auth.singOut()}>Logout</Button>
          ) : (
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSingIn(true)}>Sing In</Button>
              <Button onClick={() => setOpen(true)}>Sing Up</Button>
            </div>
          )}
        </div>

        <div className="app_posts">
          <div className="app_postsLeft">
            {posts.map(({ id, post }) => (
              <Post
                key={id}
                postId={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
          <div className="app_postsRight">
            {/* <InstagramEmbed
              url="https://instagr.am/p/Zw9o4/"
              clientAccessToken="123|456"
              maxWidth={320}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            /> */}
          </div>
        </div>

        <h1>Instagram</h1>

        {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ) : (
          <h3>Sorry you need to login to upload</h3>
        )}
        {/* <Post 
      username='cleverqazi' 
      caption= 'Hello Spring' 
      imageUrl='https://www.farmersalmanac.com/wp-content/uploads/2022/02/Hello-Spring.png'/> */}
        {/* <Post 
      username='Melly' 
      caption= 'Kitty' 
      imageUrl='https://kidssearch.com/picsearch/images/kitty-pic-1024x768-64bf964.png'/>
      <Post 
      username='cakehause' 
      caption= 'Pretty Cake' 
      imageUrl='https://hips.hearstapps.com/clv.h-cdn.co/assets/16/08/1456262739-cl-speckled-malted-coconut-cake.jpg'/>
      <Post 
      username='Seattle' 
      caption= 'Spring in Seattle' 
      imageUrl='https://sph.washington.edu/sites/default/files/inline-images/Seattle-Rainier%201200x600_0.jpg'/> */}
      </div>
    </div>
  );
}

export default App;
