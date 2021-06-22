import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import container from 'src/container';
import { Chapter, QuestionForm, questionPayload } from 'src/domain/question';
import { showToatify } from 'src/helper/toat';
import { checkDuplicatesWithId } from 'src/utils/generalUtils';
import { Alert } from 'src/view/components/alert';
import { PrimaryButton } from 'src/view/components/button/PrimaryButton';
import { Question } from 'src/view/components/form/Question';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { useQuestion } from 'src/view/hooks/questions';
import { useReport } from 'src/view/hooks/report';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';

type IProps = {};
type StateLocation = {
    questionId: string;
};
const {
    cradle: { questionsService },
} = container;

export const Reports: FC<IProps> = () => {
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();
    const [loading, setLoading] = useState<boolean>(false);

    const [questionIdReport, setQuestionIdReport] = useState<
        string | undefined
    >();

    const location = useLocation();

    const {
        data: question,
        isValidating: isValidQuestion,
        error: errorQuestion,
    } = useQuestion(questionIdReport);

    const {
        data: reports,
        isValidating: isValidReports,
        error: errorReports,
        mutate,
    } = useReport();

    const checkDataForm = (data: QuestionForm, answers: string[]): void => {
        if (!data.question) {
            throw 'Bạn chưa nhập đề bài';
        }
        const { answerA, answerB, answerC, answerD } = data;
        if (
            !answerA ||
            !answerB ||
            (answers.length === 3 && !answerC) ||
            (answers.length === 4 && !answerD)
        ) {
            throw 'Bạn hãy nhập đầy đủ đáp án';
        }
        if (!data.indexCorrectAnswer) {
            throw 'Bạn chưa chọn đáp án đúng cho bài này';
        }
    };

    const onSubmitForm = async (
        data: QuestionForm,
        chapterSelected: Chapter | undefined,
        answers: string[],
    ): Promise<void> => {
        try {
            if (!question) throw 'Đã xảy ra lỗi !';
            if (!chapterSelected) {
                throw 'Bạn chưa chọn chương';
            }
            checkDataForm(data, answers);
            setLoading(true);
            const payload = questionPayload(data, chapterSelected.id);
            await questionsService.APIupdateQuestion(question?.id, payload);
            showToatify('success', 'Cập nhật thành công');
            mutate();
        } catch (error) {
            setMessage({ message: error.message ?? error });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (errorQuestion) setMessage(errorQuestion.message);
        if (errorReports) setMessage(errorReports.message);
    }, [errorQuestion, errorReports, setMessage]);

    useEffect(() => {
        if (isValidQuestion || isValidReports) setLoading(true);
        else setLoading(false);
    }, [isValidQuestion, isValidReports]);

    useEffect(() => {
        if (!reports || !reports.length) return;
        const stateLocation = location.state as StateLocation;
        if (
            stateLocation &&
            checkDuplicatesWithId(stateLocation.questionId, reports)
        ) {
            setQuestionIdReport(stateLocation.questionId);
        } else {
            setQuestionIdReport(reports[0].questionId);
        }
    }, [location.state, reports]);

    return (
        <DefaultLayout title="Tổng hợp báo cáo">
            <Theme3 />
            <Spinner className="rounded-xl" loading={loading} />
            <HeaderBack to={Screen.Classrooms} title="Tổng hợp báo cáo" />
            <div className="h-screen overflow-y-auto">
                <button
                    className="outline-none sm:hidden absolute top-0 right-0 m-4 focus:outline-none text-white hover:bg-white hover:bg-opacity-25 transition duration-300 rounded-full flex items-center justify-center p-1"
                    type="button"
                    // onClick={toggleModal}
                >
                    <svg
                        className="md:w-10 md:h-10 h-8 w-8"
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
                    {reports && (
                        <div
                            className={`w-5 h-5 rounded-full absolute top-0 right-0 flex items-center justify-center ${
                                !reports.length ? 'bg-green-600' : 'bg-red-600'
                            }`}
                        >
                            {reports.length}
                        </div>
                    )}
                </button>
                {reports &&
                    (reports.length === 0 ? (
                        <div className="z-10 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <h1 className="md:text-xl text-lg text-white ">
                                Không có báo cáo nào !
                            </h1>
                            <Link to={Screen.Classrooms}>
                                <PrimaryButton
                                    className="px-6 mt-3 py-2"
                                    title="Quay lại trang chủ"
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="w-full text-white z-10 flex sm:mt-0 mt-6 sm:pb-12 mb-24 px-4 sm:px-8 md:px-20 lg:px-24 xl:px-40 xl:absolute xl:transform xl:top-1/2 xl:left-1/2 xl:-translate-x-1/2 xl:-translate-y-1/2 md:pt-12">
                            <div
                                style={{
                                    maxHeight: '550px',
                                    width: '350px',
                                }}
                                className="overflow-y-auto z-10 rounded-xl border-2 border-white border-opacity-50 shadow-xl xs:block hidden"
                            >
                                {reports.map(report => {
                                    const { senders } = report;
                                    return (
                                        <button
                                            type="button"
                                            key={report.id}
                                            onClick={(): void =>
                                                setQuestionIdReport(
                                                    report.questionId,
                                                )
                                            }
                                            className={`flex items-center outline-none focus:outline-none gap-2 px-2 py-2 mx-2 rounded-lg mt-2 hover:bg-gray-900 ${questionIdReport ===
                                                report.questionId &&
                                                'bg-gray-900'}`}
                                        >
                                            <div className="w-12 h-10 bg-gray-400 rounded-full"></div>
                                            <div className="w-full text-sm text-left">
                                                <span className="text-base font-semibold">
                                                    {
                                                        senders[
                                                            senders.length - 1
                                                        ]
                                                    }
                                                    &nbsp;
                                                </span>
                                                {senders.length > 1 && (
                                                    <span>
                                                        và {senders.length - 1}
                                                        &nbsp;người khác&nbsp;
                                                    </span>
                                                )}
                                                <span>đã gửi báo cáo</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="z-10 px-4 sm:px-10 w-full h-full">
                                <Alert
                                    isSuccess={isSuccess}
                                    message={message}
                                    clearMessage={clearMessage}
                                />
                                {questionIdReport && question && (
                                    <Question
                                        dataQuestion={question}
                                        onSubmitForm={onSubmitForm}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </DefaultLayout>
    );
};
