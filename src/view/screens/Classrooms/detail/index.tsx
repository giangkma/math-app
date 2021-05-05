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
        <>
            <Spinner loading={loading || isValidating} />
            <Link to={Screen.Classrooms}>
                <div className="m-6 cursor-pointer absolute right-0 top-0">
                    <CloseIconSVG className="w-6 h-6" />
                </div>
            </Link>
            {questions && (
                <div className="text-center text-woodyBrown mt-20 mx-40">
                    <div className="flex items-center">
                        <div className="w-32">
                            <PersonIconSVG />
                        </div>
                        <div className="p-4 text-2xl rounded-2xl tooltip-question">
                            Câu {sum} : {question.question}
                        </div>
                    </div>
                    <Alert
                        isSuccess={isSuccess}
                        message={error || message}
                        clearMessage={clearMessage}
                    />
                    <div className="grid grid-cols-2 gap-8 p-10 border-1.6px border-mongooseGray rounded-xl">
                        {question.answer.map(item => {
                            return (
                                <button
                                    key={item}
                                    className={`rounded-10px outline-none rounded-lg focus:outline-none border-2 border-b-4 border-gray-500 bg-white mx-3 transition duration-150 ${answerSelected ===
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
                                    <div className="px-20 py-3 text-2xl">
                                        {item}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            <div
                className={`absolute bottom-0 px-20 pt-12 pb-10 border-t-2 border-mongooseGray w-full flex items-center justify-between ${isCheckedAnswer &&
                    (isCorrectAnswer ? 'bg-creamWhite' : 'bg-mistyRose')}`}
            >
                {isCheckedAnswer ? (
                    isCorrectAnswer ? (
                        <div className="flex items-center">
                            <TickGreenIconSVG className="w-16 h-16 mr-6" />
                            <p className="text-3xl font-black text-oliveGreen">
                                Rất giỏi !
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <WarningIconSVG className="w-16 h-16 mr-6" />
                            <div className="flex flex-col items-start justify-center">
                                <p className="text-3xl font-black text-alizarinRed">
                                    Sai rồi !
                                </p>
                                <p className="text-2xl font-black text-alizarinRed">
                                    Đáp án chính xác là : {correctAnswer}
                                </p>
                            </div>
                        </div>
                    )
                ) : (
                    <button
                        type="button"
                        className="px-12 py-2 text-xl outline-none focus:outline-none border-2 text-white hover:bg-darkGray hover:bg-opacity-25 border-b-4 font-bold border-mongooseGray rounded-lg"
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
                    }  px-12 py-2 text-xl border-2 outline-none focus:outline-none border-b-4 font-bold border-mongooseGray rounded-lg`}
                >
                    {isCheckedAnswer ? 'Tiếp tục' : 'Kiểm tra'}
                </button>
            </div>
        </>
    );
};
