import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import WassupEdit from "./WassupEdit";

class WassupProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            userPost:[],
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
                            <p>{eachPost.postBody}</p>
                            <img src={eachPost.postImage} alt="post image"/>
                            <Link to={'/edit/' + this.state.userData._id + '/' + eachPost._id}>Edit</Link>
                        </div>
                        <Route path={'/edit/' + this.state.userData._id + '/' + eachPost._id}
                               component={()=> <WassupEdit postBody={eachPost.postBody} postImage={eachPost.postImage} userID={this.state.userData._id} postID={eachPost._id}/>}/>
                    </Router>
                )
            });
            this.setState({userPost:postMap})
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
                <div className="App">
                    <h1>{this.props.username}</h1>
                    <div>
                        <div>
                            <img src={this.state.userData.profilePic} alt="PROFILE PIC"/>
                            <img src={this.state.userData.backgroundPic} alt="BACKGROUND PIC"/>
                        </div>
                        <div>
                            <h2>Wassup?!</h2>
                            <form onSubmit={this.wassupPostSubmit}>
                                <div>
                                    <label htmlFor={'postBody'}>Let us know wassup: </label>
                                    <input className={'textBox'} type="text" id={'postBody'} name={'postBody'}/>
                                </div>
                                <div>
                                    <label htmlFor={'postImage'}>Add a cool image URL: </label>
                                    <input type="text" id={'postImage'} name={'postImage'}/>
                                </div>
                                <div>
                                    <label htmlFor={'postPublic'}>Wanna Make it public?: </label>
                                    <input type="checkbox" name={'postPublic'}/>
                                </div>
                                <div>
                                    <input type="submit" value={'add post'}/>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h4>What Used to be Up:</h4>
                            {this.state.userPost}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="App">
                    <h3>Please Log In</h3>
                </div>
            )
        }
    }
}
export default WassupProfile;