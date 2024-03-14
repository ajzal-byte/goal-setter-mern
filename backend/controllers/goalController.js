// @desc Get goals
// @route GET /api/goals
// @acess Private
const getGoals = (req, res) => {
  // res.status(200).json({message: "Get goals"});
  console.log(req.body);
};

// @desc Set goal
// @route POST /api/goals
// @acess Private
const setGoal = (req, res) => {
  res.status(200).json({ message: "Set goal" });
};

// @desc Update goal
// @route PUT /api/goals/:id
// @acess Private
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update goal: ${req.params.id}` });
};

// @desc Delete goal
// @route DELETE /api/goals/:id
// @acess Private
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goal: ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
