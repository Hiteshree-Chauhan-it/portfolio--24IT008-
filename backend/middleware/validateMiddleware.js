export const validateTask = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Task title is required and cannot be empty.",
    });
  }
  next();
};

export const validateRegister = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Email is required.",
    });
  }
  if (!password || password.length < 4) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Password must be at least 4 characters long.",
    });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Validation Error: Both email and password are required.",
    });
  }
  next();
};
