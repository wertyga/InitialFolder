import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../404/404';
import MainComponent from '../MainComponent/MainComponent';

import './App.sass';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route exact path="/" component={MainComponent}/>
                    
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;

