export interface QuestionType {
    id: string;
    question: string;
    answer: string[];
    className: string;
    correctAnswer: string;
    chapter?: string;
}

export interface Chapter {
    id: string;
    name: string;
}

export interface QuestionForm {
    question: string;
    indexCorrectAnswer: string;
    answerA: string;
    answerB: string;
    answerC?: string;
    answerD?: string;
}

export interface QuestionPayload {
    answer: string[];
    question: string;
    className?: string;
    correctAnswer: string;
    chapter?: string;
}

export const questionPayload = (
    data: QuestionForm,
    chapter: string,
    className?: string,
): QuestionPayload => {
    const {
        answerA,
        answerB,
        answerC,
        answerD,
        question,
        indexCorrectAnswer,
    } = data;
    const answer = [answerA, answerB];
    if (!!answerC) answer.push(answerC);
    if (!!answerD) answer.push(answerD);
    return {
        answer,
        question,
        correctAnswer: answer[Number(indexCorrectAnswer)],
        className: className || undefined,
        chapter,
    };
};
