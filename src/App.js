import "./App.css";
import { BrowserRouter as Router, Navigate } from "react-router-dom";
import Routes from "routes";
import ThemeConfig from "theme";
// import NotistackProvider from "components/Notistack";
import { useAuth } from "hooks";
import { PATH_AUTH } from "constants/paths";
import NotistackProvider from "components/Notistack";

function App() {
  const { user } = useAuth();
  return (
    <ThemeConfig darkMode={user?.settings?.isDarkMode}>
      <NotistackProvider>
        <Router>
          <Routes />
          {/* {isLogin ? <Routes /> : <Navigate to={PATH_AUTH.login} />} */}
          {/* {isLogin ? <Routes /> : <Navigate to={PATH_AUTH.login} />} */}
        </Router>
      </NotistackProvider>
    </ThemeConfig>
  );
}

export default App;
