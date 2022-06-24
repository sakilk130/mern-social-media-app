import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./App";
import reducer from "./reducers";
import reportWebVitals from "./reportWebVitals";
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
