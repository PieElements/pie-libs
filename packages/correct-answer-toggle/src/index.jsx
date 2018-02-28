// !important - pull in the pre-configured jss module not the raw js module.
import injectSheet, { jss } from 'react-jss';
import styles, { animationStyles } from './styles';

import CSSTransition from 'react-transition-group/CSSTransition';
import { CorrectResponse } from '@pie-libs/icons';
import Expander from './expander';
import React from 'react';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import classNames from 'classnames';
import merge from 'lodash/merge';

const aniClasses = jss.createStyleSheet(animationStyles).attach();

/**
 * We export the raw unstyled class for testability. For public use please use the default export.
 */
export class CorrectAnswerToggle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: props.show
    }
  }

  onClick() {
    this.props.onToggle(!this.props.toggled);
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show
    });
  }

  render() {

    const { classes, className } = this.props;

    return (
      <div className={classNames(classes.root, className)}>
        <Expander
          show={this.state.show}
          className={classes.expander}>
          <div className={classes.content} onClick={this.onClick.bind(this)}>
            <div className={classes.iconHolder}>
              <CSSTransition
                timeout={400}
                in={this.props.toggled}
                classNames={aniClasses.classes}>
                <CorrectResponse
                  open={true}
                  key="correct-open"
                  className={classes.icon} />
              </CSSTransition>
              <CSSTransition
                timeout={5000}
                in={!this.props.toggled}
                classNames={aniClasses.classes}>
                <CorrectResponse
                  open={false}
                  key="correct-closed"
                  className={classes.icon} />
              </CSSTransition>
            </div>
            <div className={classes.label}>{this.props.toggled ? this.props.hideMessage : this.props.showMessage}</div>

          </div>
        </Expander>
      </div>
    );
  }
}

CorrectAnswerToggle.propTypes = {
  onToggle: React.PropTypes.func,
  toggled: React.PropTypes.bool,
  show: React.PropTypes.bool,
  hideMessage: React.PropTypes.string,
  showMessage: React.PropTypes.string
};

CorrectAnswerToggle.defaultProps = {
  showMessage: 'Show correct answer',
  hideMessage: 'Hide correct answer',
  show: false,
  toggled: false
};

export default injectSheet(styles)(CorrectAnswerToggle);