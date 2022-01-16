import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import ThemeConfig from "theme";
// import NotistackProvider from "components/Notistack";
import { useSetting } from "hooks";

function App() {
  const { darkMode } = useSetting();

  return (
    <ThemeConfig darkMode={darkMode}>
      {/* <NotistackProvider> */}
      <Router>
        <Routes />
      </Router>
      {/* </NotistackProvider> */}
    </ThemeConfig>
  );
}

export default App;
