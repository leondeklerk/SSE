import { Request, Response, NextFunction } from "express";
import { omit } from "lodash";
import questionModel, { Question } from "../models/question.model";
import { questionSchema } from "../schema/question.schema";

export const getAllQuestionsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const questions = await questionModel.find();
        res.status(200).json({
            status: 'succes',
            result: questions.length,
            data: {
                questions,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const addQuestionHandler = async (
    req: Request<{}, {}, questionSchema>,
    res: Response,
    next: NextFunction
) => {
    {
        try {
            console.log(req)
            const question = await createQuestion({
                answerType: req.body.answerType,
                text: req.body.text,
                explanation: req.body.explanation,
                category: req.body.category,
                options: req.body.options,

            });
            res.status(201).json({
                status: 'succes',
                data: {
                    question,
                }
            });
        }
        catch (err: any) {
            next(err);
        }
    }
}


export const createQuestion = async (input: Partial<Question>) => {
    const question = await questionModel.create(input);
    return question.toJSON();
};