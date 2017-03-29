/* @flow */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { getFirstIcon } from '../../../../utils/toolbar';
import { Dropdown, DropdownOption } from '../../../Dropdown';
import Option from '../../../Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

export default class LayoutComponent extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    doExpand: PropTypes.func,
    doCollapse: PropTypes.func,
    onExpandEvent: PropTypes.func,
    config: PropTypes.object,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  options: Array = [{ type: 'unordered', value: 'unordered-list-item' },
    { type: 'ordered', value: 'ordered-list-item' },
    { type: 'indent', value: 'indent' },
    { type: 'outdent', value: 'outdent' }];

  toggleBlockType: Function = (blockType: String) => {
    const { onChange } = this.props;
    onChange(blockType);
  };

  indent: Function = () => {
    const { onChange } = this.props;
    onChange('indent');
  };

  outdent: Function = () => {
    const { onChange } = this.props;
    onChange('outdent');
  };

  // todo: evaluate refactoring this code to put a loop there and in other places also in code
  // hint: it will require moving click handlers
  renderInFlatList() {
    const { config, currentState: { linkType } } = this.props;
    const { options, unordered, ordered, indent, outdent, className } = config;
    return (
      <div className={classNames('rdw-list-wrapper', className)} aria-label="rdw-list-control">
        {options.indexOf('unordered') >= 0 && <Option
          value="unordered-list-item"
          onClick={this.toggleBlockType}
          className={classNames(unordered.className)}
          active={linkType === 'unordered-list-item'}
        >
          <img
            src={unordered.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('ordered') >= 0 && <Option
          value="ordered-list-item"
          onClick={this.toggleBlockType}
          className={classNames(ordered.className)}
          active={linkType === 'ordered-list-item'}
        >
          <img
            src={ordered.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('indent') >= 0 && <Option
          onClick={this.indent}
          className={classNames(indent.className)}
        >
          <img
            src={indent.icon}
            alt=""
          />
        </Option>}
        {options.indexOf('outdent') >= 0 && <Option
          onClick={this.outdent}
          className={classNames(outdent.className)}
        >
          <img
            src={outdent.icon}
            alt=""
          />
        </Option>}
      </div>
    );
  }

  renderInDropDown() {
    const { config, expanded, doCollapse, doExpand, onExpandEvent, onChange, currentState: { linkType } } = this.props;
    const { options, className, dropdownClassName } = config;
    return (
      <Dropdown
        className={classNames('rdw-list-dropdown', className)}
        optionWrapperClassName={classNames(dropdownClassName)}
        onChange={onChange}
        expanded={expanded}
        doExpand={doExpand}
        doCollapse={doCollapse}
        onExpandEvent={onExpandEvent}
        aria-label="rdw-list-control"
      >
        <img
          src={getFirstIcon(config)}
          alt=""
        />
        { this.options
          .filter(option => options.indexOf(option.type) >= 0)
          .map((option, index) => (<DropdownOption
            key={index}
            value={option.value}
            className={classNames('rdw-list-dropdownOption', config[option.type].className)}
            active={linkType === option.value}
          >
            <img
              src={config[option.type].icon}
              alt=""
            />
          </DropdownOption>))
        }
      </Dropdown>
    );
  }

  render() {
    const { config: { inDropdown } } = this.props;
    if (inDropdown) {
      return this.renderInDropDown();
    }
    return this.renderInFlatList();
  }
}
