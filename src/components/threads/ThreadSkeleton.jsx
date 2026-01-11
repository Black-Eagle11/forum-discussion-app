function ThreadSkeleton() {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        marginBottom: '1rem',
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          width: '40%',
          height: '12px',
          backgroundColor: '#e5e7eb',
          marginBottom: '0.75rem',
          borderRadius: '4px',
        }}
      />

      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: '#e5e7eb',
          marginBottom: '0.5rem',
          borderRadius: '4px',
        }}
      />

      <div
        style={{
          width: '90%',
          height: '10px',
          backgroundColor: '#e5e7eb',
          marginBottom: '1rem',
          borderRadius: '4px',
        }}
      />

      <div
        style={{
          width: '30%',
          height: '10px',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
        }}
      />
    </div>
  );
}

export default ThreadSkeleton;
