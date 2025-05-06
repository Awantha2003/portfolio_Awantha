export const authenticateAdmin = (req, res, next) => {
    const { email, password } = req.body;
  
    if (email === 'awanthaimesh65@gmail.com' && password === 'Awantha65@') {
      next(); // Allow access
    } else {
      res.status(401).json({ message: 'Unauthorized. Only admin can access.' });
    }
  };
  