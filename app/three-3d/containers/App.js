import React from 'react'
import { observer } from 'mobx-react'
import '../css/street.scss'
import ReactCanvas from 'react-canvas'

const Surface = ReactCanvas.Surface
const Image = ReactCanvas.Image
const Text = ReactCanvas.Text
const a1 = require('../img/a1.jpg')

@observer
export default class App extends React.Component {

  getImageHeight() {
    return Math.round(window.innerHeight / 2);
  }

  getImageStyle() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: this.getImageHeight()
    };
  }

  getTextStyle() {
    return {
      top: this.getImageHeight() + 10,
      left: 0,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20,
      fontSize: 12
    };
  }

  render() {
    const surfaceWidth = window.innerWidth;
    const surfaceHeight = window.innerHeight;
    const imageStyle = this.getImageStyle();
    const textStyle = this.getTextStyle();

    return (
      <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
        <Image style={imageStyle} src={a1} />
        <Text style={textStyle}>
          Here is some text below an image.
        </Text>
      </Surface>
    );
  }
}
