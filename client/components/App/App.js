import { Route, Switch } from 'react-router-dom';

import NotFoundPage from '../404/404';

import './App.sass';

class App extends React.Component {
    render() {
        return (
            <div className="container ui" style={{ paddingTop: '10%' }}>
                <h1>App</h1>
            </div>
        );
    }
}

export default App;

