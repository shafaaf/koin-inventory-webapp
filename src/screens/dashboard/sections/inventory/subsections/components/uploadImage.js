import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

//import Gallery from 'react-photo-gallery';

import {Grid, Row, Col, Image} from 'react-bootstrap';

import Gallery from 'react-grid-gallery';


const CLOUDINARY_UPLOAD_PRESET = 'ydrh63nt';
const CLOUDINARY_UPLOAD_URL = '	https://api.cloudinary.com/v1_1/sendkoin/upload';

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
	    	imagesArray: [],
	    	rendering: 0
			// uploadedFile: null,
			// uploadedFileCloudinaryUrl: ''
	    };
  	}

	onImageDrop(files) {
		console.log("files is: ", files);
		var filesLength = files.length;
		var uploadedFiles = this.state.uploadedFiles;
		var imagesArray = this.state.imagesArray;
		console.log("uploadedFiles is: ", uploadedFiles);
		console.log("imagesArray is: ", imagesArray);
		
		for (var i = 0; i < filesLength; i++) {
			var imageObject = {};
			imageObject["uploadedFile"] = files[i];
			imageObject["uploadedFileCloudinaryUrl"] = "";
			uploadedFiles.push(imageObject);

			//Making imagesArray Object
			var imageArrayObj = {};
			imageArrayObj["src"] = files[i]["preview"];
			imageArrayObj["thumbnail"] = files[i]["preview"];
			imageArrayObj["thumbnailWidth"] = 320;
			imageArrayObj["thumbnailHeight"] = 174;
			imageArrayObj["caption"] = "test1";
			imagesArray.push(imageArrayObj);
			
			// src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
			// thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
			// thumbnailWidth: 320,
			// thumbnailHeight: 174,
			// isSelected: true,
			// caption: "After Rain (Jeshu John - designerspics.com)"
		}

		console.log("Before setting state:");
		console.log("uploadedFiles is: ", uploadedFiles);
		console.log("imagesArray is: ", imagesArray);
		
		var rendering = (this.state.rendering)+1;
		
	    this.setState({
	      uploadedFiles: this.state.uploadedFiles,
	      imagesArray: this.state.imagesArray,
	      rendering: rendering
	    });
	    // for (var i = 0; i < filesLength; i++) {
	    // 	this.handleImageUpload(files[i], i);
	    // }
  	}

	handleImageUpload(file, i) {
	    let upload = request.post(CLOUDINARY_UPLOAD_URL)
	                     .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
	                     .field('file', file);

	    upload.end((err, response) => {
	      if (err) {
	        console.error(err);
	      }

	      if (response.body.secure_url !== '') {
	      	var uploadedFiles = this.state.uploadedFiles;
	      	uploadedFiles[i]["uploadedFileCloudinaryUrl"] = response.body.secure_url;
	        this.setState({
	        	uploadedFiles: this.state.uploadedFiles
	        });
	      }
	    });
	  }

	renderImageGallery(){
		var imagesArray = this.state.imagesArray;
		console.log("renderImageGallery: imagesArray is: ", imagesArray);
		if(imagesArray === undefined || imagesArray.length == 0){
			return <p>No Images present</p>;
		}
		else{
			console.log("this.state.imagesArray is: ", this.state.imagesArray);
			return  (
					<div>
						<p>{this.state.rendering}</p>
						<Gallery images = {this.state.imagesArray}/>
					</div>
				);
			// return (
			// 	<div>
			// 		<Image src= {uploadedFiles[0]["uploadedFile"]["preview"]} responsive alt = "why not"/>
			// 	</div>
			// );
		}
	}

	renderTest(){
		const IMAGES =
			[{
				src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
				thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 174,
				isSelected: true,
				caption: "After Rain (Jeshu John - designerspics.com)"
			},
			{
				src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
				thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 212,
				tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
				caption: "Boats (Jeshu John - designerspics.com)"
			},
			{
				src: "https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg",
				thumbnail: "https://i5.walmartimages.ca/images/Enlarge/580/6_r/875806_R.jpg",
				thumbnailWidth: 320,
				thumbnailHeight: 212
			}]
			return <Gallery images={IMAGES}/>;
	}

	render() {
		return (
			<div>
				<Grid>
					<Row>
						<Col xs={12}>
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
						</Col>
					</Row>
				</Grid>

				<div style = {{textAlign: "center"}}>
					{this.renderImageGallery()}
				</div>
			</div>
		);
	}
}
