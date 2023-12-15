import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Product {
    id: ID
    name: String
    description: String
    price: Float
    issoldout: Soldout
    inventory: Int
    stores: [Store]!
  }  

  enum Soldout {
    SOLDOUT
    ONSALE
  }

  type Store {
    id: ID
    name: String
  }

  input ProductInput {
    id: ID
    name: String
    description: String
    price: Float
    issoldout: Soldout
    inventory: Int
    stores: [StoreInput]!
  }

  input StoreInput {
    id: ID
    name: String
  }

  type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(input: ProductInput): Product
    deleteProduct(id: ID): String
  }

  type Query {
    getProductById(id: ID): Product
    getAllProducts: [Product]
  }
`);

export default schema;
