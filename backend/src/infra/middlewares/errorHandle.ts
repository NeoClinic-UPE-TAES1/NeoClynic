import { Request, Response, NextFunction } from "express";
import { AppError } from "../../core/errors/AppError";
import { ZodError } from "zod";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.issues,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({
    message: "Internal server error",
  });
}
