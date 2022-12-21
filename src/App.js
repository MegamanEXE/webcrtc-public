import SignIn from "./Components/SignIn"
import SignUp from "./Components/SignUp"
import ForgotPassword from "./Components/ForgotPassword"
import TempTest from "./Components/Temp_Test";
import Temp_Test_Copy from "./Components/Temp_Test_Copy";
import LayoutTest from "./Components/LayoutTest";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "@fontsource/roboto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Temp_Test" element={<TempTest />} />
          <Route path="/Temp_Test_Copy" element={<Temp_Test_Copy />} />
          <Route path="/LayoutTest" element={<LayoutTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
