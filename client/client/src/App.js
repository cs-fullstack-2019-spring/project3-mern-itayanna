import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import WassupHome from "./WassupHome";
import WassupSignup from "./WassupSignup";
import WassupProfile from "./WassupProfile";
import WassupLogout from "./WassupLogout";
import WassupEdit from "./WassupEdit";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null,
            isLoggedIn:false,
        }
    }

    userLog = (username,isLoggedIn) =>{
        this.setState({username:username, isLoggedIn:isLoggedIn})
    };

    userLogout = () => {
        this.setState({username:null, isLoggedIn:false});
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <h1>Wassup???!!!</h1>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/signUp'}>Sign Up</Link>
                    <Link to={'/profile'}>Profile</Link>
                    <Link to={'/logout'} onClick={this.userLogout}>Logout</Link>
                </div>
                <Route path={'/'} exact component={()=> <WassupHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userLog={this.userLog}/>} />
                <Route path={'/signUp'} component={() => <WassupSignup userInfo={this.userInfo} />} />
                <Route path={'/profile'} component={() => <WassupProfile username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>} />
                <Route path={'/logout'} component={()=> <WassupLogout/>} />
                <Route path={'/editPost/:id/:postId'} component={()=> <WassupEdit/>} />
            </Router>
        );
    }
}

export default App;