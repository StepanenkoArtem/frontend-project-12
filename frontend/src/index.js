import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';
import reportWebVitals from './reportWebVitals';
import subscribe from './socket';

const run = () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  const socketInstance = io();
  const socket = subscribe(socketInstance);

  init(socket)
    .then((vdom) => {
      root.render(vdom);
    });
};

run();

// If you want to start measuring performance in your ui, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
