// import React, { Component } from 'react';
// import ReactImageMagnify from 'react-image-magnify';
// import ReactSlick from 'react-slick';

// // import '../styles/react-slick.css';

// import imgb from "./WB3CY2153BG,WB3CY2153BB (7).jpg";
// import imgs from "./WB3CY2153BG,WB3CY2153BBsmall (7).jpg";


// const frontSrcSet = [
//     { src: imgs, setting: '500w' },
// ]
//     .map(item => `${item.src} ${item.setting}`)
//     .join(', ');



// const dataSource = [
//     {
//         srcSet: frontSrcSet,
//         small: imgs,
//         large: imgb
//     }
// ];

// export default class ReactSlickExample extends Component {
//     render() {
//         const {
//             rimProps,
//             rsProps
//         } = this.props;

//         return (
//             <ReactSlick
//                 {...{
//                     dots: true,
//                     infinite: true,
//                     speed: 500,
//                     slidesToShow: 1,
//                     slidesToScroll: 1
//                 }}
//                 {...rsProps}
//             >
//                 {dataSource.map((src, index) => (
//                     <div key={index}>
//                         <ReactImageMagnify
//                             {...{
//                                 smallImage: {
//                                     alt: 'Wristwatch by Versace',
//                                     isFluidWidth: true,
//                                     src: src.small,
//                                     srcSet: src.srcSet,
//                                     sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
//                                 },
//                                 largeImage: {
//                                     src: src.large,
//                                     width: 1426,
//                                     height: 2000
//                                 },
//                                 lensStyle: { backgroundColor: 'rgba(0,0,0,.6)' }
//                             }}
//                             {...rimProps}
//                         />
//                     </div>
//                 ))}
//             </ReactSlick>
//         );
//     }
// }