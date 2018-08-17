exports.tokenMiddleware = function(req, res, next) { //Middleware to verify the token in order to grant access to sensitive data
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
      }
    
      let token = req.headers.authorization.split(' ')[1];
      if (token === 'null') {
        return res.status(401).send('Unauthorized');
      }
    
      //Check if the provided token in the request registered in the API server, and not just a fake one 
      let payload = jwt.verify(token, 'myStaticKey');
      if(!payload) {
        return res.status(401).send('Unauthorized');
      }
    
      req.userId = payload.subject;
      next();
};