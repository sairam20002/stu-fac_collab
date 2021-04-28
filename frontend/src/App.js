import "./App.css";
import { CustomRouter } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <CustomRouter />
    </Provider>
  );
}

export default App;
