import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import WassupHome from "./WassupHome";
import WassupSignup from "./WassupSignup";
import WassupProfile from "./WassupProfile";
import WassupLogout from "./WassupLogout";
import WassupEdit from "./WassupEdit";
import WassupLogin from "./WassupLogin";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null,
            isLoggedIn:false,
        }
    }

    userLog = (username, isLoggedIn) =>{
        this.setState({username:username, isLoggedIn:true})
    };

    userLogout = () => {
        this.setState({username:null, isLoggedIn:false})

    };

    render() {
        if(this.state.isLoggedIn === true){
        return (
            <div className='App'>
            <div className="grid-containerHead">
            <Router>
                <div className="navBar">
                    <h1 className="homeHeader">Wassup???!!!</h1>
                    <Link to={'/'}>Home</Link>
                    /
                    <Link to={'/profile'}>Profile</Link>
                    /
                    <Link to={'/logout'} onClick={this.userLogout}>Logout</Link>
                </div>
                <Route path={'/'} exact component={()=> <WassupHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userLog={this.userLog}/>} />
                <Route path={'/profile'} component={() => <WassupProfile username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>} />
                <Route path={'/logout'} component={()=> <WassupLogout/>} />
            </Router>
            </div>
            </div>
        );
    }
        else {
            return (
                <div className='App'>
                    <div className="grid-containerHead">
                        <Router>
                            <div className="navBar">
                                <h1 className="homeHeader">Wassup???!!!</h1>
                                <Link to={'/'}>Home</Link>
                                /
                                <Link to={'/signUp'}>Sign Up</Link>
                                /
                                <Link to={'/profile'}>Profile</Link>
                                /
                                <Link to={'/login'} onClick={this.userLogout}>LogIn</Link>
                            </div>
                            <Route path={'/'} exact component={()=> <WassupHome username={this.state.username} isLoggedIn={this.state.isLoggedIn} userLog={this.userLog}/>} />
                            <Route path={'/signUp'} component={() => <WassupSignup userInfo={this.userLog} />} />
                            <Route path={'/profile'} component={() => <WassupProfile username={this.state.username} isLoggedIn={this.state.isLoggedIn}/>} />
                            <Route path={'/login'} component={()=> <WassupLogin username={this.state.username} isLoggedIn={this.state.isLoggedIn} userLog={this.userLog}/>}/>
                        </Router>
                    </div>
                </div>
            );

        }
}}

export default App;