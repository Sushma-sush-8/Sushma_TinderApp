const validator = require('validator');

const validateUser = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if(!firstName || !lastName){
    throw new Error ("Please enter valid name");
  } else if(!validator.isEmail(emailId)){
    throw new Error("Invalid email id");
  } else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password");
  };
};

module.exports = {
    validateUser
}
