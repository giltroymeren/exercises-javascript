import mongoose from "mongoose";
import { times as _times } from "lodash";
import { DataTypes, Sequelize } from "sequelize";
import casual from "casual";

const SCHEMA_NAME_WIDGETS = "widgets";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${SCHEMA_NAME_WIDGETS}`, {
  useNewUrlParser: true,
});

const widgetSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  issouldout: String,
  inventory: Number,
  stores: Array,
});

const WidgetModel = mongoose.model(SCHEMA_NAME_WIDGETS, widgetSchema);

const sequelize = new Sequelize("sqlite::memory");
const CategoriesModel = sequelize.define("categories", {
  category: DataTypes.STRING,
  description: DataTypes.STRING,
});

CategoriesModel.sync({ force: true }).then(() => {
  _times(5, (i) => {
    CategoriesModel.create({
      category: casual.word,
      description: casual.sentence,
    });
  });
});

export { WidgetModel, CategoriesModel };
