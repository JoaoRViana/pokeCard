import io from 'socket.io-client';

let socket;

if (process.env.NODE_ENV === 'development') {
  socket = io.connect("http://localhost:3001");
} else {
  socket = io.connect("https://pokecard-joaorviana.vercel.app");
}

export default socket;
