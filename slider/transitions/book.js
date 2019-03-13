import React from 'react'
import {
  View,
  Animated
} from 'react-native'
import BookImage from '../BookImage'
import BookCube from '../BookCube'
import transformUtil from '../transformUtil'

export default class Book extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      matrix: transformUtil.createIdentityMatrix(),
      rotation2: new Animated.Value(0),
      fan: false
    }
  }

  componentDidMount () {
    console.log('开始翻页', this.getImage())
    var css = this.props.slider.resizeHalfSize()
    const x = - css.width
    this.state.rotation2.addListener(({ value }) => {
      const matrix = transformUtil.createIdentityMatrix();
      transformUtil.applyPerspective(
        matrix,
        1000
      );

      if (value < -90) {
        this.setState({fan: true})
      }

      const rotate = transformUtil.rotateY(value);
      transformUtil.multiplyInto(matrix, matrix, rotate);

      transformUtil.origin(matrix, { x: x, y: 0, z: 0 });
      this.setState({matrix})
    })

    Animated.timing(this.state.rotation2, {
      toValue: -180,        //属性目标值
      duration: 1200    //动画执行时间
    }).start(() => {
      console.log('翻页完毕')
      this.setState({
        matrix: transformUtil.createIdentityMatrix(),
        rotation2: new Animated.Value(0),
        fan: false
      })
      this.props.slider.onEnd()
    });
  }

  getImage () {
    return this.props.slider.getNextImage()
  }

  getSize () {
    var css = this.props.slider.resizeHalfSize()
    return Object.assign({}, css, {left: css.width})
  }

  getCss () {
    var css = this.props.slider.resizeCss()
    return Object.assign({}, css, {left: -css.width / 2, zIndex: 0})
  }

  getCubeCss () {
    var css = this.props.slider.resizeCss()
    return Object.assign({}, css, {left: css.width / 2, zIndex: 5})
  }
  render () {

    return (
      <View style={{zIndex: 3}}>
        <BookImage uri={this.getImage()} size={this.getSize()} css={this.getCss()} />
        <BookCube slider={this.props.slider} fan={this.state.fan} matrix={this.state.matrix} index={{front: 0, back: 1}} css={this.getCubeCss()}/>
        
      </View>
      
    )
  }
}