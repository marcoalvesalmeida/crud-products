import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    const response = {};
    const ERROR_CREATE = 'The user could not be created.';
    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          success: false,
          message: 'Validation fails',
          user: req.body,
        });
      }

      const { id, name, email } = await User.create(req.body);

      if (id) {
        response.success = true;
        response.message = 'User created successfully.';
        response.user = { id, name, email };
      } else {
        response.success = false;
        response.message = ERROR_CREATE;
      }
    } catch (err) {
      response.success = false;
      response.message = ERROR_CREATE;
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }
}

export default new UserController();
