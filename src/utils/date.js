function formatDate(isoDate) {
  const date = new Date(isoDate);

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export { formatDate };
