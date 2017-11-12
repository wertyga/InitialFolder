import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../404/404';

import './App.sass';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;

