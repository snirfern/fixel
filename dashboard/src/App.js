import "./App.css";
import { StoreProvider } from "./Store/Store";
import Main from "./Components/Main/Main";
function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}

export default App;
