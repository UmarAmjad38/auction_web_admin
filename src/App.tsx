import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const SOCKET_URL = "ws://16.170.106.236:8181/";
  const socket = io(SOCKET_URL, { transports: ["websocket"] });

  useEffect(() => {
    const token = sessionStorage.getItem('email');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <Box>Loading...</Box>
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} socket={socket} />;
}

export default App;
