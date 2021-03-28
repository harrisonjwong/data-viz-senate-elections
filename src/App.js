import './App.css';
import CurrentSenators from './components/current-senators';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home';
import SenateElection from './components/senate-election';

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
      </BrowserRouter>
    </div>
  );
}

export default App;
