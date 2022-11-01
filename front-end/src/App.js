import {
  BrowserRouter as Router, Navigate, Route, Routes
} from "react-router-dom";
import './App.css';
import Login from './screens/Login';
import Posts from './screens/Posts';

function App() {
  const token = localStorage.getItem('userToken')
  return (
    <div className="App">
      <Router>
        <Routes>{
          token ?
            <>
              <Route path='/posts' element={<Posts />} />
              <Route
                path="*"
                element={<Navigate to="/posts" replace />}
              />
            </>
            :
            <>
              <Route path="/" element={<Login />} />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </>
        }

        </Routes>
      </Router>
    </div >
  );
}

export default App;
