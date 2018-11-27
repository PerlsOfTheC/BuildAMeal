const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user.model");

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string()
    .required()
    .valid(Joi.ref("password")),
  myRecipes:[Joi.string()]
});

module.exports = {
  insert,
  saveRecipes,
  deleteRecipes
};

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}
function saveRecipes(user, url) {
  let usr = new User(user);
  usr.myRecipes.push(url)
}

function deleteRecipes(user, url) {
  let usr = new User(user);
  usr.myRecipes.pop(url)
}
