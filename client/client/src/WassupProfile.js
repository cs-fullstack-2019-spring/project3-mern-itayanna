import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import WassupEdit from "./WassupEdit";

class WassupProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            allPost:[],
            formSubmit: false,
            resData: ''
        };
        this.userFetch();
    }

    userFetch = () => {
        if(this.props.isLoggedIn === true){
            fetch('/users/searchUsers',{
                method:'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username:this.props.username,
                })
            })
                .then(data=>data.text())
                .then(returnedData => this.setState({userData:returnedData}))
                .then(()=> this.mapPost())
        }
        else{
            console.log('User must login')
        }
    };

    mapPost = () => {
        if (this.state.userData.wassupPost) {
            let postMap = this.state.userData.wassupPost.map((eachPost) => {
                return (
                    <Router>
                        <div key={eachPost._id}>
                            <div>
                                {eachPost.postBody}
                            </div>
                            <img src={eachPost.postImage} alt="post image"/>
                            <br/>
                            <Link to={'/edit/' + this.state.userData._id + '/' + eachPost._id}>Edit</Link>
                        </div>
                        <Route path={'/edit/' + this.state.userData._id + '/' + eachPost._id}
                               component={()=> <WassupEdit postBody={eachPost.postBody} postImage={eachPost.postImage} userID={this.state.userData._id} postID={eachPost._id}/>}/>
                    </Router>
                )
            });
            this.setState({allPost:postMap})
        }
    };

    wassupPostSubmit = (e) => {
        e.preventDefault();
        fetch('/users/addPost', {
            method:'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username:this.props.username,
                postBody:e.target.postBody.value,
                postImage:e.target.postImage.value,
                postPublic:e.target.postPublic.checked,
            })
        })
            .then(data => data.text())
            .then(response => this.setState({resData: response}))
            .then(this.setState({formSubmit: true}));
    };

    confirmPost = (e) => {
        e.preventDefault();
        this.setState({formSubmit:false})
    };

    render() {
        if (this.props.isLoggedIn === true, this.state.formSubmit === false) {
            return (
                <div>
                    <h1 className='profilehead'>{this.props.username}</h1>
                        <div>
                            <img src={this.state.userData.profilePic} alt="profile pic"/>
                            <img src={this.state.userData.backgroundPic} alt="backgroud pic"/>
                        </div>
                        <div>
                            <h2>Wassup?!</h2>
                            <form onSubmit={this.wassupPostSubmit}>
                                <div>
                                    <label htmlFor={'postBody'}>Let us know Wassup!: </label>
                                    <input className={'textBox'} type="text" id={'postBody'} name={'postBody'}/>
                                    <label htmlFor={'postImage'}>Add Cool Pic Here: </label>
                                    <input type="text" id={'postImage'} name={'postImage'}/>
                                    <label htmlFor={'postPublic'}>Wanna make this public?: </label>
                                    <input type="checkbox" name={'postPublic'}/>
                                    <button>Post</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h3>What used to be Up</h3>
                            {this.state.allPost}
                        </div>
                </div>
                    );}
        if (this.state.formSubmit === true){
            return (
                <div>
                    <h1>
                        {this.state.resData}
                    </h1>
                    <button onClick={this.confirmPost}>OK</button>

                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Please Log In</h1>
                </div>
                    )
                }
                    }
                    }

                    export default WassupProfile;