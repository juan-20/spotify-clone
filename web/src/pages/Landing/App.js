import Dashboard from "../dashboard/Dashboard";
import Login from "../Login/Login";
// import './app.scss';


const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? <Dashboard code={code} /> : <Login />
}

export default App