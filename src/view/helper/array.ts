import * as _ from 'lodash';

export function removeElementFromArray(array: string[], element: string): void {
    _.remove(array, function(e) {
        return e === element;
    });
}
// The function needs to pass 2 parameters,
// the old array and the new array,
// and then process it to find out which elements to delete and which elements to add.
export function filterElementAddOrRemove(oldArr: string[], newArr: string[]) {
    oldArr.map(oldElement => {
        newArr.map(newElement => {
            if (oldElement === newElement) {
                removeElementFromArray(oldArr, oldElement);
                removeElementFromArray(newArr, newElement);
            }
        });
    });
    return {
        removeItems: oldArr,
        addItems: newArr,
    };
}
