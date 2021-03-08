import React from 'react';
import {connect} from 'react-redux';
import QS from 'qs';
import {activate} from '../../actions/loginActions';


class ActivationPage extends React.Component{
    componentDidMount() {
        this.props.dispatch(activate(this.parseURL()));
    }

    parseURL = () => {
        let params = window.location.search;
        let activationParams = {username:"",activationCode:""}
        activationParams.username = QS.parse(params, {ignoreQueryPrefix: true}).username;
        activationParams.activationCode = QS.parse(params, {ignoreQueryPrefix: true}).activationCode;
        return activationParams;
    }

    render(){
        return(
            <div className="activationPage">
                <p>{this.props.error}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        error:state.error
    }
}

export default connect(mapStateToProps)(ActivationPage);