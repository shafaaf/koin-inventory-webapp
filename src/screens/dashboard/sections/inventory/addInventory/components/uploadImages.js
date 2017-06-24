import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {Grid, Row, Col, Image, Thumbnail} from 'react-bootstrap';

import Gallery from 'react-photo-gallery';


var textAlign = {
	textAlign: 'center',
	border: '2px dotted #000000',
	padding: '20px',
	backgroundColor: '#f6f5f5'
}

export default class UploadImages extends Component {
  constructor(props) {
	    super(props);
	    this.state = {
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
			imagesObject["src"] = files[i]["preview"];
			imagesObject["width"] = 600;
			imagesObject["height"] = 600;
			images.push(imagesObject);
		}
		this.setState({ 
			images: images
		});
  	}

  	openLightbox(){
  		console.log("openLightbox");
  	}

    renderThumbnails(){
      console.log("renderThumbnails: images is: ", this.state.images);
      var imagesMapped = this.state.images.map(function(image){
            return (
                <Col xs={2} md={2} lg={2}>
                  <Thumbnail src = {image.src} responsive/>
                </Col>
              );
          });
      console.log("imagesMapped is: ", imagesMapped);
      return imagesMapped;
    }

  	renderImages(){
  		var images = this.state.images;
  		if(images === undefined || images.length == 0){
  			return <p style = {{textAlign: "center"}}>No Images uploaded</p>;
  		}
  		else{
  			console.log("images is: ", images);
  			// For testing purposes
  			var images2 = [
  				{src: 'https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg',  width: 681,
  					height: 1024}, 
  				{ src: 'https://support.apple.com/library/content/dam/edam/applecare/images/en_US/apple-store-giftcard.png',  width: 681,
    				height: 1024}
    		];

  			return (
          <div>
            <Grid>
              <Row>
                {this.renderThumbnails()}
              </Row>
            </Grid>
          </div>
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
  						<div><span className="glyphicon glyphicon-plus"></span> Upload pictures of food item!</div>
  					</Dropzone>
  				</div>
			   </form>
			<div>
        {this.renderImages()}
      </div>
		</div>
    );
  }
}

export class Sample extends React.Component {
    render() {
    return (
        <Gallery photos={this.props.images} onClickPhoto={this.openLightbox}/>
    );
    }
}