import * as React from 'react';
import Container from 'react-bootstrap/Container';
import * as ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider> */}
    <Container fluid className="app-container">
      <h1>Hello RSSchool!</h1>
    </Container>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root'),
);
