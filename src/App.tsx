import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Provider } from "react-redux";
import { store } from "./providers/store";
import { Router } from "./providers/router";
import { enableMapSet } from "immer";
import "./providers/i18n";

enableMapSet();

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
