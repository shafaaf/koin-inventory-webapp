import React,{Component} from 'react';
import Lightbox from 'react-images';

export class Sample extends React.Component {
  render() {
    return (
      <Lightbox
        images={[{ src: 'http://example.com/img1.jpg' }, { src: 'http://example.com/img2.jpg' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}/>
    );
  }
}

export default class Test extends Component {
  render() {
    return (
    	<div>
			<p>Test for Koin</p>
			<Sample/>
		</div>
    );
  }
}