import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyHome from './components/MyHome';
import Member from './components/Member';
import Menu from './components/Menu';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainHome from './components/MainHome';
import MainMenu from './components/MainMenu';
import RankMember from './components/RankMember';

function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/admin">
          <>
            <div className="App">
              <MyHome />
              <Menu />
              <Member />
            </div>
          </>
        </Route>

        <Route path="/" exact>
          <div className="App"> 
            <MainHome />
            <MainMenu />
            <RankMember />
          </div>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
