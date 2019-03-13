import React from 'react'
import {
  View,
  Text,
  Animated
} from 'react-native'
import BookImage from './BookImage'


export default class BookCube extends React.Component {
  constructor (props) {
    super(props)

  }

  getBackSideCss () {
    let css = this.getBasicSideCss('back');

    css.transform = [{rotateY: '180deg'}];
    css.backfaceVisibility = 'visible';
    css.left = -css.width/ 2
    // if (this.props.fan) {
      // css.zIndex = 100
    // }
    return css
  }

  getBottomSideCss() {
    let css = this.getBasicSideCss('bottom');
    let t = {
      rx: '-90deg',
      tx: '0',
      ty: '50%'
    };
    css.transform = [{rotateX: t.rx}];
    // css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';
    return css;
  }

  getLeftSideCss() {
    let css = this.getBasicSideCss('left');
    let t = {
      ry: -'90deg',
      tx: '-50%',
      ty: '0'
    };
    css.transform = [{rotateY: t.ry}];
    // css.transform = 'rotateY('+ t.ry +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';
    return css;
  }

  getRightSideCss() {
    let css = this.getBasicSideCss('right');

    let t = {
      ry: '90deg',
      tx: '50%',
      ty: '0'
    };
    css.transform = [{rotateY: t.ry}];
    // css.transform = 'rotateY('+ t.ry +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';
    return css;
  }

  getTopSideCss () {
    let css = this.getBasicSideCss('top');
    
    let t = {
      rx: '90deg',
      tx: '0',
      ty: '-50%'
    }
    css.transform = [{rotateY: t.ry}];
    // css.transform = 'rotateX('+ t.rx +') translate3d('+ t.tx +', '+ t.ty +', '+ t.tz +')';
    return css;
  }

  getFrontSideCss() {
    let css = this.getBasicSideCss('front')
    css.left = -css.width / 2
    css.zIndex = 10
    return css
  }

  getBasicSideCss(side) {
    return this.props.slider.resizeCss()
  }

  sideSet(side) {
    return this.props.index[side] !== undefined
  }

  getSize() {
    var css = this.props.slider.resizeHalfSize()
    return Object.assign({}, css, {left: 0})
  }

  getCss () {
    var css = this.props.slider.resizeCss()
    return Object.assign({}, css, {wdith: css.width/ 2, left: css.width / 2, backfaceVisibility: 'visible',overflow: 'hidden'})
  }


  render () {
    const style1 = this.getCss()
    let css = this.getFrontSideCss()

    let topCss = this.getTopSideCss()
    let backCss = this.getBackSideCss()
    let bottomCss = this.getBottomSideCss()
    let leftCss = this.getLeftSideCss()
    let rightCss = this.getRightSideCss()

    return (
      <Animated.View style={[style1, { transform: [{
        matrix: this.props.matrix,
      }]}]} >
        {this.props.fan ? null: <BookImage uri={this.props.slider.getCurrentImage()} size={this.getSize()} css={css} /> }
        {this.sideSet('top') ? <BookImage uri={this.props.slider.getNextImage()} css={topCss} ></BookImage> : null}
        {this.sideSet('back') ? <BookImage uri={this.props.slider.getNextImage()} size={this.getSize()}  css={backCss} ></BookImage> : null}
        {this.sideSet('bottom') ? <BookImage uri={this.props.slider.getNextImage()} css={bottomCss} ></BookImage> : null}
        {this.sideSet('left') ? <BookImage uri={this.props.slider.getNextImage()} css={leftCss} ></BookImage> : null}
        {this.sideSet('right') ? <BookImage uri={this.props.slider.getNextImage()} css={rightCss} ></BookImage> : null}
        
      </Animated.View>
    )
  }
}
