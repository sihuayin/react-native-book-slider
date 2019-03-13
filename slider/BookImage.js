import React from 'react'
import {
  Image,
  View
} from 'react-native'

export default class BookImage extends React.Component {
  constructor (props) {
    super(props)

    this.style = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 1000,
      height: 900,
      overflow: 'hidden',
      backgroundColor: 'transparent',
      zIndex: 0
      // transform: [{perspective: 1000}]
    }
  }

  render() {
    const style = this.props.css && Object.assign({}, this.style, this.props.css) || this.style
    const container = {
      width: this.props.size.width,
      height: this.props.size.height,
      left: this.props.size.left,
      top: this.props.size.top,
      zIndex: this.props.css.zIndex,
      overflow: 'hidden'
    }

    return (
      <View style={container}>
        <Image resizeMode="cover" source={{uri: this.props.uri}}  style={style} />
      </View>
    )
  }
}