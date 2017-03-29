/* @flow */

import React, { Component, PropTypes } from 'react';
import { Modifier, EditorState } from 'draft-js';

import LayoutComponent from './Component';

export default class Emoji extends Component {

  static propTypes: Object = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    modalHandler: PropTypes.object,
    config: PropTypes.object,
    translations: PropTypes.object,
  };

  state: Object = {
    expanded: false,
  };

  componentWillMount() {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

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

  addEmoji: Function = (emoji) => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.insertText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      emoji,
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    this.doCollapse();
  };

  render() {
    const { config, translations } = this.props;
    const { expanded } = this.state
    const EmojiComponent = config.component || LayoutComponent;
    return (
      <EmojiComponent
        config={config}
        translations={translations}
        onChange={this.addEmoji}
        expanded={expanded}
        onExpandEvent={this.onExpandEvent}
        doExpand={this.doExpand}
        doCollapse={this.doCollapse}
        onCollpase={this.closeModal}
      />
    );
  }
}

// todo: unit test cases
