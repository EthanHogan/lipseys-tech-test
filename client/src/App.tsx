import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
type testResponse = {message: string}
function App() {

  const testRequest = (): void => {
    fetch('/api')
      .then(res => res.json())
      .then((data: testResponse): void => {console.log(data.message)});
  }

  useEffect(() => {
    testRequest();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
