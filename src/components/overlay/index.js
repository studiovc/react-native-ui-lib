import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {Colors} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';

const OVERLY_TYPES = {
  VERTICAL: 'vertical',
  TOP: 'top',
  BOTTOM: 'bottom',
  SOLID: 'solid'
};
const gradientImage = require('./assets/GradientOverlay.png');

/**
 * @description: Overlay view with types (default, top, bottom, solid)
 * @extends: Image
 * @extendsLink: https://facebook.github.io/react-native/docs/image
 */
export default class Overlay extends PureBaseComponent {
  static displayName = 'Overlay';

  static propTypes = {
    /**
     * The type of overlay to set on top of the image
     */
    type: PropTypes.oneOf(_.values(OVERLY_TYPES)),
    /**
     * Custom overlay content to be rendered on top of the image
     */
    customContent: PropTypes.element
  };

  static overlayTypes = OVERLY_TYPES;

  getStyleByType() {
    switch (this.props.type) {
      case OVERLY_TYPES.TOP:
        return styles.top;
      case OVERLY_TYPES.BOTTOM:
        return styles.bottom;
      case OVERLY_TYPES.SOLID:
        return styles.solid;
      default:
        break;
    }
  }

  renderCustomContent = () => {
    const {customContent} = this.props;
    return (
      <View pointerEvents="none" style={styles.customContent}>
        {customContent}
      </View>
    );
  };

  getImage = (style, source) => {
    return <Image style={[styles.container, style]} resizeMode={'stretch'} source={source}/>;
  };

  renderImage(typeStyle) {
    const {type, customContent} = this.props;
    const image = type !== OVERLY_TYPES.SOLID ? gradientImage : undefined;

    return (
      <View style={styles.container}>
        {type && this.getImage(typeStyle, image)}
        {customContent && this.renderCustomContent()}
      </View>
    );
  }

  render() {
    const {type, customContent} = this.props;
    const verticalOverlay = type === OVERLY_TYPES.VERTICAL;

    if (verticalOverlay) {
      return (
        <View style={styles.container}>
          {this.getImage(styles.top, gradientImage)}
          {this.getImage(styles.bottom, gradientImage)}
          {customContent && this.renderCustomContent()}
        </View>
      );
    }
    return this.renderImage(this.getStyleByType());
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    width: undefined
  },
  top: {
    bottom: undefined,
    top: 0,
    height: '50%'
  },
  bottom: {
    bottom: 0,
    top: undefined,
    height: '50%',
    transform: [{scaleY: -1}]
  },
  solid: {
    backgroundColor: Colors.rgba(Colors.dark10, 0.4)
  },
  customContent: {
    ...StyleSheet.absoluteFillObject
  }
});