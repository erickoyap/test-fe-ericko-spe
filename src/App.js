import React from 'react';
import Currency from './features/Currency';
import './App.css';

function App() {
  return (
    <div className="App" style={{marginTop:"10px"}}>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
        />
        <Currency/>
        Ericko Yaputro @2019
    </div>
  );
}

export default App;
