import React, {Component} from "react";
import "./Entry_Box.css";

class EntryBox extends Component {
	render() {
		return(
			<input id = {this.props.id} type = {this.props.textType} 
			placeholder = {this.props.default} onChange = {this.props.onChange} 
			readOnly = {this.props.readonly}/>
		);
	}
}

export default EntryBox;