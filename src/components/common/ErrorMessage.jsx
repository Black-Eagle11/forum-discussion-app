function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      style={{
        padding: '0.75rem 1rem',
        margin: '1rem 0',
        borderRadius: '4px',
        backgroundColor: '#fee2e2',
        color: '#991b1b',
        border: '1px solid #fecaca',
      }}
    >
      {message}
    </div>
  );
}

export default ErrorMessage;
