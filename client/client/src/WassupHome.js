import React, {Component} from 'react';

class WassupHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userPosts: [],
            allPost:[],
            postMap:[],
            posts:[],
            privatPosts:[],
            searchResults:[],
            mappedResults:[],
        };
        this.wassupPostfech()
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

    wassupPostfech = () => {
        fetch('/users/grabPost')
            .then(data => data.json())
            .then(returnedData => this.setState({userPost: returnedData}))
            .then(() => this.userPostmap())

    };

    userPostmap = () => {
        let mappedUsers = this.state.userPost.map((eachUser) => {
            return (
                eachUser.wassupPost
            )
        });
        for(let i=mappedUsers.length-1; i>0; i--){
            let postMapping = mappedUsers[i].map((eachPost)=>{
                return(this.state.postMap.push(eachPost))
            });
            this.setState({allPost:postMapping})
        }
        this.allPostmap()
    };

    allPostmap = () => {
        let posts = this.state.postMap.map((eachPost)=>{
            if(eachPost.postPublic === true){
                return(
                    <div key={eachPost._id}>
                        <p>{eachPost.postBody}</p>
                        <img src={eachPost.postImage} alt="post image"/>
                    </div>
                )
            }
        });
        let privatePost = this.state.postMap.map((eachPost)=>{
            return(
                <div key={eachPost._id}>
                    <p>{eachPost.postBody}</p>
                    <img src={eachPost.postImage} alt="post image"/>
                </div>
            )
        });
        this.setState({postsMap:posts});
        this.setState({privatePost:privatePost})
    };

    searchSubmit = (e) =>{
        e.preventDefault();
        fetch('/users/searchPost', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                searchBar: e.target.searchBar.value,
            })
        })
            .then((data) => data.json())
            .then((data) => {
                if (data) {
                    this.setState({searchResults:data});
                    this.resultsMap()
                } else {
                    this.setState({searchResults:null});
                }
            })

    };

    mapResults = () => {
        let mappedResults = this.state.searchResults.map((eachResult)=> {
            return(
                <div>
                    <p>{eachResult}</p>
                </div>
            )
        });
        this.setState({mappedResults:mappedResults})
    };


    render() {
        if (this.props.isLoggedIn === true) {
            return (
                <div className="App">
                    <div>
                        <form onSubmit={this.searchSubmit}>
                            <label htmlFor={'searchBar'}>Search: </label>
                            <input type="text" name={'searchBar'} />
                            <button>Go</button>
                        </form>
                    </div>
                    <br/>
                    {this.state.mappedResults}
                    <h3>Find out Wassup: </h3>
                    <hr/>
                    {this.state.privatePost}
                </div>
            );
        }
        else {
            return (
                <div>
                    <form className={'formStyle'} onSubmit={this.searchSubmit}>
                        <label htmlFor={'searchBar'}>Search: </label>
                        <input type="text" name={'searchBar'} />
                        <button>Go</button>
                    </form>
                    <br/>
                    {this.state.mappedResults}
                    <h4>Sign In</h4>
                    <form onSubmit={this.signInSubmit}>
                        <label htmlFor={'username'}>Username: </label>
                        <input type="text" id={'username'} name={'username'}/>
                        <label htmlFor={'password'}>Password: </label>
                        <input type="password" id={'password'} name={'password'}/>
                        <button>Sign In</button>
                    </form>
                    <h4>Public Post: </h4>
                    <hr/>
                    {this.state.posts}
                </div>
            );
        }
    }
}

export default WassupHome;