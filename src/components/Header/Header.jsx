import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getAuth, signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/slices/user-slice';

export function Header({ role }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    const auth = getAuth();
    console.log(auth);
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate('/');
      })
      .catch(error => {
        // An error happened.
      });
  };
  return (
    <Navbar
      className="mb-5"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container className="d-flex align-items-center">
        <Navbar.Brand href="#home">Trip CRM</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {role === 'admin' && (
              <NavLink to="/users" className="me-5"  style={{
                textDecoration: 'none',
                color: 'rgba(255, 255, 255, 0.55)',
              }}>
                Users Table
              </NavLink>
            )}

            <NavLink
              to="/trips"
              style={{
                textDecoration: 'none',
                color: 'rgba(255, 255, 255, 0.55)',
              }}
            >
              Trips Table
            </NavLink>
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
        <Button variant="dark" onClick={logoutHandler}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
