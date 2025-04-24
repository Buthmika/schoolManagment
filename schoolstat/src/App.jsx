import HomePage from "./components/homePage/HomePage"
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/loginPage/Login"
import SignUp from "./components/signupPage/SignUp"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
 

  return (
    
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router> */}
    <LandingPage></LandingPage>
      
    </>
  )
}

export default App
