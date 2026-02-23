export default function Pagination(props: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const { totalPages, currentPage, onPageChange } = props;

  // Tính toán các trang cần hiển thị
  const getPageNumbers = () => {
    const delta = 2; // Số trang hiển thị xung quanh trang hiện tại
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <nav className="flex items-center justify-center py-5">
        <ul className="inline-flex -space-x-px text-sm">
          {/* First Button */}
          <li>
            <button
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">First</span>
              ‹‹ Trang đầu
            </button>
          </li>

          {/* Back Button */}
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>‹ Quay lại
            </button>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((page, index) => (
            <li key={index}>
              {page === "..." ? (
                <span className="flex items-center justify-center px-3 py-2 text-gray-500 bg-white border border-gray-300">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`flex items-center justify-center px-3 py-2 border border-gray-300 ${
                    currentPage === page
                      ? "bg-blue-50 text-blue-600 border-blue-300"
                      : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 py-2 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              Tiếp ›
            </button>
          </li>

          {/* Last Button */}
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-3 py-2 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Last</span>
              Cuối ››
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
