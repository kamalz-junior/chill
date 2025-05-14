export function formatCurrency(price, currency) {
  return new Intl.NumberFormat("in-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}

export function tmdbImage(path, type = "original") {
  return `https://image.tmdb.org/t/p/${type}/${path}`;
}
