import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const ModalUpdate = ({ handleClose, user, onUpdate }) => {
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  const updateHandler = (e) =>{
    e.preventDefault();
    const newUser = {
      email:email,
      name:name,
      role:role,
    }
    console.log(newUser);
    onUpdate(user.id,newUser);
    handleClose();
  }
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Update user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e=>updateHandler(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              value={email}
              defaultValue=""
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              defaultValue=""
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              value={role}
              onChange={e => setRole(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant="primary">
          Save Changes
        </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};
