import logo from './logo.svg';
import './App.css';
//Import MainComponent ./ = same directory
import {MainComponent} from './MainComponent.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainComponent/>
      </header>
    </div>
  );
}

export default App;
