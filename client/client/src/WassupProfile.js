import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import EditTweet from "./WassupEdit";

class WassupProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            allPost:[],
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
                .then(data=>data.json())
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
                            <img className={'postImage'} src={eachPost.postImage} alt="post image"/>
                            <Link to={'/edit/' + this.state.userData._id + '/' + eachPost._id}>Edit</Link>
                        </div>
                        <Route path={'/edit/' + this.state.userData._id + '/' + eachPost._id}
                               component={()=> <EditTweet postBody={eachPost.postBody} postImage={eachPost.postImage} userID={this.state.userData._id} postID={eachPost._id}/>}/>
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
    };

    render() {
        if (this.props.isLoggedIn === true) {
            return (
                <div>
                    <h1>{this.props.username}</h1>
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
                    );
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