const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const body = req.body;
  for (let key in body) {
    switch (key) {
      case "first_name":
        await User.findByIdAndUpdate(req.params.id, { firstName: body[key] });
        break;
      case "last_name":
        await User.findByIdAndUpdate(req.params.id, { lastName: body[key] });
        break;
      case "email":
        await User.findByIdAndUpdate(req.params.id, { email: body[key] });
        break;
      case "job_title":
        await User.findByIdAndUpdate(req.params.id, { jobTitle: body[key] });
        break;
      case "gender":
        await User.findByIdAndUpdate(req.params.id, { gender: body[key] });
        break;
      default:
        return res.status(400).json({ msg: "Wrong field" });
    }
  }
  return res.status(200).json({ msg: "Success" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "Success" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..." }); // 400 - Bad response
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
