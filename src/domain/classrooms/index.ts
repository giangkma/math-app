export interface Classrooms {
    id: string | number;
    nameClass: string;
    imageClass: string;
}

export interface GetExerciseTypes {
    pageSize?: number;
    status?: string;
    pageIndex?: number;
    search?: string;
}

export interface QueryQuestions {
    className: string;
    chapter?: string;
}
