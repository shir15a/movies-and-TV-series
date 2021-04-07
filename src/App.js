import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Components/Header/Header';
import SimpleBottomNavigation from './Components/MainNav';

import './App.css';
import { Container } from '@material-ui/core';

import Trending from './Components/Pages/Trending/Trending';
import Movies from './Components/Pages/Movies/Movies';
import Series from './Components/Pages/Series/Series';
import Search from './Components/Pages/Search/Search';
import MyFav from './Components/Pages/MyFav/MyFav';




function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='app'>
        <Container>
          <Switch >
            <Route path='/' component={Trending} exact />
            <Route path='/series' children={<Series type='TV series' />} />

            <Route path='/movies' children={<Series type='movies' />} />

            {/* <Route path='/series' component={Series} /> */}
            <Route path='/search' component={Search} />
            <Route path='/MyFav' component={MyFav} />
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;


{/* <Route path='/movies' children={<Series type='movies'/>} />
<Route path='/series' children={<Series type='TV series'/>} /> */}