import * as R from 'ramda';
interface ObjectWithId {
    id: string | number;
}

export const checkDuplicatesWithId = (
    id: string | number,
    array: ObjectWithId[],
): boolean => {
    return R.find(R.propEq('id', id))(array) ? true : false;
};

export const removeElementWithId = <T extends ObjectWithId>(
    id: string | number,
    array: T[],
): T[] => {
    return R.reject(o => o.id == id, array);
};

export const swapArrayElements = <T>(
    arr: Array<T>,
    firstIndex: number,
    secondIndex: number,
): Array<T> => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];

    return arr;
};
