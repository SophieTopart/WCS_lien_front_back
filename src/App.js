import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import Makeup from "./components/makeup";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Makeup />
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
    </div>
  );
}

export default App;
