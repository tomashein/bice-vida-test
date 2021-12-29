import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './spinner.module.sass';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: null
};

const Spinner = ({ className }) => {
  const classes = classNames(styles.spinner, className);

  return (
    <div className={classes}>
      <div className={styles.rect1} />
      <div className={styles.rect2} />
      <div className={styles.rect3} />
      <div className={styles.rect4} />
      <div className={styles.rect5} />
    </div>
  );
};

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;

export default Spinner;
