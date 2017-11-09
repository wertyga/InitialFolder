import { connect } from 'react-redux';

import Groups from '../Groups/Groups';
import GroupItems from '../GroupItems/GroupItems';
import ModalItem from '../ModalItem/ModalItem';

import './MainPage.sass';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            globalError: this.props.globalError
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.globalError !== prevProps.globalError) {
            this.setState({
                globalError: this.props.globalError
            })
        }
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="MainPage">
                    <h2>Item collection list</h2>
                    {this.state.globalError && <div className="error">{this.state.globalError}</div>}
                    <div className="content">
                        <Groups />
                        <GroupItems />
                    </div>

                    {this.state.openModal && <ModalItem />}
                </div>
            </MuiThemeProvider>
        );
    }
};

function mapState(state) {
    return {
        globalError: state.globalError
    }
};

export default connect(mapState)(MainPage);