import container from 'src/container';
import useSWR from 'swr';

const {
    cradle: { questionsService },
} = container;

export const useQuestions = (className: string) => {
    return useSWR(
        [className, `questions/className`],
        questionsService.APIfetchListQuestions.bind(questionsService),
    );
};
