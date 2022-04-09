import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
// start-path is 'images' because we have an alias 'images' in webpack.common.js
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import App from "./components/router/app";
import { Provider } from "react-redux";
import { store } from "./redux/store";

interface AppProps {
  // eslint-disable-next-line react/no-unused-prop-types
  nothing: boolean;
}

interface AppState {
  title: string;
}
class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);

    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <Provider store={store}>
          <App/>  
        </Provider>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
