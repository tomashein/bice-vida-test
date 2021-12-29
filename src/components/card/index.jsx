import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './card.module.sass';

const propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.node,
  description: PropTypes.node
};

const defaultProps = {
  className: null,
  image: null,
  tag: null,
  title: null,
  description: null
};

const Card = ({ className, image, tag, title, description, ...props }) => {
  const classes = classNames(styles.card, className);

  return (
    <article className={classes} {...props}>
      {image && (
        <div className={styles['card-image']}>
          <img src={image} alt={title} />
          {tag && (
            <div className={styles['card-tag']}>
              {tag}
            </div>
          )}
        </div>
      )}
      {(title || description) && (
        <div className={styles['card-body']}>
          {!image && tag && (
            <div className={styles['card-tag']}>
              {tag}
            </div>
          )}
          {title && <h1 className={styles['card-title']}>{title}</h1>}
          {description && <p className={styles['card-description']}>{description}</p>}
        </div>
      )}
    </article>
  );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
