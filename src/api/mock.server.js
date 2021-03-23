import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 0;
      this.resource("products");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.random.uuid(),
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          inStock: faker.random.boolean(),
          fastDelivery: faker.random.boolean()
        });
      });
    }
  });
}
