/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { stopPropagation } from '../../../../utils/common';
import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class LayoutComponent extends Component {

  static propTypes: Object = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    doCollpase: PropTypes.func,
    onChange: PropTypes.func,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    embeddedLink: '',
    height: 'auto',
    width: '100%',
  };

  componentWillReceiveProps(props) {
    if (this.props.expanded && !props.expanded) {
      this.setState({
        embeddedLink: '',
        height: 'auto',
        width: '100%',
      });
    }
  }

  updateValue: Function = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  onChange: Function = (event) => {
    const { onChange } = this.props;
    const { embeddedLink, height, width } = this.state;
    onChange(embeddedLink, height, width);
  };

  rendeEmbeddedLinkModal() {
    const { embeddedLink, height, width } = this.state;
    const { config: { popupClassName }, doCollapse, translations } = this.props;
    return (
      <div
        className={classNames('rdw-embedded-modal', popupClassName)}
        onClick={stopPropagation}
      >
        <div className="rdw-embedded-modal-header">
          <span className="rdw-embedded-modal-header-option">
            {translations['components.controls.embedded.embeddedlink']}
            <span className="rdw-embedded-modal-header-label" />
          </span>
        </div>
        <div className="rdw-embedded-modal-link-section">
          <input
            className="rdw-embedded-modal-link-input"
            placeholder={translations['components.controls.embedded.enterlink']}
            onChange={this.updateValue}
            onBlur={this.updateValue}
            value={embeddedLink}
            name="embeddedLink"
          />
          <div className="rdw-embedded-modal-size">
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              name="height"
              className="rdw-embedded-modal-size-input"
              placeholder="Height"
            />
            <input
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="rdw-embedded-modal-size-input"
              placeholder="Width"
            />
          </div>
        </div>
        <span className="rdw-embedded-modal-btn-section">
          <button
            className="rdw-embedded-modal-btn"
            onClick={this.onChange}
            disabled={!embeddedLink || !height || !width}
          >
            {translations['generic.add']}
          </button>
          <button
            className="rdw-embedded-modal-btn"
            onClick={doCollapse}
          >
            {translations['generic.cancel']}
          </button>
        </span>
      </div>
    );
  }

  render() {
    const { config: { icon, className }, expanded, onExpandEvent } = this.props;
    return (
      <div
        className="rdw-embedded-wrapper"
        aria-haspopup="true"
        aria-expanded={expanded}
        aria-label="rdw-embedded-control"
      >
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={onExpandEvent}
        >
          <img
            src={icon}
            alt=""
          />
        </Option>
        {expanded ? this.rendeEmbeddedLinkModal() : undefined}
      </div>
    );
  }
}

export default LayoutComponent;
