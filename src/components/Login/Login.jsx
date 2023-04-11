import { Form, Button } from 'react-bootstrap';
import { SiGmail, SiFacebook } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, getUser } from 'store/slices/user-slice';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state=>state.user)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        dispatch(getUser({
        id:user.uid,
        email:user.email,
        name:user.displayName,
        token:user.accessToken,
        }))
        console.log(user)
        navigate('/home');
      })
      .catch(error => {
        alert("ERROR")
        console.log(error)
      });
  };

  // const getAllAuthorizatedUsers = () =>{

  // }
  
  const handleGoogleAuthClick = () =>{
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // Signed in
      const user = result.user;
      console.log(user);
      const currentUser = auth.currentUser;
      const isUser = dispatch(fetchUser(currentUser.uid));
      console.log('user from DB', isUser)
      dispatch(getUser({
        id:currentUser.uid,
        email:currentUser.email,
        name:currentUser.displayName,
      }))
      navigate('/home');
    })
    .catch((error) => {
      console.log(error);
    });
   
  }

  console.log(user);
  return (
    <div className="container-fluid h-100 w-100 position-fixed top-0 left-0">
      

      <div className="d-flex justify-content-center align-items-center h-100">
        <Form className="border p-3 mb-5 bg-white rounded" onSubmit={(e)=>handleSubmit(e)}>
          <div className="d-flex justify-content-center">
            <p className="h2">Login</p>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Group className="d-flex justify-content-between">
              <Button onClick={handleGoogleAuthClick} className="px-5 justify-content-center align-items-center">
                <SiGmail />
              </Button>
              <Button className="px-5 justify-content-center align-items-center">
                <SiFacebook />
              </Button>
            </Form.Group>
          </Form.Group>

          <Link className="text-center" to="/register">
            <p className="text-center"> or Sign up</p>
          </Link>
          <Button className="col-12 " variant="secondary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
