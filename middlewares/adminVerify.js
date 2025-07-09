const adminMiddleware = (req, res, next) => {
  console.log("🔐 User role in adminMiddleware:", req.user?.role); 

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

export default adminMiddleware;
