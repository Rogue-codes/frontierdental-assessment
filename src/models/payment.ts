export type PaymentStatus = 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled';


export interface Payment {
id: string;
amount: number;
currency: string;
description?: string;
status: PaymentStatus;
createdAt: string;
updatedAt: string;
}