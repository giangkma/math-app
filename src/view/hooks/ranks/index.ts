import container from 'src/container';
import useSWR from 'swr';

const {
    cradle: { ranksService },
} = container;

export const useRanks = (className: string) => {
    return useSWR(
        [className, `ranks/className`],
        ranksService.APIfetchRanks.bind(ranksService),
    );
};
