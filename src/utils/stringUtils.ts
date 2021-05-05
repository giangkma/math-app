import { addSeconds, format } from 'date-fns';

export const formatTimeDuration = (seconds: number): string => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
};
