import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";
import StatItem from "./StatItem";
import { nanoid } from "nanoid";

const StatsContainer = () => {
  const { status } = useSelector((store) => store.allJobs);

  const defaultStats = [
    {
      title: "pending applications",
      count: status.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: status.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: status.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item) => (
        <StatItem key={nanoid()} {...item} />
      ))}
    </Wrapper>
  );
};
export default StatsContainer;
