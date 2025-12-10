import { Request, Response, Router } from 'express';
import * as controller from '../controllers/payments.controller';

const router = Router();

/**
 * @openapi
 * /api/payments:
 *   get:
 *     summary: Root endpoint
 *     description: Returns a Hello World message
 *     responses:
 *       200:
 *         description: Hello World response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World
 */
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

/**
 * @openapi
 * /api/payments:
 *   post:
 *     summary: Create a payment
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 10
 *               currency:
 *                 type: string
 *                 example: USD
 *               description:
 *                 type: string
 *                 example: Test payment
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
router.post("/", controller.createPayment);

/**
 * @openapi
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
router.get("/:id", controller.getPayment);

/**
 * @openapi
 * /api/payments/{id}:
 *   patch:
 *     summary: Update payment status
 *     tags:
 *       - Payments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, succeeded, failed, cancelled]
 *                 example: succeeded
 *     responses:
 *       200:
 *         description: Updated payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 */
router.patch("/:id", controller.updatePayment);

export default router;