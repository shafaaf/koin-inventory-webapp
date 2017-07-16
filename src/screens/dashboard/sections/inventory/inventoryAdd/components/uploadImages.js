import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import {Grid, Row, Col, Image, Thumbnail, Button} from 'react-bootstrap';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'ydrh63nt';
const CLOUDINARY_UPLOAD_URL = ' https://api.cloudinary.com/v1_1/sendkoin/upload';

var textAlign = {
	textAlign: 'center',
	border: '2px dotted #000000',
	padding: '20px',
	backgroundColor: '#f6f5f5'
}

var imageStyle = {
  width: '250px', 
  height: '250px',
  //textAlign: "center",
  display:"block",
  margin:"auto",
  paddingBottom:"7%"
}

export default class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Upload picture of food item!",
    	uploadedImage: null,
      uploadedImageCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
		console.log("onImageDrop: files is: ", files);
		var filesLength = files.length;
		var uploadedImage = this.state.uploadedImage;
		this.setState({
			uploadedImage: files[0],
      message: "Change item image"
		});
    // this.handleImageUpload(files[0]);
  }

  handleImageUpload(file){
    console.log("At handleImageUpload: file is: ", file);
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    
    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      if (response.body.secure_url !== '') {
        this.setState({
          uploadedImageCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  removeImage(){
    console.log("removeImage called");
    this.setState({
      uploadedImage: null,
      message: "Upload picture of food item!"
    });
  }

	renderImage(){
		var uploadedImage = this.state.uploadedImage;
		if(uploadedImage == null){
			return <h3 style = {{textAlign: "center"}}>No image uploaded</h3>;
		}
		else {
			console.log("uploadedImage is: ", uploadedImage);
			return (
        <Grid style = {{marginTop: "1%", marginBottom: "1%"}}>
          <Row className="show-grid">
            <Col xs={12} md={12} style = {{textAlign: "center"}}>
              <img src={uploadedImage["preview"]} alt="Mountain View" style={{width:"400px",height:"308px"}}/>
            </Col>
            <Col xs={12} md={12} style = {{textAlign: "center", marginTop: "1%"}}>
              <Button bsStyle="danger" bsSize="large" onClick = {this.removeImage.bind(this)}>Remove Image</Button>
            </Col>
          </Row>
        </Grid>
      );
		}
	}

  render() {
    return (
    	<div>
    		<form>
  				<div className="FileUpload" style = {{cursor:"pointer"}}>
  					<Dropzone style = {textAlign} onDrop={this.onImageDrop.bind(this)}
  						multiple={false} accept="image/*">
  						<div><span className="glyphicon glyphicon-plus"></span> {this.state.message}</div>
  					</Dropzone>
  				</div>
        </form>
    		<div>
          {this.renderImage()}
        </div>
  	  </div>
    );
  }

}
