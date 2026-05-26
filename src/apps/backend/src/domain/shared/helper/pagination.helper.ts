export class PaginationHelper {
  static paginate<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } {
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static skip(page: number, limit: number): number {
    return (page - 1) * limit;
  }
}
