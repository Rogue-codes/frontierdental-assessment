import fs from 'fs/promises';
import path from 'path';
import { Payment } from '../models/payment';


const DATA_FILE = path.join(process.cwd(), 'data', 'payments.json');


export default class PaymentRepository {
  // private async readAll(): Promise<Payment[]> {
  // try {
  // const raw = await fs.readFile(DATA_FILE, 'utf-8');
  // return JSON.parse(raw) as Payment[];
  // } catch (err) {
  // if ((err as any).code === 'ENOENT') {
  // await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  // await fs.writeFile(DATA_FILE, JSON.stringify([]));
  // return [];
  // }
  // throw err;
  // }
  // }

  private async readAll(): Promise<Payment[]> {
    try {
      let raw = await fs.readFile(DATA_FILE, "utf-8");
      if (!raw) raw = "[]"; // <-- handle empty file
      return JSON.parse(raw) as Payment[];
    } catch (err) {
      if ((err as any).code === "ENOENT") {
        await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
        await fs.writeFile(DATA_FILE, "[]"); // create file with empty array
        return [];
      }
      throw err;
    }
  }

  private async writeAll(payments: Payment[]) {
    await fs.writeFile(DATA_FILE, JSON.stringify(payments, null, 2));
  }

  async create(payment: Payment) {
    const list = await this.readAll();
    list.push(payment);
    await this.writeAll(list);
    return payment;
  }

  async findById(id: string) {
    const list = await this.readAll();
    return list.find((p) => p.id === id) || null;
  }

  async update(id: string, patch: Partial<Payment>) {
    const list = await this.readAll();
    const idx = list.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...patch } as Payment;
    await this.writeAll(list);
    return list[idx];
  }
}