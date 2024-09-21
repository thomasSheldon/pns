import PropTypes from 'prop-types';

const Button = ({ color, textColor, width, children, className, type }) => {
  return (
    <button
      type={type}
      style={{ backgroundColor: color, color: textColor, width }}
      className={`px-4 py-2 rounded-full focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  color: '#007bff', // default button color
  textColor: '#ffffff', // default text color
  width: 'auto', // default width
  className: '',
  type: 'button',
};

export default Button;
