/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import styles from './button.module.sass';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'reset', 'submit'])
};

const defaultProps = {
  type: 'button'
};

const Button = forwardRef(({ children, type, ...props }, ref) => {
  const innerProps = { ...props };

  if (ref) {
    innerProps.ref = ref;
  }

  return (
    <button className={styles.button} type={type} {...innerProps}>
      {children}
    </button>
  );
});

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
