import container from 'src/container';
import useSWR from 'swr';

const {
    cradle: { reportService },
} = container;

export const useReport = () => {
    return useSWR(
        [`report/all`],
        reportService.APIgetAllReport.bind(reportService),
    );
};
