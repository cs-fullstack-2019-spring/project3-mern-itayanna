import React, { Component } from 'react';




class WassupEdit extends Component{
    constructor(props) {
        super(props);
        this.state={
            postEdit: '',

        };
    }

    editSubmit=(e)=>{
        e.preventDefault();
        fetch('/users/',{

            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },


            body: JSON.stringify(
                {
                    username:this.props.username,
                    postBody:e.target.postBody.value,
                    postImage:e.target.postImage.value,
                }
            ),
        })
            .then(data=>data.text())
            .then(response=>this.setState({postEdit: response}));
    };








    render(){

            return (
                <div>
                    <h1>Edit Post</h1>
                    <form onSubmit={this.editSubmit}>
                            <label htmlFor={"postBody"}>Wassup!?:</label>
                            <textarea type="text" id={"postBody"} name={"postBody"}/>
                            <label htmlFor={"postImage"}>Add Pic here:</label>
                            <input type="text" id={"postImage"} name={"postImage"}/>
                        <button>Submit</button>
                    </form>
                </div>
            );

    }

}

export default WassupEdit;