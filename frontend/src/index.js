import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init';
import reportWebVitals from './reportWebVitals';

const run = () => {
  // const token = localStorage.getItem('token');
  const socketInstance = io();
  // 'ws://localhost:5001',
  // {
  //   transports: ['websocket', 'polling'],
  //   path: '',
  //   auth: { token },
  //   timeout: 10000,
  // },
  // );

  const root = ReactDOM.createRoot(document.getElementById('chat'));

  init(socketInstance)
    .then((vdom) => {
      root.render(vdom);
    });
};

run();

// If you want to start measuring performance in your ui, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
