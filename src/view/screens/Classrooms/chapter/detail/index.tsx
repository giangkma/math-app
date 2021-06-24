/* eslint-disable react/jsx-wrap-multilines */
import { Location } from 'history';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { TickGreenIconSVG, WarningIconSVG } from 'src/assets/svg';
import container from 'src/container';
import { QuestionType } from 'src/domain/question';
import { UserRole } from 'src/domain/user';
import { showToatify } from 'src/helper/toat';
import { dataImagesPerson } from 'src/utils/dummy';
import { Alert } from 'src/view/components/alert';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { useQuestions } from 'src/view/hooks/questions';
import { useRoleUserAuthenticated } from 'src/view/hooks/role';
import { Theme1 } from 'src/view/layout/components/Theme1';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { RouteLeavingGuard } from 'src/view/routes/RouteLeavingGuard';
import { Screen } from 'src/view/routes/Router';
import { ModalRedirectTeacher } from './components/ModalRedirectTeacher';
import { ModalReport } from './components/ModalReport';

type ParamType = {
    className: string;
    chapter: string;
};

const useCountQuestion = () => {
    const [sum, setSum] = useState<number>(1);
    const [sumCorrect, setSumCorrect] = useState<number>(0);
    const [sumInCorrect, setSumInCorrect] = useState<number>(0);

    return {
        sum,
        sumCorrect,
        sumInCorrect,
        setSum,
        setSumCorrect,
        setSumInCorrect,
    };
};

const useCheckQuestion = () => {
    const [answerSelected, setAnswerSelected] = useState<string | undefined>(
        undefined,
    );

    const [isCheckedAnswer, setIsCheckedAnswer] = useState<boolean>(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
    const [correctAnswer, setCorrectAnswer] = useState<string | undefined>(
        undefined,
    );
    return {
        answerSelected,
        setAnswerSelected,

        isCheckedAnswer,
        setIsCheckedAnswer,
        isCorrectAnswer,
        setIsCorrectAnswer,
        correctAnswer,
        setCorrectAnswer,
    };
};

const initialQuestion = {
    id: '',
    question: '',
    answer: [],
    className: '',
    correctAnswer: '',
};

const {
    cradle: { questionsService, reportService },
} = container;

export const ChapterDetail: FC<{}> = () => {
    const history = useHistory();
    const { path } = useRouteMatch();
    const isTeacher = useRoleUserAuthenticated(UserRole.teacher);
    const { className, chapter } = useParams<ParamType>();
    const [question, setQuestion] = useState<QuestionType>(initialQuestion);
    const {
        answerSelected,
        setAnswerSelected,
        isCheckedAnswer,
        setIsCheckedAnswer,
        isCorrectAnswer,
        setIsCorrectAnswer,
        correctAnswer,
        setCorrectAnswer,
    } = useCheckQuestion();

    const {
        sum,
        sumCorrect,
        sumInCorrect,
        setSum,
        setSumCorrect,
        setSumInCorrect,
    } = useCountQuestion();

    const [indexImage, setIndexImage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const [isSendReport, setIsSendReport] = useState<boolean>(false);

    const { data: questions, isValidating, error } = useQuestions(
        className,
        chapter,
    );

    const toggleModalReport = (): void => {
        setIsSendReport(prev => !prev);
    };

    const onRandomQuestion = useCallback((): void => {
        if (!questions) return;
        const indexImage = Math.floor(Math.random() * dataImagesPerson.length);
        const indexQuestion = Math.floor(Math.random() * questions.length);
        setIndexImage(indexImage);
        setQuestion(questions[indexQuestion]);
        setIsCheckedAnswer(false);
        setAnswerSelected(undefined);
    }, [questions, setAnswerSelected, setIndexImage, setIsCheckedAnswer]);

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
            // Scores are only updated when students complete the test in the “Ôn Luyện cuối năm” section.
            const updateScore = chapter === 'all' ? true : false;
            const res = await questionsService.APIcheckAnwer(
                question.id,
                answerSelected,
                updateScore,
            );
            if (res.correct) {
                setIsCorrectAnswer(true);
                setSumCorrect(prev => prev + 1);
            } else {
                setIsCorrectAnswer(false);
                setCorrectAnswer(res.correctAnswer);
                setSumInCorrect(prev => prev + 1);
            }
            setIsCheckedAnswer(true);
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const onSendReport = async (): Promise<void> => {
        try {
            setLoading(true);
            await reportService.APIsendReport(question.id);
            showToatify('success', 'Cảm ơn bạn đã gửi báo cáo !');
            onContinueQuestion();
        } catch (error) {
            setMessage({ message: error.message });
        } finally {
            setLoading(false);
            toggleModalReport();
        }
    };

    const onContinueQuestion = (): void => {
        onRandomQuestion();
        setSum(sum + 1);
    };

    useEffect(() => {
        onRandomQuestion();
    }, [onRandomQuestion]);

    const answerFilterDuplicate = question.answer.filter(
        (item, index) => question.answer.indexOf(item) === index,
    );

    const shouldBlockNavigation = (nextLocation: Location): boolean => {
        const isExitCurrentPage = !nextLocation.pathname.startsWith(path);
        return isExitCurrentPage;
    };

    const score = sumCorrect * 10;

    if (isTeacher) return <ModalRedirectTeacher />;

    return (
        <DefaultLayout
            title={`${
                chapter !== 'all' ? `Chương ${chapter}` : 'Ôn luyện cuối năm'
            } - Lớp ${className}`}
        >
            {isSendReport && (
                <ModalReport
                    onSend={onSendReport}
                    onCancel={toggleModalReport}
                />
            )}

            <RouteLeavingGuard
                navigate={(path: string): void => history.push(path)}
                when={true}
                shouldBlockNavigation={shouldBlockNavigation}
            />
            <Theme1 />
            <Spinner loading={loading || isValidating} />
            <div className="flex items-start justify-between absolute w-full top-0">
                <div className="flex-1">
                    <HeaderBack
                        to={`${Screen.Classrooms}/${className}`}
                        title={
                            chapter !== 'all'
                                ? `Chương ${chapter} `
                                : 'Ôn luyện '
                        }
                    />
                </div>
                <div className="flex-1 text-right">
                    {chapter === 'all' ? (
                        <div className="z-10 text-white sm:text-xl text-lg m-3">
                            <p className="sm:block hidden">
                                <span>Bạn có thêm</span>
                                <span className="font-semibold text-2xl text-brightGreen">
                                    &nbsp;{score}&nbsp;
                                </span>
                                <span>Điểm</span>
                            </p>
                            <span className="font-semibold text-2xl sm:hidden block text-brightGreen">
                                {`+ ${score}`}
                            </span>
                        </div>
                    ) : (
                        <div className="z-10 text-white sm:text-xl text-lg flex flex-col m-3">
                            <p>
                                <span className="sm:inline hidden">
                                    Số câu&nbsp;
                                </span>
                                <span>đúng :</span>
                                <span className="text-brightGreen sm:text-2xl text-base">
                                    &nbsp;{sumCorrect}
                                </span>
                            </p>
                            <p>
                                <span className="sm:inline hidden">
                                    Số câu&nbsp;
                                </span>
                                <span>sai :</span>
                                <span className="text-alizarinRed sm:text-2xl text-base">
                                    &nbsp;{sumInCorrect}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
            {questions && (
                <div className="text-center relative text-woodyBrown lg:mt-32 md:mt-24 mt-20 xl:mx-56 lg:mx-40 md:mx-32 sm:mx-20 mx-6 ">
                    <Alert
                        isSuccess={isSuccess}
                        message={error || message}
                        clearMessage={clearMessage}
                    />
                    <div className="flex items-end">
                        <img
                            className="lg:w-32 md:w-28 sm:w-24 w-20"
                            src={dataImagesPerson[indexImage]}
                            alt=""
                        />
                        <div className="p-4 mb-4 sm:text-2xl xs:text-xl text-base rounded-2xl tooltip-question">
                            Câu {sum} : {question.question}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 z-50 sm:gap-8 xs:gap-6 gap-4 xs:p-10 p-4 border-1.6px border-mongooseGray rounded-xl">
                        {answerFilterDuplicate.map(item => {
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
                                    <div className="md:px-20 sm:px-12 xs:px-8 px-4 xs:py-3 py-1 sm:text-2xl xs:text-xl text-lg">
                                        {item.length > 10
                                            ? `${item.slice(0, 8)}...`
                                            : item}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
            <div
                className={`absolute bottom-0 sm:pt-12 xs:pt-8 pt-6 sm:pb-10 pb-6 border-t-2 border-mongooseGray w-full flex items-center justify-around ${isCheckedAnswer &&
                    (isCorrectAnswer ? 'bg-creamWhite' : 'bg-mistyRose')}`}
            >
                {isCheckedAnswer ? (
                    isCorrectAnswer ? (
                        <div className="flex items-center">
                            <TickGreenIconSVG className="sm:w-16 sm:h-16 xs:w-12 xs:h-12 h-8 w-8 sm:mr-6 mr-3" />
                            <p className="lg:text-3xl sm:text-2xl text-lg font-black text-oliveGreen">
                                Rất giỏi !
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <WarningIconSVG className="sm:w-16 sm:h-16 xs:w-12 xs:h-12 h-10 w-10 sm:mr-6 mr-3" />
                            <div className="flex flex-col items-start justify-center">
                                <p className="sm:text-2xl text-lg font-black text-alizarinRed">
                                    Sai rồi !
                                </p>
                                <button
                                    type="button"
                                    onClick={toggleModalReport}
                                    className="lg:text-2xl sm:text-xl text-lg flex items-center outline-none focus:outline-none mt-2 font-black text-sunsetOrange hover:text-alizarinRed"
                                >
                                    <svg
                                        className="w-6 h-6 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                                        ></path>
                                    </svg>
                                    Báo cáo
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <button
                        type="button"
                        onClick={onRandomQuestion}
                        className="ss:px-12 px-6 py-2 sm:text-xl text-base outline-none focus:outline-none border-2 text-white hover:bg-darkGray hover:bg-opacity-25 border-b-4 font-bold border-mongooseGray rounded-lg"
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
                    }  ss:px-12 px-6 py-2 sm:text-xl text-base border-2 outline-none focus:outline-none border-b-4 font-bold border-mongooseGray rounded-lg`}
                >
                    {isCheckedAnswer ? 'Tiếp tục' : 'Kiểm tra'}
                </button>
            </div>
        </DefaultLayout>
    );
};
