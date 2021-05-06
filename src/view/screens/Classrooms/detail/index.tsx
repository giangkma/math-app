/* eslint-disable react/jsx-wrap-multilines */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
    CloseIconSVG,
    PersonIconSVG,
    TickGreenIconSVG,
    WarningIconSVG,
} from 'src/assets/svg';
import container from 'src/container';
import { QuestionType } from 'src/domain/question';
import { Alert } from 'src/view/components/alert';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { useQuestions } from 'src/view/hooks/questions';
import { Theme1 } from 'src/view/layout/components/Theme1';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { Screen } from 'src/view/routes/Router';

type ParamType = {
    className: string;
};

const useCheckQuestion = () => {
    const [answerSelected, setAnswerSelected] = useState<string | undefined>(
        undefined,
    );
    const [sum, setSum] = useState<number>(1);
    const [isCheckedAnswer, setIsCheckedAnswer] = useState<boolean>(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState<boolean>(false);
    return {
        answerSelected,
        setAnswerSelected,
        sum,
        setSum,
        isCheckedAnswer,
        setIsCheckedAnswer,
        isCorrectAnswer,
        setIsCorrectAnswer,
        correctAnswer,
        setCorrectAnswer,
        loading,
        setLoading,
    };
};

const initialQuestion = {
    _id: '',
    question: '',
    answer: [],
    className: '',
    correctAnswer: '',
};

const {
    cradle: { questionsService },
} = container;

export const ClassroomDetail: FC<{}> = () => {
    const { className } = useParams<ParamType>();
    const [question, setQuestion] = useState<QuestionType>(initialQuestion);
    const {
        answerSelected,
        setAnswerSelected,
        sum,
        setSum,
        isCheckedAnswer,
        setIsCheckedAnswer,
        isCorrectAnswer,
        setIsCorrectAnswer,
        correctAnswer,
        setCorrectAnswer,
        loading,
        setLoading,
    } = useCheckQuestion();

    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const { data: questions, isValidating, error } = useQuestions(className);

    const onRandomQuestion = useCallback((): void => {
        if (!questions) return;
        const indexQuestion = Math.floor(Math.random() * questions.length);
        setQuestion(questions[indexQuestion]);
        setIsCheckedAnswer(false);
        setAnswerSelected(undefined);
    }, [questions, setAnswerSelected, setIsCheckedAnswer]);

    const onSelectAnswer = (answer: string): void => {
        setAnswerSelected(answer);
    };

    const onCheckAnswer = async (): Promise<void> => {
        try {
            if (isCheckedAnswer) {
                onContinueQuestion();
                return;
            }
            setLoading(true);
            if (!answerSelected) return;
            const res = await questionsService.APIcheckAnwer(
                question._id,
                answerSelected,
            );
            if (res.correct) {
                setIsCorrectAnswer(true);
            } else {
                setIsCorrectAnswer(false);
                setCorrectAnswer(res.correctAnswer);
            }
            setIsCheckedAnswer(true);
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const onContinueQuestion = (): void => {
        onRandomQuestion();
        setSum(sum + 1);
    };

    useEffect(() => {
        onRandomQuestion();
    }, [onRandomQuestion]);

    return (
        <DefaultLayout>
            <Theme1 />
            <Spinner loading={loading || isValidating} />
            <Link to={Screen.Classrooms}>
                <div className="m-6 cursor-pointer absolute right-0 top-0">
                    <CloseIconSVG className="w-6 h-6" />
                </div>
            </Link>
            {questions && (
                <div className="text-center relative text-woodyBrown mt-20 xl:mx-56 lg:mx-40 md:mx-32 sm:mx-20 mx-6 ">
                    <div className="flex items-center">
                        <div className="xs:w-32 w-24">
                            <PersonIconSVG />
                        </div>
                        <div className="p-4 sm:text-2xl xs:text-xl text-base rounded-2xl tooltip-question">
                            Câu {sum} : {question.question}
                        </div>
                    </div>
                    <Alert
                        isSuccess={isSuccess}
                        message={error || message}
                        clearMessage={clearMessage}
                    />
                    <div className="grid xs:grid-cols-2 grid-cols-1 z-50 sm:gap-8 xs:gap-6 gap-4 xs:p-10 p-6 border-1.6px border-mongooseGray rounded-xl">
                        {question.answer.map(item => {
                            return (
                                <button
                                    key={item}
                                    className={`rounded-10px outline-none rounded-lg focus:outline-none border-2 border-b-4 border-gray-500 bg-white sm:mx-3 transition duration-150 ${answerSelected ===
                                        item &&
                                        'bg-brightGreen border-oliveGreen text-white'} ${isCheckedAnswer &&
                                        !isCorrectAnswer &&
                                        item === answerSelected &&
                                        'bg-sunsetOrange text-white border-alizarinRed'} ${isCheckedAnswer &&
                                        !isCorrectAnswer &&
                                        item === correctAnswer &&
                                        'bg-brightGreen border-oliveGreen text-white'}`}
                                    type="button"
                                    onClick={(): void => onSelectAnswer(item)}
                                >
                                    <div className="md:px-20 sm:px-12 xs:px-8 px-4 xs:py-3 py-2 sm:text-2xl xs:text-xl text-lg">
                                        {item}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            <div
                className={`absolute bottom-0 lg:px-32 md:px-20 sm:px-16 px-5 sm:pt-12 xs:pt-8 pt-6 sm:pb-10 pb-6 border-t-2 border-mongooseGray w-full flex items-center justify-between ${isCheckedAnswer &&
                    (isCorrectAnswer ? 'bg-creamWhite' : 'bg-mistyRose')}`}
            >
                {isCheckedAnswer ? (
                    isCorrectAnswer ? (
                        <div className="flex items-center">
                            <TickGreenIconSVG className="sm:w-16 sm:h-16 xs:w-12 xs:h-12 h-10 w-10 sm:mr-6 mr-3" />
                            <p className="sm:text-3xl xs:text-2xl text-xl font-black text-oliveGreen">
                                Rất giỏi !
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <WarningIconSVG className="sm:w-16 sm:h-16 xs:w-12 xs:h-12 h-10 w-10 sm:mr-6 mr-3" />
                            <div className="flex flex-col items-start justify-center">
                                <p className="sm:text-3xl xs:text-2xl text-xl font-black text-alizarinRed">
                                    Sai rồi !
                                </p>
                                <p className="sm:text-2xl xs:text-xl text-base font-black text-alizarinRed">
                                    Đáp án là : {correctAnswer}
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    <button
                        type="button"
                        onClick={onRandomQuestion}
                        className="ss:px-12 px-6 py-2 xs:text-xl text-base outline-none focus:outline-none border-2 text-white hover:bg-darkGray hover:bg-opacity-25 border-b-4 font-bold border-mongooseGray rounded-lg"
                    >
                        Bỏ qua
                    </button>
                )}

                <button
                    type="button"
                    onClick={onCheckAnswer}
                    disabled={!answerSelected}
                    className={`${
                        isCheckedAnswer
                            ? isCorrectAnswer
                                ? 'bg-brightGreen border-oliveGreen text-white'
                                : 'bg-sunsetOrange border-b-4 border-alizarinRed text-white'
                            : answerSelected
                            ? 'bg-brightGreen  border-b-4 border-oliveGreen text-white'
                            : 'bg-mongooseGray text-darkGray pointer-events-none'
                    }  ss:px-12 px-6 py-2 xs:text-xl text-base border-2 outline-none focus:outline-none border-b-4 font-bold border-mongooseGray rounded-lg`}
                >
                    {isCheckedAnswer ? 'Tiếp tục' : 'Kiểm tra'}
                </button>
            </div>
        </DefaultLayout>
    );
};
