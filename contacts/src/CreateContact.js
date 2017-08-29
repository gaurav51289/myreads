import React, { Component} from "react";
import {Link} from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";
import PropTypes from "prop-types";

class CreateContact extends Component{

    static propTypes = {
        onCreateContanct : PropTypes.func.isRequired
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const values = serializeForm(event.target,{hash:true});
        if(this.props.onCreateContanct){
            this.props.onCreateContanct(values);
        }

    }



    render(){
        return (
            <div>
                <Link className="close-create-contact" to="/"/>
                <form onSubmit={this.handleSubmit} className="create-contact-form">
                    <ImageInput
                        className="create-contact-avatar-input"
                        name="avatarURL"
                        maxHeight={64}
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name"/>
                        <input type="text" name="email" placeholder="Email"/>
                        <button>Add Contact</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default CreateContact;