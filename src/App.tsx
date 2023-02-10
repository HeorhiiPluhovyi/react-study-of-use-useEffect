import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [ type, setType ] = useState('users');
  const [ data, seTdata ] = useState([]);
  const [ position, setPosition ] = useState({
    x: 0, 
    y: 0
  })

  // useEffect(() => {
  //   console.log('render');
  // })
  console.log('render of app component')

  useEffect(() => {
    console.log(`UseEffect: Type change to ${type}`);
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => {
        console.log(json);

        seTdata(json);
      });
  }, [type])

  const mouseMoveHandler: { (event: MouseEvent): void } = (event: MouseEvent) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    })
  }

  useEffect(() => {
    console.log('componentDidMount');

    window.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [])

  return (
    <div className="App">
      <h1>Resource: { type }</h1>

      <div className="App__container--buttons-blok ">
        <button onClick={ () => setType('users')} className="App--button button-primary">Users</button>
        <button onClick={ () => setType('todos')} className="App--button button-reset">Todos</button>
        <button onClick={ () => setType('posts')} className="App--button button-danger">Posts</button>
      </div>

      <pre>{ JSON.stringify(position, null, 2) }</pre>
      <pre className="JSON-list">{ JSON.stringify(data, null, 2) }</pre>
    </div>
  );
}

export default App;
