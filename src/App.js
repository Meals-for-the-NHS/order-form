import React from 'react';
import "../src/styles/tailwind.css"
import Form from './components/form';

function App() {
  const state = {
    name: "UCL Hospital"
  }
  return (
    <React.Fragment>
      <header className="bg-blue-700 text-white w-screen text-center"><h1 className="text-6xl content-center font-bold italic">Meals for the NHS</h1>
      </header>
      <div className="container mx-auto">
        <Form name={state.name} />
      </div>
    </React.Fragment>
  );
}

export default App;
