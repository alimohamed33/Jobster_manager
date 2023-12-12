import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const dispatch = useDispatch();
  const { page, numOfPages } = useSelector((store) => store.allJobs);
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1;
    dispatch(changePage(newPage));
  };
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) newPage = 1;
    dispatch(changePage(newPage));
  };

  return (
    <Wrapper>
      {page > 1 && (
        <button type="button" className="prev-btn" onClick={prevPage}>
          <HiChevronDoubleLeft />
          Prev
        </button>
      )}

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type="button"
              key={nanoid()}
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {page < numOfPages && (
        <button type="button" className="next-btn" onClick={nextPage}>
          Next
          <HiChevronDoubleRight />
        </button>
      )}
    </Wrapper>
  );
};
export default PageBtnContainer;
