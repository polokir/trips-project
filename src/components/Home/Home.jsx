import Header from 'components/Header/Header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/user-slice';
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [trips, setTrips] = useState([]);

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

  useEffect(() => {
    if (user.name && user.role) return;
    dispatch(fetchUser(user.email));
    fetchTrips();
    // eslint-disable-next-line
  }, []);

  console.log(user);

  return (
    <>
      <Header role={user.role} />
      <p className="h2 text-center">If you want to test admin part of application here is admin account: email:test@gmail.com password:test123</p>
      {user.role !== 'admin' && user.role !== 'dispatcher' && (
        <Container>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>#</th>
                <th>departure</th>
                <th>destination</th>
                <th>passangers_num</th>
                <th>number_plate</th>
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default Home;
