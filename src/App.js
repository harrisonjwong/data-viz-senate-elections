import './App.css';
import CurrentSenators from './components/current-senators';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home';
import SenateElection from './components/senate-election';
import MarginOfVictory from './components/margin-of-victory';

function App() {
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <Route exact={true}
               path={['/']}
               component={Home}/>
        <Route exact={true}
               path={['/current-senators']}
               component={CurrentSenators}/>
        <Route exact={true}
               path={['/elections']}
               component={SenateElection}/>
        <Route exact={true}
               path={['/margin-of-victory']}
               component={MarginOfVictory}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
