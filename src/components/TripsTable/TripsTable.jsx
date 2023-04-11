import Header from 'components/Header/Header';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { addTrip, deleteTrip, updateTrip } from 'queries/queries';
import { ModalUpdateTrip } from 'components/Modal/ModalUpdateTrip';
import { ModalAddTrip } from 'components/Modal/ModalAddTrip';

export const TripsTable = () => {
  const [trips, setTrips] = useState([]);
  const [tripUpdate,setTripUpdate] = useState({});
  const user = useSelector(state => state.user);
  const [show,setShow] = useState(false);
  const [showAdd,setShowAdd] = useState(false);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const db = getFirestore();
        const tripCollection = collection(db, 'trip');
        const tdocs = await getDocs(tripCollection);
        setTrips(() =>
          tdocs.docs.map(d => {
            const trip = {
              id: d.id,
              departure: d.data().departure,
              destination: d.data().destination,
              number_plate: d.data().number_plate,
              passangers_num: d.data().passangers_num,
            };
            return trip;
          })
        );
      } catch (err) {
        alert('ERROR');
        console.log(err);
      }
    }
    fetchTrips();
  }, [show,showAdd]);

  const onClickModal = trip => {
    setShow(true);
    setTripUpdate(trip);
  };

  const closeModal = () => {
    setShow(false);
    setShowAdd(false);
  };

  const onDelete = (id) =>{
    deleteTrip(id)
  }
  
  console.log(trips);



  return (
    <>
      <Header role={user.role} />
      <Container>
        <Button onClick={()=>setShowAdd(true)} className='mb-3 me-auto text-center'>New trip</Button>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>departure</th>
              <th>destination</th>
              <th>passangers_num</th>
              <th>number_plate</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => (
              <tr key={trip.id}>
                <td className="text-center">{trip.id}</td>
                <td className="text-center">{trip.departure}</td>
                <td className="text-center">{trip.destination}</td>
                <td className="text-center">{trip.passangers_num}</td>
                <td className="text-center">{trip.number_plate}</td>
                <td className="text-center">
                  <Button className="me-1" onClick={()=>onClickModal(trip)}>Update</Button>
                  <Button variant="danger" onClick={()=>onDelete(trip.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {
        show && (
            <Modal show={show} onHide={closeModal}>
                <ModalUpdateTrip trip={tripUpdate} setTrip={setTripUpdate} handleClose={closeModal} onUpdate={updateTrip} />
            </Modal>
            
        )
      }
      {
         showAdd && (
            <Modal show={showAdd} onHide={closeModal}>
                <ModalAddTrip addTrip={setTrips} handleClose={closeModal} onAdd={addTrip} />
            </Modal>
            
        )
      }
    </>
  );
};
