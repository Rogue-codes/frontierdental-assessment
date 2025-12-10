import swaggerJSDoc from 'swagger-jsdoc';


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment Microservice",
      version: "1.0.0",
      description: "A sample payment microservice",
    },
    components: {
      schemas: {
        Payment: {
          type: "object",
          properties: {
            id: { type: "string", example: "uuid" },
            amount: { type: "number", example: 10 },
            currency: { type: "string", example: "USD" },
            description: { type: "string", example: "Test payment" },
            status: {
              type: "string",
              enum: [
                "pending",
                "processing",
                "succeeded",
                "failed",
                "cancelled",
              ],
              example: "pending",
            },
            createdAt: { type: "string", example: "2025-12-10T11:00:00Z" },
            updatedAt: { type: "string", example: "2025-12-10T11:00:00Z" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJSDoc(options);
// export default swaggerSpec;