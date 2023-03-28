import { object, string, TypeOf } from "zod";

import { Option } from "../models/question.model";
export interface questionSchema {
  answerType: string | undefined;
  text: string | undefined;
  explanation: string | undefined;
  category: string;
  standaloneQuestion: boolean | undefined;
  compareQuestion: boolean | undefined;
  options: Option[] | undefined;
}
