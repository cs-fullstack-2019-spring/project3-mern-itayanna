import React, { Component } from 'react';

class WassupSignup extends Component{
    constructor(props) {
        super(props);
        this.state={
            data:'',
        };
    }

    submitSignupForm=(e)=>{
        e.preventDefault();
        fetch('/users/signUp',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    profilePic: e.target.profilePic.value,
                    backgroundPic: e.target.backgroundPic.value,
                }),
            })
    };

    render(){
        return(
            <div>
                <h1 className='joinHead'>Join Wassup!</h1>
                <form className='joinFor' onSubmit={this.submitSignupForm}>
                        <label htmlFor={'username'}>Username: </label>
                        <input type="text" id={'username'} name={'username'}/>
                        <br/>
                        <h1></h1>
                        <label htmlFor={'password'}>Password: </label>
                        <input type="password" id={'password'} name={'password'}/>
                        <br/>
                        <h1></h1>
                        <label htmlFor={'profilePic'}>Profile Pic: </label>
                        <input type="text" id={'profilePic'} name={'profilePic'}/>
                        <br/>
                        <h1></h1>
                        <label htmlFor={'backgroundPic'}>Background Pic: </label>
                        <input type="text" id={'backgroundPic'} name={'backgroundPic'}/>
                        <br/>
                        <h1></h1>

                        <input type="submit" value={'Submit'}/>
                </form>
                {this.state.data}
            </div>

        );
    }
}


export default WassupSignup;