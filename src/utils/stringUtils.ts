import { addSeconds, format } from 'date-fns';
import { User } from 'src/domain/user';

export const formatTimeDuration = (seconds: number): string => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
};

export const getLastName = (user?: User): string => {
    if (!user) return '';
    return user.name.split(' ').slice(-1)[0];
};
