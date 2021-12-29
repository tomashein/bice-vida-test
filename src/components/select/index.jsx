import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './select.module.sass';

const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })),
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const defaultProps = {
  className: null,
  disabled: false,
  label: null,
  value: undefined
};

const Select = forwardRef(({ className, disabled, label, name, options, value, ...props }, ref) => {
  const [innerValue, setInnerValue] = useState('');
  const [innerOptions, setInnerOptions] = useState([]);
  const [focus, setFocus] = useState(false);
  const innerProps = { disabled, name, ...props };

  if (ref) {
    innerProps.ref = ref;
  }

  useEffect(() => {
    setFocus(false);
  }, [value]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  useEffect(() => {
    let arr = [...options];
    if (arr.length > 0 && typeof arr[0] !== 'object') {
      arr = arr.map((opt) => ({ label: opt, value: opt }));
    }
    setInnerOptions(arr);
  }, [options]);

  const onSelectFocus = () => setFocus(true);

  const onSelectBlur = () => setFocus(false);

  const wrapperClasses = classNames(
    styles.wrapper,
    className,
    disabled && styles['wrapper-disabled']
  );

  const labelClasses = classNames(
    styles.label,
    (innerValue !== '' || focus) && styles['label-collapsed']
  );

  const arrowClasses = classNames(
    styles.arrow,
    focus && styles['arrow-toggled']
  );

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={labelClasses} htmlFor={name}>
          {label}
        </label>
      )}
      <select className={styles.select} onFocus={onSelectFocus} onBlur={onSelectBlur} value={innerValue} {...innerProps}>
        <option hidden label=" " />
        {innerOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <i className={arrowClasses} />
    </div>
  );
});

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
