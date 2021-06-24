import { addSeconds, format } from 'date-fns';

interface NameUser {
    name: string;
}

export const formatTimeDuration = (seconds: number): string => {
    const helperDate = addSeconds(new Date(0), seconds);
    return format(helperDate, 'mm:ss');
};

export const getLastName = (item: NameUser): string => {
    return item.name.split(' ').slice(-1)[0];
};

export const getInitialName = (item: NameUser): string => {
    const arrName = item.name.split(' ');
    if (arrName.length === 1) return arrName[0][0];
    return `${arrName[arrName.length - 2][0]}${arrName[arrName.length - 1][0]}`;
};
