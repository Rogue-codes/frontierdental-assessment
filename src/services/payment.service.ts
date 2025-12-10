import { v4 as uuidv4 } from "uuid";
import { Payment, PaymentStatus } from "../models/payment";
import PaymentRepository from "../repository/payment.repository";
import { simulateProcessing } from "../utils/asyncSimulator";
import logger from "../utils/logger";

const repo = new PaymentRepository();

export default class PaymentService {
  static async createPayment(
    amount: number,
    currency = "USD",
    description?: string
  ): Promise<Payment> {
    if (amount <= 0)
      throw { status: 400, message: "Amount must be greater than 0" };

    const now = new Date().toISOString();
    const payment: Payment = {
      id: uuidv4(),
      amount,
      currency,
      description,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    await repo.create(payment);

    // start async processing but don't await (fire-and-forget simulation)
    PaymentService.processPayment(payment.id).catch((err) =>
      logger.error(`Processing failed for ${payment.id}: ${err}`)
    );

    return payment;
  }

  static async getPayment(id: string) {
    const payment = await repo.findById(id);
    if (!payment) throw { status: 404, message: "Payment not found" };
    return payment;
  }

  static async updatePaymentStatus(id: string, status: PaymentStatus) {
    const payment = await repo.findById(id);
    if (!payment) throw { status: 404, message: "Payment not found" };
    const updated = await repo.update(id, {
      status,
      updatedAt: new Date().toISOString(),
    });
    return updated;
  }

  static async processPayment(id: string) {
    // simulate processing steps
    await repo.update(id, {
      status: "processing",
      updatedAt: new Date().toISOString(),
    });

    // simulate async outcome
    return simulateProcessing(async () => {
      const success = Math.random() > 0.2; // 80% chance success
      const status: PaymentStatus = success ? "succeeded" : "failed";
      await repo.update(id, { status, updatedAt: new Date().toISOString() });
      return status;
    });
  }
}
