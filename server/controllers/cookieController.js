const { v4: uuidv4 } = require('uuid');

const cookieController = {};

cookieController.getUser = (req, res, next) => {
  let user_id = undefined;
  if (!req.cookies.user_id) {
    user_id = uuidv4();
    res.locals.user_id = user_id;
    res.cookie('user_id', user_id);
  } else {
    user_id = req.cookies.user_id;
  }
  res.locals.user_id = user_id;
  return next();
}

module.exports = cookieController;