import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types'; // ES6 

var imageUploadButton = {
	border: '2px dotted #000000',
	padding: '20px',
	backgroundColor: '#f6f5f5'
}

export default class UploadImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			uploadButtonMessage: "Upload something plz"
		};
	}

	// Setting itemImageUrl state from props passed in
	componentWillReceiveProps(newProps){
		console.log("UploadImage: componentWillReceiveProps called.");
		console.log("UploadImage: newProps is: ", newProps);
		// Todo: If no picture uploaded initially, this is undefined.
		if(newProps.itemImageUrl){	// Some image already present regardless uploaded intially or now
			this.setState({
				uploadButtonMessage: "Change item image"
			});
		}
		else{
			this.setState({
				uploadButtonMessage: "Upload new image"
			});
		}
	}

	onImageDrop(file){
		console.log("onImageDrop- file is: ", file);
		this.props.setUploadedImage(file);
	}

  	render() {
    	return (
	    	<div style = {{textAlign: "center", marginTop: "2%"}}>
				<form>
	  				<div className="FileUpload" style = {{cursor:"pointer"}}>
	  					<Dropzone style = {imageUploadButton} onDrop={this.onImageDrop.bind(this)}
	  						multiple={false} accept="image/*">
	  						<div><span className="glyphicon glyphicon-plus"></span> {this.state.uploadButtonMessage}</div>
	  					</Dropzone>
	  				</div>
        		</form>
			</div>
    	);
  	}
}

UploadImage.propTypes = {
    itemImageUrl: PropTypes.string,
 	setUploadedImage: PropTypes.func.isRequired
}

