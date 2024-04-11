import React from "react";

interface PaginationProps {
  totalPosts: number;
  currentPage: number;
  postsPerPage: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPosts,
  currentPage,
  postsPerPage,
  goToPrevPage,
  goToNextPage,
  goToPage,
}) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const className = "Dashboard__MainPosts__Pagination";

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const currentPageIndex = Math.min(
        Math.max(currentPage - 1, 0),
        totalPages - 3
      );
      for (let i = currentPageIndex; i < currentPageIndex + 3; i++) {
        pageNumbers.push(i + 1);
      }
      if (currentPageIndex + 3 < totalPages) {
        pageNumbers.push(-1);
      }
    }
    return pageNumbers;
  };

  const renderPageButtons = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber, index) => (
      <React.Fragment key={index}>
        {pageNumber === -1 ? (
          <button
            className="h-7 w-7 tablet:h-12 tablet:w-12 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] tablet:text-base font-medium uppercase text-[#000] dark:text-[#fff] transition-all"
            disabled
          >
            ...
          </button>
        ) : (
          <button
            className={`${
              pageNumber === currentPage
                ? "bg-green text-[#fff]"
                : "bg-[#3a684133] bg-opacity-20"
            } relative h-7 w-7 tablet:h-12 tablet:w-12 select-none rounded-md text-center align-middle text-[10px] tablet:text-base font-medium uppercase text-[#000] dark:text-[#fff] hover:dark:bg-fresh-green transition-all`}
            onClick={() => goToPage(pageNumber)}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {pageNumber}
            </span>
          </button>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className={className + " " + "flex gap-1"}>
      {currentPage > 1 && (
        <button
          className="h-7 tablet:h-12 px-1 tablet:px-4 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] tablet:text-base font-medium text-[#000] dark:text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2)]"
          onClick={goToPrevPage}
        >
          Prev...
        </button>
      )}

      {renderPageButtons()}

      {currentPage < totalPages && (
        <button
          className={`h-7 tablet:h-12 px-1 tablet:px-4 select-none rounded-md bg-[#3A684133] bg-opacity-20 text-center align-middle text-[10px] tablet:text-base font-medium text-[#000] dark:text-[#fff] transition-all hover:bg-[rgb(17 24 39 / 0.2)] active:bg-[rgb(17 24 39 / 0.2)]`}
          onClick={goToNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
