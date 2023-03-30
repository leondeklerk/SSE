import { object, string, TypeOf } from "zod";

import { Option } from "../models/question.model";
export interface questionSchema {
  name: string | undefined;
  explanation: string | undefined;
  scoreExplanation: string[] | undefined;
}
