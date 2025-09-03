import HomePage from "./components/homePage/HomePage";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/loginPage/Login";
import SignUp from "./components/signupPage/SignUp";
import MarkPage from "./components/markPage/MarkPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SkillFormPage from "./components/SkillPage/SkillFormPage";
import AdminPanel from "./components/adminPanel/AdminPanel";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/markPage" element={<MarkPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/skillFormPage" element={<SkillFormPage />} />
        <Route path="/admin" element={<AdminPanel />} />

      </Routes>
    </Router>
  );
}

export default App;