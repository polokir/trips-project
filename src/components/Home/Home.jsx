import Header from 'components/Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/user-slice';

const Home = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.name && user.role) return;
    dispatch(fetchUser(user.email));
    // eslint-disable-next-line
  }, []);

  
  console.log(user);
  

  return <Header role={user.role} />;
};

export default Home;
