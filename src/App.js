import {BrowserRouter, Route} from 'react-router-dom'
import Components from './Components';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/'> 
          <Components />
      </Route> 
    </BrowserRouter>
  );
}

export default App;
