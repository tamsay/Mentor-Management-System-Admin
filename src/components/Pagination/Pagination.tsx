import React, { useEffect,useState } from "react";
import ReactPaginate from "react-paginate";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";

import navigateFirst from "@/assets/icons/pagination-left-arrow.svg";
import nextPage from "@/assets/icons/pagination-next-arrow.svg";
import previousPage from "@/assets/icons/pagination-previous-arrow.svg";
import navigateLast from "@/assets/icons/pagination-right-arrow.svg";

function Pagination({
  totalNumberOfPages,
  onPageClick,
  onSizeChange,
  showSizePicker,
  resultPerPage,
  totalNumberOfItems
}) {
  const [pageCount, setPageCount] = useState(totalNumberOfPages);
  const [perPage, setPerPage] = useState(resultPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setPageCount(totalNumberOfPages);
  }, [totalNumberOfPages]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    onPageClick(selectedPage);
    setCurrentPage(selectedPage);
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    onSizeChange(Number(event.target.value));
  };

  const handleFirstPageClick = () => {
    onPageClick(0);
    setCurrentPage(0);
  };

  const handleLastPageClick = () => {
    onPageClick(pageCount - 1);
    setCurrentPage(pageCount - 1);
  };

  return (
    <div className={cx(styles.paginationContainer, "flexRow-fully-centered")}>
      <div className={cx(styles.mainWrapper, "flexRow-fully-centered")}>
        <Image
          onClick={handleFirstPageClick}
          className={cx(styles.icon, currentPage === 0 && styles.disabled)}
          src={navigateFirst}
          alt='navigate first'
        />

        <ReactPaginate
          previousLabel={<Image src={previousPage} alt='previous page' />}
          nextLabel={<Image src={nextPage} alt='previous page' />}
          pageCount={pageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={0}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          disabledClassName={styles.disabled}
          // renderOnZeroPageCount={null}
          pageLabelBuilder={() => (
            <span>
              {1} - {10} of {totalNumberOfItems}
            </span>
          )}
        />

        <Image
          className={cx(styles.icon, currentPage === pageCount - 1 && styles.disabled)}
          onClick={handleLastPageClick}
          src={navigateLast}
          alt='navigate first'
        />
      </div>

      {showSizePicker && (
        <label className={cx(styles.sizePickerLabel, "flexRow")}>
          <select value={perPage} onChange={handlePerPageChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </label>
      )}
    </div>
  );
}

Pagination.propTypes = {
  totalNumberOfPages: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func,
  showSizePicker: PropTypes.bool,
  resultPerPage: PropTypes.number,
  totalNumberOfItems: PropTypes.number
};

Pagination.defaultProps = {
  onPageClick: () => {},
  showSizePicker: false,
  resultPerPage: 10,
  totalNumberOfPages: 1,
  totalNumberOfItems: 20
};

export default Pagination;
