import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export const ModalAddTrip = ({ handleClose, addTrip, onAdd }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [passengers, setPassengers] = useState('');
  const [number_plate,setNumberPlate] = useState('');

  const addHandler = (e) =>{
    e.preventDefault();
    const newTrip = {
        departure:departure,
        destination:destination,
        number_plate:number_plate,
        passangers_num:passengers
    }
    console.log(newTrip);
    onAdd(newTrip);
    addTrip(prevState=>[...prevState,newTrip])
    handleClose();
  }
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e=>addHandler(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Departure</Form.Label>
            <Form.Control
              type="text"
              placeholder="name@example.com"
              autoFocus
              value={departure}
              defaultValue=""
              onChange={e => setDeparture(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              value={destination}
              defaultValue=""
              onChange={e => setDestination(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Number Plate</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              value={number_plate}
              onChange={e => setNumberPlate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Passengers number</Form.Label>
            <Form.Control
              type="text"
              defaultValue=""
              value={passengers}
              onChange={e => setPassengers(e.target.value)}
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
