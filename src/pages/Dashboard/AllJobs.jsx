import { useSelector } from "react-redux";
import { JobsContainer, SearchContainer } from "../../components";
import PageBtnContainer from "../../components/PageBtnContainer";

const AllJobs = () => {
  const { numOfPages } = useSelector((store) => store.allJobs);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
      {numOfPages > 1 && <PageBtnContainer />}
    </>
  );
};
export default AllJobs;
