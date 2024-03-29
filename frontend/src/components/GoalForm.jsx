import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";
import { toast } from "react-hot-toast";
const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    if (text.length === 0 || text !== text.trim()) return toast.error("Goal shouldn't be empty");

    dispatch(createGoal({ text }));
    setText("");
  };
  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Goal
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
