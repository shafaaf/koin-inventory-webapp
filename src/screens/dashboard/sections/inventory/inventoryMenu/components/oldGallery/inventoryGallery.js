// Note: Pass in showThumbnails to show small slides of images at bottom to give more space for caption.

import React,{Component} from 'react';

import Gallery from './Gallery';

function makeUnsplashSrc (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}
function makeUnsplashSrcSet (id, size) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
	const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159';

	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}

const DEFAULT_IMAGES = [
	{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Jeremy Bishop ¼ lb* of savory flame-grilled beef topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
	{ id: '1471079502516-250c19af6928', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
	{ id: '1454023492550-5696f8ff10e1', caption: 'Photo by Jessica Weiller', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
	{ id: '1470854989922-5be2f7456d78', caption: 'Photo by Piotr Łaskawski', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
	{ id: '1470317596697-cbdeda56f999', caption: 'Photo by Michel Bosma', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
];

const THUMBNAIL_IMAGES = [
	{ id: '1454991727061-be514eae86f7', caption: 'Photo by Thomas Kelley', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/t20pc32VbrU (Hump Back Whale)
	{ id: '1455717974081-0436a066bb96', caption: 'Photo by Teddy Kelley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/cmKPOUgdmWc (Deer)
	{ id: '1460899960812-f6ee1ecaf117', caption: 'Photo by Jay Ruzesky', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/h13Y8vyIXNU (Walrus)
	{ id: '1456926631375-92c8ce872def', caption: 'Photo by Gwen Weustink', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/I3C1sSXj1i8 (Leopard)
	{ id: '1452274381522-521513015433', caption: 'Photo by Adam Willoughby-Knox', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/_snqARKTgoc (Mother and Cubs)
	{ id: '1471145653077-54c6f0aae511', caption: 'Photo by Boris Smokrovic', orientation: 'landscape' }, // https://unsplash.com/photos/n0feC_PWFdk (Dragonfly)
	{ id: '1471005197911-88e9d4a7834d', caption: 'Photo by Gaetano Cessati', orientation: 'landscape' }, // https://unsplash.com/photos/YOX8ZMTo7hk (Baby Crocodile)
	{ id: '1470583190240-bd6bbde8a569', caption: 'Photo by Alan Emery', orientation: 'landscape' }, // https://unsplash.com/photos/emTCWiq2txk (Beetle)
	{ id: '1470688090067-6d429c0b2600', caption: 'Photo by Ján Jakub Naništa', orientation: 'landscape' }, // https://unsplash.com/photos/xqjO-lx39B4 (Scottish Highland Cow)
	{ id: '1470742292565-de43c4b02b57', caption: 'Photo by Eric Knoll', orientation: 'landscape' }, // https://unsplash.com/photos/DmOCkOnx-MQ (Cheetah)
	// https://unsplash.com/photos/NUMlxTPsznM coyote?
];

const THEMED_IMAGES = [
	{ id: '1471101173712-b9884175254e', caption: 'Photo by Pedro Lastra. Our DOUBLE WHOPPER® Sandwich is a pairing of two ¼ lb* savory flame-grilled beef patties topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a soft sesame seed bun.', orientation: 'square', useForDemo: true }, // https://unsplash.com/photos/5oRzZU5uwSM (Dragonfly)
	{ id: '1471127432458-65206be149c9', caption: 'Photo by Ernesto Velázquez', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/Kpgt4pl03O0 (Deer)
	{ id: '1470777639313-60af88918203', caption: 'Photo by Cris Saur', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GNUcUx-iObg (Koala)
	{ id: '1453550486481-aa4175b013ea', caption: 'Photo by Benjamin Pley', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/WiSeaZ4E6ZI (Elephant)
	{ id: '1415904663467-dfdc16cae794', caption: 'Photo by Levi Saunders', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/NUMlxTPsznM (Coyote)
];




export default class InventoryGallery extends Component {
  render() {
    return (
		<div>
			<p>Default Options (Popular Products)</p>
			<Gallery images={DEFAULT_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
				src: makeUnsplashSrc(id),
				thumbnail: makeUnsplashThumbnail(id, orientation),
				srcset: [
					makeUnsplashSrcSet(id, 1024),
					makeUnsplashSrcSet(id, 800),
					makeUnsplashSrcSet(id, 500),
					makeUnsplashSrcSet(id, 320),
				],	//not needed if have src and thumbnail
				caption,
				orientation, // Decides whether square or like stacked with others
				useForDemo,	// Decides whether appears in thumbnail or not.
			}))}/>



			<p>With Thumbnails (Appeteasers/Appetizer)</p>
			<Gallery images={THUMBNAIL_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
				src: makeUnsplashSrc(id),
				thumbnail: makeUnsplashThumbnail(id, orientation),
				srcset: [
					makeUnsplashSrcSet(id, 1024),
					makeUnsplashSrcSet(id, 800),
					makeUnsplashSrcSet(id, 500),
					makeUnsplashSrcSet(id, 320),
				],
				caption,
				orientation,
				useForDemo,
			}))} showThumbnails />



			<p>Themed Lightbox (Burgers, Pitas, Wraps)</p>
			<Gallery images={THEMED_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
				src: makeUnsplashSrc(id),
				thumbnail: makeUnsplashThumbnail(id, orientation),
				srcset: [
					makeUnsplashSrcSet(id, 1024),
					makeUnsplashSrcSet(id, 800),
					makeUnsplashSrcSet(id, 500),
					makeUnsplashSrcSet(id, 320),
				],
				caption,
				orientation,
				useForDemo,
			}))}/>

		</div>
    );
  }
}