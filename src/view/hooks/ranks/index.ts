import container from 'src/container';
import useSWR from 'swr';

const {
    cradle: { ranksService },
} = container;

export const useRanks = (
    className: string,
    pageIndex?: number,
    pageSize?: number,
) => {
    const { data, error } = useSWR(
        [className, `ranks/className`],
        ranksService.APIfetchRanks.bind(ranksService),
    );
    const newData =
        data &&
        data.map((item, index) => {
            return {
                ...item,
                order: index + 1,
            };
        });
    let result;
    if (pageIndex && pageSize) {
        result =
            newData &&
            newData.slice(pageSize * (pageIndex - 1), pageSize * pageIndex);
    } else result = newData;

    return {
        data: result,
        total: newData && newData.length,
        error,
    };
};
