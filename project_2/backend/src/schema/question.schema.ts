import { object, string, TypeOf } from 'zod';

import { Option } from '../models/question.model';
export interface questionSchema {
    answerType: string | undefined;
    text: string | undefined;
    category: string;
    options: Option[] | undefined;
}



