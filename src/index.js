import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './firebase'
import { Provider } from 'react-redux';
import { store } from 'store';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter basename="/trips-project">
      <App />
    </BrowserRouter>
  </Provider>
);
