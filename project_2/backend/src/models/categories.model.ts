import { getModelForClass, prop } from "@typegoose/typegoose";

export class Category {
  @prop()
  name: string;

  @prop()
  explanation: string;

  @prop()
  scoreExplanation: string[];
}

const categoryModel = getModelForClass(Category);
export default categoryModel;
