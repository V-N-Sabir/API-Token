import jwt from 'jsonwebtoken'
import key from './keys/keys.dev.js'


//async function validateRefreshToken(token) {
//    try {
//          const userData = jwt.verify(token, key.TOKEN_KEY); //jwt-secret-key - ключ
//          return userData;
//      } catch (e) {
//         return null;
//      }
//  }


export default (req, res, next) => {

   
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded = jwt.verify(token, key.TOKEN_KEY); //jwt-secret-key - ключ

      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: 'Нет доступа',
      });
    }
  } else {
    return res.status(403).json({
      message: 'Нет доступа',
    });
  }
};

 //export default validateRefreshToken 