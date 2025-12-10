import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    error: { message: err.message || "Internal Server Error" },
  });
}
