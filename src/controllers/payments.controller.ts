import { Request, Response, NextFunction } from "express";
import PaymentService from "../services/payment.service";

export async function createPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { amount, currency, description } = req.body;
    const payment = await PaymentService.createPayment(
      Number(amount),
      currency,
      description
    );
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
}

export async function getPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const payment = await PaymentService.getPayment(req.params.id);
    res.json(payment);
  } catch (err) {
    next(err);
  }
}

export async function updatePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: "status is required" });
    const p = await PaymentService.updatePaymentStatus(req.params.id, status);
    res.json(p);
  } catch (err) {
    next(err);
  }
}
