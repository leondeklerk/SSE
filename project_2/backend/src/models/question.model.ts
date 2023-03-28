import { getModelForClass, prop } from "@typegoose/typegoose";

export class Question {
    @prop()
    text: string

    @prop()
    answerType: string

    @prop()
    explanation: string

    @prop()
    category: string

    @prop()
    options: Option[]

}
export class Option {
    name: number
}

const questionModel = getModelForClass(Question)
export default questionModel