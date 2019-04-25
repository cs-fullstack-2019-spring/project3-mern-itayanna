import React, { Component } from 'react';




class WassupEdit extends Component{
    constructor(props) {
        super(props);
        this.state={
            loggedIn: false,
            postEdit: '',

        };
    }




    WassupPostSubmit=(e)=>{
        e.preventDefault();

        fetch('/users/editPost/' + this.props.id + '/' + this.props.postID,{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },


            body: JSON.stringify({
                postBody: e.target.postBody.value,
                postImage: e.target.postImage.value,
                postPublic:e.target.postPublic.checked,
            })
        })
    };







    render(){
        if(this.props.logInfo.loggedIn){

            return (
                <div>
                    <h1>Edit Post</h1>
                    <form onSubmit={this.WassupPostSubmit}>
                            <label htmlFor={"postBody"}>Wassup!?:</label>
                            <textarea type="text" id={"postBody"} name={"postBody"}/>
                            <label htmlFor={"postImage"}>Add Pic here:</label>
                            <input type="text" id={"postImage"} name={"postImage"}/>
                        <button>Submit</button>
                    </form>
                </div>
            );
        }
        else {
            return(
                <div>
                    <h1>Log in Please</h1>
                </div>);
        }

    }

}

export default WassupEdit;