import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showState } from "../../features/allJobs/allJobsSlice";
import { Loading, StatsContainer, ChartsContainer } from "../../components";

const Status = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );

  useEffect(() => {
    dispatch(showState());
  }, []);

  if (isLoading) return <Loading center />;

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Status;
