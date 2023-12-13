import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import {
  handleChange,
  clearFilters,
  getAllJobs,
} from "../features/allJobs/allJobsSlice";
import { useMemo, useState } from "react";

const SearchContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { statusOptions, jobTypeOptions } = useSelector((store) => store.job);

  const [localSearch, setLocalSearch] = useState("");

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeout;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = () => {
    setLocalSearch("");
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            list={["all", ...statusOptions]}
            handleChange={handleSearch}
          />

          {/* search by type */}
          <FormRowSelect
            labelText="job type"
            name="searchType"
            value={searchType}
            list={["all", ...jobTypeOptions]}
            handleChange={handleSearch}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />

          <button
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
