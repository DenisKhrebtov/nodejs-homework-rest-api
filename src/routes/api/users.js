const express = require('express');
const { validateBody, validateToken, upload } = require('../../middleware');
const { authUserSchema, updateSubSchema } = require('../../schemas/joi/users');
const { asyncWrapper } = require('../../helpers');
const {
  signup,
  login,
  logout,
  getUserData,
  updateSubscription,
  uploadAvatar,
} = require('../../controllers/users');

const usersRouter = express.Router();

usersRouter.post('/signup', validateBody(authUserSchema), asyncWrapper(signup));
usersRouter.post('/login', validateBody(authUserSchema), asyncWrapper(login));
usersRouter.post('/logout', validateToken(), asyncWrapper(logout));
usersRouter.get('/current', validateToken(), asyncWrapper(getUserData));
usersRouter.patch(
  '/',
  validateToken(),
  validateBody(updateSubSchema),
  asyncWrapper(updateSubscription)
);
usersRouter.patch(
  '/avatars',
  validateToken(),
  upload.single('avatar'),
  asyncWrapper(uploadAvatar)
);

module.exports = usersRouter;