function Avatar({ src, alt = 'Avatar', size = 32, name = '' }) {
  const initials = name
    ? name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div
      aria-label={alt}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#e5e7eb',
        color: '#374151',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;
