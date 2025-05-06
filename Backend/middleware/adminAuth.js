export const adminLogin = (req, res) => {
    const { email, password } = req.body;
  
    if (
      email === 'awanthaimesh65@gmail.com' &&
      password === 'Awantha65@'
    ) {
      return res.status(200).json({ success: true, token: 'ADMIN_SECRET_TOKEN' });
    }
  
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  };
  
  export const isAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (token === 'Bearer ADMIN_SECRET_TOKEN') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  };
  