import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../models/User';

dotenv.config();

class SessionController {
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });
    const response = {};

    try {
      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ success: false, message: 'Validation fails' });
      }

      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'User not found' });
      }

      if (!(await user.chekckPassword(password))) {
        return res
          .status(401)
          .json({ success: false, message: 'Password does not match' });
      }

      const { id, name, avatar, provider } = user;

      response.success = true;
      response.message = 'Session created successfully.';
      response.user = {
        id,
        name,
        email,
        provider,
        avatar,
      };
      response.token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });
    } catch (err) {
      response.success = false;
      response.message = 'The session could not be created.';
      response.error = err;
    }

    return res.status(response.success ? 200 : 400).json(response);
  }
}

export default new SessionController();
