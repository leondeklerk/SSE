import { getModelForClass, prop } from "@typegoose/typegoose";

export class Question {
  @prop()
  text: string;

  @prop()
  answerType: string;

  @prop()
  explanation: string;

  @prop()
  category: string;

  @prop()
  standaloneQuestion: boolean | undefined;

  @prop()
  compareQuestion: boolean | undefined;

  @prop()
  options: Option[];
}
export class Option {
  value: string | boolean;
  score: number;
}

const questionModel = getModelForClass(Question);
export default questionModel;
