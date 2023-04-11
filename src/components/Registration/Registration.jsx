import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SiGmail, SiFacebook } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { setUser } from 'store/slices/user-slice';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(process.env)



  const register = () =>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      console.log(user)
      dispatch(setUser({
        id:user.uid,
        email:user.email,
        name:name,
        token:user.accessToken,
        role:(user.uid===process.env.REACT_APP_FIREBASE_ADMIN_ID) ? 'admin' : null,
      }))
      navigate('/home')
    })
    .catch((error) => {
      console.log(error)
    });
  
  } 

  const submitHandler = (e) =>{
    e.preventDefault();
    register();
    console.log(name,email,password)
    
  }

  return (
    <div className="container-fluid h-100 w-100 position-fixed top-0 left-0">
      <div className="d-flex justify-content-center align-items-center h-100">
        <Form
          className="border p-3 mb-5 bg-white rounded"
          onSubmit={(e)=>submitHandler(e)}
        >
          <div className="d-flex justify-content-center">
            <p className="h2">Registration</p>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control maxLength="30" value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" name="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Fullname</Form.Label>
            <Form.Control maxLength="30" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter name" name="name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Group className="d-flex justify-content-between">
              <Button className="px-5 justify-content-center align-items-center">
                <SiGmail />
              </Button>
              <Button className="px-5 justify-content-center align-items-center">
                <SiFacebook />
              </Button>
            </Form.Group>
          </Form.Group>
          <Link className="text-center" to="/">
            <p className="text-center"> or Login up</p>
          </Link>
          <Button className="col-12 " variant="secondary" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
