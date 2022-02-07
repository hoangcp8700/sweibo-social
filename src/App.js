import "./App.css";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Routes from "routes";
import ThemeConfig from "theme";
// import NotistackProvider from "components/Notistack";
import { useSetting } from "hooks";
import { PATH_AUTH } from "constants/paths";

function App() {
  const { darkMode } = useSetting();
  const isLogin = false;
  return (
    <ThemeConfig darkMode={darkMode}>
      {/* <NotistackProvider> */}
      <Router>
        <Routes />
        {/* {isLogin ? <Routes /> : <Navigate to={PATH_AUTH.login} />} */}
        {/* {isLogin ? <Routes /> : <Navigate to={PATH_AUTH.login} />} */}
      </Router>
      {/* </NotistackProvider> */}
    </ThemeConfig>
  );
}

export default App;
