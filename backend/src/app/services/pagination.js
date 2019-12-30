export function calculateLimitAndOffset(page, limit = 5) {
  return {
    limit,
    offset: (page - 1) * limit,
  };
}

export function paginate(page, count, rows, limit) {
  return {
    totalItems: count,
    rows,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  };
}
