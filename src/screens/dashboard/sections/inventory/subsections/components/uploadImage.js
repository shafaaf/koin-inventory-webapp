import React,{Component} from 'react';
import Dropzone from 'react-dropzone';

import Lightbox from 'react-images';

var textAlign = {
	textAlign: 'center',
	border: '2px dotted #000000',
	padding: '20px',
	backgroundColor: '#f6f5f5'
}

export default class UploadImage extends Component {
  constructor(props) {
	    super(props);
	    this.state = {
	    	uploadedFiles: [],
	    	images: []
	    };
  	}

  onImageDrop(files) {
		console.log("files is: ", files);
		var filesLength = files.length;
		
		var images = this.state.images;
		console.log("onImageDrop: images is: ", images);
		
		for (var i = 0; i < filesLength; i++) {
			var imagesObject = {};
			imagesObject["src"] = files[i]["preview"]
			images.push(imagesObject);
		}
		this.setState({ 
			images: images
		});
  	}

  	renderImages(){
  		var images = this.state.images;
  		if(images === undefined || images.length == 0){
  			return <p>No Images uploaded</p>;
  		}
  		else{
  			console.log("images is: ", images);
  			var images2 = [{src: 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg' }, { src: 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg'}];
  			return (
  				<Lightbox
			        images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
			        isOpen={this.state.lightboxIsOpen}
			        onClickPrev={this.gotoPrevious}
			        onClickNext={this.gotoNext} onClose={this.closeLightbox} />
  			);
  		}
  	}

  render() {
    return (
    	<div>
    		<form>
				<div className="FileUpload" style = {{cursor:"pointer"}}>
					<Dropzone style = {textAlign}
						onDrop={this.onImageDrop.bind(this)}
						multiple={true}
						accept="image/*">
						<div>Drop an image or click to select a file to upload.</div>
					</Dropzone>
				</div>
			</form>
			{this.renderImages()}
		</div>
    );
  }
}