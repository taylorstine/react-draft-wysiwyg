import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const getImageComponent = (config) => {

  return class Image extends Component {

    static propTypes: Object = {
      block: PropTypes.object,
      contentState: PropTypes.object,
    };

    state: Object = {
      hovered: false,
    };

    setEntityAlignmentLeft: Function = () => {
      this.setEntityAlignment('left');
    };

    setEntityAlignmentRight: Function = () => {
      this.setEntityAlignment('right');
    };

    setEntityAlignmentCenter: Function = () => {
      this.setEntityAlignment('none');
    };

    setEntityAlignment: Function = (alignment) => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(
        entityKey,
        { alignment }
      );
      this.setState({
        dummy: true,
      });
    };

    toggleHovered: Function = () => {
      const hovered = !this.state.hovered;
      this.setState({
        hovered,
      });
    };

    renderAlignmentOptions() {
      return (
        <div
          className="rdw-image-alignment-options-popup"
        >
          <Option
            onClick={this.setEntityAlignmentLeft}
            className="rdw-image-alignment-option"
          >
            L
          </Option>
          <Option
            onClick={this.setEntityAlignmentCenter}
            className="rdw-image-alignment-option"
          >
            C
          </Option>
          <Option
            onClick={this.setEntityAlignmentRight}
            className="rdw-image-alignment-option"
          >
            R
          </Option>
        </div>
      );
    }

    render() {
      const { block, contentState } = this.props;
      const { hovered } = this.state;
      const { isReadOnly, isImageAlignmentEnabled } = config;
      const entity = contentState.getEntity(block.getEntityAt(0));
      const { src, alignment, height, width } = entity.getData();

      return (
        <span
          onMouseEnter={this.toggleHovered}
          onMouseLeave={this.toggleHovered}
          className={classNames(
            'rdw-image-alignment',
            {
              'rdw-image-left': alignment === 'left',
              'rdw-image-right': alignment === 'right',
              'rdw-image-center': !alignment || alignment === 'none',
            }
          )}
        >
          <span className="rdw-image-imagewrapper">
            <img
              src={src}
              alt=""
              style={{
                height,
                width,
              }}
            />
            {
              !isReadOnly() && hovered && isImageAlignmentEnabled() ?
                this.renderAlignmentOptions()
                :
                undefined
            }
          </span>
        </span>
      );
    }
  }
}

export default getImageComponent;
