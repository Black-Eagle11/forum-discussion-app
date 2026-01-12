import PropTypes from 'prop-types';

function Button({
  children,
  type = 'button',
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        border: '1px solid #d1d5db',
        backgroundColor: disabled ? '#e5e7eb' : '#2563eb',
        color: disabled ? '#6b7280' : '#ffffff',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  onClick: undefined,
  disabled: false,
};

export default Button;
