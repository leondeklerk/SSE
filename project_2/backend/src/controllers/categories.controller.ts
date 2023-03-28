import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";
import categoriesModel from "../models/categories.model";
import questionModel, { Question } from "../models/question.model";
import { questionSchema } from "../schema/question.schema";

export const getAllCategoriesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoriesModel.find();
    res.status(200).json({
      status: "success",
      result: categories.length,
      data: {
        categories,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// export const addQuestionHandler = async (
//     req: Request<{}, {}, questionSchema>,
//     res: Response,
//     next: NextFunction
// ) => {
//     {
//         try {
//             console.log(req)
//             const question = await createQuestion({
//                 answerType: req.body.answerType,
//                 text: req.body.text,
//                 explanation: req.body.explanation,
//                 category: req.body.category,
//                 options: req.body.options,

//             });
//             res.status(201).json({
//                 status: 'succes',
//                 data: {
//                     question,
//                 }
//             });
//         }
//         catch (err: any) {
//             next(err);
//         }
//     }
// }

// export const createQuestion = async (input: Partial<Question>) => {
//     const question = await questionModel.create(input);
//     return question.toJSON();
// };
