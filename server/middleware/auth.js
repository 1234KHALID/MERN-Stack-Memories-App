const jwt = require('jsonwebtoken');
const secret = 'test';

exports.auth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ');
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.indexOf;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}