import app from "./app";
import logger from "./utils/logger";

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Payment microservice listening on port ${PORT}`);
  logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
