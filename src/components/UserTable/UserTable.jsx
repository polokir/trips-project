import Header from 'components/Header/Header';
import { ModalUpdate } from 'components/Modal/ModalUpdate';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { isAuth } from 'store/slices/user-slice';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteteUser, updateUser } from 'queries/queries';
export const UserTable = () => {
  const curUser = useSelector(state=>state.user);
  const [allUser, setAllUser] = useState([]);
  const [userUpdate, setUserUpdate] = useState({});
  const [show, setShow] = useState(false);
 


  useEffect(() => {
    async function fetchUsers() {
      try {
        const firestore = getFirestore();
        const userCollection = collection(firestore, 'user');
        const udocs = await getDocs(userCollection);
        setAllUser(() =>
          udocs.docs.map(d => {
            const usrs = {
              id: d.id,
              email: d.data().email,
              name: d.data().name,
              role: d.data().role,
            };
            return usrs;
          })
        );
      } catch (err) {
        alert('ERROR');
        console.log(err);
      }
    }
    fetchUsers();
  }, [show]);
  console.log('klskl', allUser);

  const onClickModal = user => {
    setShow(true);
    setUserUpdate(user);
  };
  const closeModal = () => {
    setShow(false);
  };

  const onDelete = async (id) => {
    deleteteUser(id);
  };


  const isAuthtorized = useSelector(isAuth);
  console.log("isAuth",isAuthtorized)
  if(!isAuthtorized){
    return <Navigate to='/'/>
  }
  return (
    <>
      <Header role={curUser.role} />
      <Container>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map(user => (
              <tr key={user.id}>
                <td className="text-center">{user.id}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.role}</td>
                <td className="text-center">
                  <Button className="me-1" onClick={() => onClickModal(user)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={()=>onDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {show && (
          <Modal show={show} onHide={closeModal}>
            <ModalUpdate
              user={userUpdate}
              handleClose={closeModal}
              onUpdate={updateUser}
            />
          </Modal>
        )}
      </Container>
    </>
  );
};
