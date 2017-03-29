/* @flow */

import React, { Component, PropTypes } from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';
import { RichUtils, EditorState, Modifier } from 'draft-js';

import LayoutComponent from './Component';

export default class Inline extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    currentStyles: {},
  };

  componentWillMount() {
    const { editorState, modalHandler } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(editorState),
      });
    }
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState &&
      this.props.editorState !== properties.editorState) {
      this.setState({
        currentStyles: getSelectionInlineStyle(properties.editorState),
      });
    }
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  toggleInlineStyle: Function = (style) => {
    const newStyle = style === 'MONOSPACE' ? 'CODE' : style;
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      newStyle
    );
    if (newStyle === 'SUBSCRIPT' || newStyle === 'SUPERSCRIPT') {
      const removeStyle = newStyle === 'SUBSCRIPT' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
      const contentState = Modifier.removeInlineStyle(
        newState.getCurrentContent(),
        newState.getSelection(),
        removeStyle
      );
      newState = EditorState.push(newState, contentState, 'change-inline-style');
    }
    if (newState) {
      onChange(newState);
    }
  };

  expandCollapse: Function = () => {
    this.setState({
      expanded: this.signalExpanded,
    });
    this.signalExpanded = false;
  }

  onExpandEvent: Function = () => {
    this.signalExpanded = !this.state.expanded;
  };

  doExpand: Function = () => {
    this.setState({
      expanded: true,
    });
  };

  doCollapse: Function = () => {
    this.setState({
      expanded: false,
    });
  };

  render() {
    const { config, translations } = this.props;
    const { expanded, currentStyles } = this.state
    const InlineComponent = config.component || LayoutComponent;
    return (
      <InlineComponent
        config={config}
        translations={translations}
        currentState={currentStyles}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onChange={this.toggleInlineStyle}
      />
    );
  }
}

// todo: move all controls to separate folder controls
// make subscript less low
