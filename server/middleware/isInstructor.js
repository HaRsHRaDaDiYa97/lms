const isInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Only instructors can perform this action' });
  }
  next();
};

export default isInstructor;


