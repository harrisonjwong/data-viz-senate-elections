import './App.css';
import CurrentSenators from './components/current-senators';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home';
import SenateElection from './components/senate-election';
import MarginOfVictory from './components/margin-of-victory';
import SenateToPresidential from './components/senate-to-presidential';
import {useState, useEffect} from 'react';
import {getStates} from './services/data-service';

function App() {
  const [states, setStates] = useState({});
  useEffect(() => {
    getStates().then(res => setStates(res));
  }, []);
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <Route exact={true}
               path={['/']}>
          <Home/>
        </Route>
        <Route exact={true}
               path={['/current-senators']}>
          <CurrentSenators states={states}/>
        </Route>
        <Route exact={true}
               path={['/elections']}>
          <SenateElection states={states}/>
        </Route>
        <Route exact={true}
               path={['/margin-of-victory']}>
          <MarginOfVictory states={states}/>
        </Route>
        <Route exact={true}
               path={['/senate-to-presidential']}>
          <SenateToPresidential states={states}/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
