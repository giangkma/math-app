import container from 'src/container';
import { QuestionType } from 'src/domain/question';
import useSWR from 'swr';

const {
    cradle: { questionsService },
} = container;

export const useQuestions = (className: string, chapter: string) => {
    return useSWR(
        [className, chapter, `questions/className&chapter`],
        questionsService.APIfetchListQuestions.bind(questionsService),
    );
};

const onFetchOneQuestion = async (
    id: string | undefined,
): Promise<QuestionType | undefined> => {
    if (!id) return;
    const res = await questionsService.APIfetchOneQuestion(id);
    return res;
};

export const useQuestion = (id: string | undefined) => {
    return useSWR([id, `questions/id`], onFetchOneQuestion);
};
