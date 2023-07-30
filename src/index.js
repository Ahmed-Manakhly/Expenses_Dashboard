import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index' ;

//--------------------------------
import './scss/index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);


