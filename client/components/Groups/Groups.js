import { connect } from 'react-redux';

import { fetchGroups } from '../../actions/groups.js';

import Loading from 'material-ui/CircularProgress';
import {  List, ListItem} from 'material-ui/List';

import inlineStyles from '../../styles/inlineStyles';
import './Groups.sass';


class Groups extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false
        };
    };
    
    componentDidMount() {
        this.setState({
            isLoading: true
        });
        this.props.fetchGroups()
            .then(() => this.setState({ isLoading: false }))
            .catch(() => this.setState({ isLoading: false }))
    };

    onClickItem = (id) => {
        console.log(id)
    };
    
    render() {
        
        const main = (
            <List>
                {this.props.groups.map((item, i) => {
                    return <ListItem
                                primaryText={item.name}
                                key={i}
                                style={{
                                    fontSize: 13
                                }}
                                onClick={() => this.onClickItem(item.id)}
                            />
                })}
            </List>
        );

        const loading = (
            <div className="loading">
                <Loading color={inlineStyles.mainColor}/>
                <p>Loading...</p>
            </div>
        );
        
        return (
            <div className="Groups">
                {this.state.isLoading ? loading : main}
            </div>
        );
    };
};

function mapState(state) {
    return {
        groups: state.groups
    }
};

export default connect(mapState, { fetchGroups })(Groups);