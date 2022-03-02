import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { io } = require("socket.io-client");

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
// const apiBaseUrl = 'http://20.127.58.233:3001/api';
// const apiBaseUrl = 'http://localhost:3001';

const socketBaseUrl = process.env.REACT_APP_SOCKET_BASE_URL || 'http://localhost:3002/';
// const socketBaseUrl = 'http://20.120.110.246:3002/';
// const socketBaseUrl = 'http://localhost:3002/' 



const socket = io.connect(socketBaseUrl, {path: '/rt/socket.io'});


function App() {
  let [inputValue, setInputValue] = useState('');
  let [apiDataOnLoad, setApiDataOnLoad] = useState('');
  let [apiDataPOST, setApiDataPOST] = useState('');
  let [socketData, setSocketData] = useState('');

  const callGetDataOnLoadAPI = () => {
    axios.get(`${apiBaseUrl}`)
      .then(res => {
        setApiDataOnLoad(res.data.message)
      })
      .catch(err => console.log(`Error ${err}`))
  }

  const callPostDataAPI = (data) => {
    axios.post(`${apiBaseUrl}/postReq`, { msg: data ? data : 'Heyo!' })
      .then(res => {
        setApiDataPOST(res.data.message)
      })
      .catch(err => console.log(`Error ${err}`))
  }

  const inputOnChange = (e) => {
    setInputValue(e.target.value);
    callPostDataAPI(e.target.value)
  }

  const getSocketData = () => {
    const handler = (message) => {
      console.log(message)
      setSocketData(`${socketData} | ${message}`);
    }

    socket.on("someRandomMessageTopic", (data) => {
      data = JSON.parse(data);
      console.log(`Socket Data received is: ${data.message}`)
      // setSocketData(`${socketData} | ${data.message}`);
      setSocketData(socketData => `${socketData} | ${data.message}`);
    });

    return () => {
      // socket.off("someRandomMessageTopic", handler);
      socket.off("someRandomMessageTopic", () => {
        console.log('disconnected')
      });
    };
  }

  useEffect(() => {
    callGetDataOnLoadAPI();
    callPostDataAPI();
    getSocketData();
  }, [socket]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          {apiDataOnLoad}
        </p>
        <p>

          {/* <div className="App-header">
          {socket}
        </div> */}
        </p>
        <div className="App-link">
          <input
            type="text"
            value={inputValue}
            onChange={inputOnChange}
          />
        </div>
        <div className="App-link">
          {apiDataPOST}
        </div>
        <p />
        <div className="App-link">
          {socketData}
        </div>
      </header>
    </div>
  );
}

export default App;
