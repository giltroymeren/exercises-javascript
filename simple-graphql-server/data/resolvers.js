import { WidgetModel } from "./dbConnectors";

const handleError = (error) => console.error(error);

const resolvers = {
  getProductById: async ({ id }) =>
    await WidgetModel.findById(id).exec().catch(handleError),
  getAllProducts: async () =>
    await WidgetModel.find({}).exec().catch(handleError),
  createProduct: async ({ input }) =>
    await WidgetModel.create({
      name: input.name,
      description: input.description,
      price: input.price,
      issouldout: input.issouldout,
      inventory: input.inventory,
      stores: input.stores,
    }).catch(handleError),
  updateProduct: async ({ input }) =>
    await WidgetModel.findOneAndUpdate({ _id: input.id }, input, {
      new: true,
    }).catch(handleError),
  deleteProduct: async ({ id }) =>
    await WidgetModel.deleteOne({ _id: id })
      .then(() => "Deleted product")
      .catch(handleError),
};

export default resolvers;
