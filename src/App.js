import SignIn from "./Components/SignIn"
import SignUp from "./Components/SignUp"
import ForgotPassword from "./Components/ForgotPassword"
import FirstTestContainer from "./Components/RavenTest/FirstTestContainer";
import FirstTest from "./Components/RavenTest/FirstTest";
import LayoutTest from "./Components/LayoutTest";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "@fontsource/roboto";
import AdminContainer from "./Components/Admin/AdminContainer";
import Debugger from "./Components/Admin/Debugger";
import CreateTestContainer from "./Components/CreateTest/CreateTestContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/FirstTest" element={<FirstTestContainer />} />
          <Route path="/Admin" element={<AdminContainer />} />
          <Route path="/CreateTest" element={<CreateTestContainer />} />
          <Route path="/Debug" element={<Debugger />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
