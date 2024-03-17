import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GoalForm } from "../components";
import { Spinner } from "../components";
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (!user) navigate("/login");

    if (isError) console.log(message);


    dispatch(getGoals());

    return () => dispatch(reset)
  }, [user, navigate, isError, message, dispatch]);

  if(isLoading) return <Spinner/>

  return (
    <>
      <section>
        <h1>Welcome welcome welcome {user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
    </>
  );
};

export default Dashboard;
