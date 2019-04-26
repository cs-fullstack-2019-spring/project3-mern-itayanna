import React, {Component} from 'react';
import WassupHome from "./WassupHome";

class WassupLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    signInSubmit = (e) => {
        e.preventDefault();
        fetch('/users/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
            })
        })
            .then((data) => data.text())
            .then((data) => {
                if (data) {
                    this.props.userLog(data, true)
                } else {
                    this.props.userLog(null, false);
                }
            })
    };



    render() {
        if(this.props.isLoggedIn === false){
            return (
                <div>
                    <h4 className='signinHead'>Sign In</h4>
                    <form className='signinForm' onSubmit={this.signInSubmit}>
                        <label htmlFor={'username'}>Username: </label>
                        <input type="text" id={'username'} name={'username'}/>
                        <br/>
                        <h1></h1>
                        <label htmlFor={'password'}>Password: </label>
                        <input type="password" id={'password'} name={'password'}/>
                        <br/>
                        <h1></h1>
                        <button>Sign In</button>
                    </form>
                </div>
            );}
        else {
            return (
                <div>
                    <h1>You are now logged in!</h1>
                </div>
            )
        }
        }
}

export default WassupLogin;