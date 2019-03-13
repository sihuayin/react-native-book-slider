import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import BookImage from './BookImage'
import Transitions from './transitions/index'


export default class BookBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      index: 0,
      nextIndex: 1,
      imageLength: props.images.length,
      transition: '',
      isDrawing: false
    }
  }

  getNextImage() {
    return this.props.images[this.state.nextIndex]
  }

  getCurrentImage () {
    return this.props.images[this.state.index]
  }

  goNext = (page) => {
    let s = {transition: 'transitionBook'}
    if (page > 0 && page < this.props.images.length) {
      s.nextIndex = parseInt(page)
    }
    this.setState(s)

    // setTimeout(() => {
    //   console.log('yaogenghuan')
    //   this.onEnd()
    // }, 3000)
    // if (this.state.index < this.state.imageLength - 1) {
    //   setTimeout(() => {
    //     this.setState({
    //       index: this.state.index + 1
    //     })
    //   }, 2000)
    // }
  }

  componentDidMount () {
    if (!this.props.images || this.props.images.length <= 0) {
      console.log('error!')
    }
  }

  resizeCss () {
    return {
      position: 'absolute',
      width: this.props.width,
      height: this.props.height,
      left: 0,
      top: 0
    }
  }

  resizeSize () {

  }

  resizeHalfSize () {
    return {
      width: this.props.width / 2,
      height: this.props.height,
      left: 0,
      top: 0
    }
  }

  onEnd = () => {

    this.setState({
      index: this.state.nextIndex,
      nextIndex: this.state.nextIndex >= this.props.images.length - 1 ? 1 : this.state.nextIndex + 1
    })

    setTimeout(() => {
      this.setState({
        transition: ''
      })
    }, 200)
  }

  render () {
    let Tran = this.state.transition && Transitions[this.state.transition]
    let css = this.resizeCss()
    const canvasStyle = Object.assign({}, css, {zIndex: 10, display: this.state.isDrawing ? 'flex': 'none'})
    
    console.log(this.getNextImage())
    return (
      <View style={this.props.style}>
        {Tran ? <Tran ref='book' slider={this} /> : null}
        {
          this.props.images.map((img, index) => {
            return  <Image key={index} style={[css, {display: index === this.state.index ? 'flex': 'none'}]} source={{uri: img}} resizeMode="cover"/> 
          })
        }
           
      </View>
    )
  }
}