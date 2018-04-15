import axios from 'axios';

import './App.sass';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            res: ''
        };
    };
    error = () => {
        axios.get('/error')
            .then(res => this.setState({ res: res.data }))
    };
    render() {
        return (
            <div className="App">
                <h1>App</h1>
                <button onClick={this.error}>Throw Err to log</button>
                <div>Response: <div>{this.state.res}</div></div>
            </div>
        );
    }
}

export default App;

