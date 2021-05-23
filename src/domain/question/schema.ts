import * as yup from 'yup';

export const questionFormSchema = yup.object({
    question: yup.string().required('Hãy nhập câu hỏi'),
    answerA: yup.string().required('Hãy đáp án A'),
    answerB: yup.string().required('Hãy đáp án B'),
    answerC: yup.string().required('Hãy đáp án C'),
    answerD: yup.string().required('Hãy đáp án D'),
    indexCorrectAnswer: yup.string(),
});

export type QuestionFormSchema = yup.InferType<typeof questionFormSchema>;
