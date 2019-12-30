import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const findUser = await User.findOne({ where: { email } });

    if (!findUser) {
      return res.status(401).json({
        error: 'Usuário/Senha incorretos!',
      });
    }

    if (!(await findUser.checkPassword(password))) {
      return res.status(401).json({
        error: 'Usuário/Senha incorretos!',
      });
    }

    const { id } = findUser;
    const access_token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expires_in,
    });
    return res.json({
      email,
      access_token,
      user: findUser,
    });
  }
}

export default new SessionController();
