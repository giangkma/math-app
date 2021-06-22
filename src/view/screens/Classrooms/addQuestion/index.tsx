import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import ExcelImage from 'src/assets/images/excel.png';
import container from 'src/container';
import { Chapter, QuestionForm, questionPayload } from 'src/domain/question';
import { showToatify } from 'src/helper/toat';
import { Alert } from 'src/view/components/alert';
import { Question } from 'src/view/components/form/Question';
import { Spinner } from 'src/view/components/loading/Spinner';
import { useMessageData } from 'src/view/hooks/message';
import { Theme3 } from 'src/view/layout/components/Theme3';
import { DefaultLayout } from 'src/view/layout/DefaultLayout';
import { HeaderBack } from 'src/view/layout/HeaderBack';
import { Screen } from 'src/view/routes/Router';
import { ModalUploadExcel } from './components/ModalUploadExcel';

type ParamType = {
    className: string;
};

const {
    cradle: { questionsService },
} = container;

export const AddQuestion: FC = () => {
    const { className } = useParams<ParamType>();
    const { isSuccess, message, setMessage, clearMessage } = useMessageData();

    const [isUploadExcel, setIsUploadExcel] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const toggleUsingExcel = (): void => {
        setIsUploadExcel(prev => !prev);
    };

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

    const onCreateQuestion = async (
        data: QuestionForm,
        chapterSelected: Chapter | undefined,
        answers: string[],
    ): Promise<boolean> => {
        try {
            if (!chapterSelected) {
                throw 'Bạn chưa chọn chương';
            }
            checkDataForm(data, answers);
            setLoading(true);
            const payload = questionPayload(
                data,
                className,
                chapterSelected.id,
            );
            await questionsService.APIcreateQuestion(payload);
            showToatify('success', 'Thêm thành công');

            return true;
        } catch (error) {
            setMessage({ message: error.message ?? error });
        } finally {
            setLoading(false);
        }
        return false;
    };

    const onUploadExcel = async (formData: FormData): Promise<void> => {
        try {
            if (!formData) {
                return;
            }
            setLoading(true);
            const res = await questionsService.APIcreateQuestionsExcel(
                formData,
                className,
            );
            toggleUsingExcel();
            showToatify('success', `Thêm thành công ${res.valid} câu`);
        } catch (error) {
            setMessage({ message: error.message ?? error });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DefaultLayout title={`Thêm câu hỏi`}>
            {isUploadExcel && (
                <ModalUploadExcel
                    onUpload={onUploadExcel}
                    onCancel={toggleUsingExcel}
                />
            )}
            <Theme3 />
            <Spinner loading={loading} />
            <HeaderBack
                to={`${Screen.Classrooms}/${className}`}
                title={`Thêm câu hỏi - Toán lớp ${className}`}
            />
            <div className="absolute text-white top-1/2 left-1/2 transform sm:w-125 w-full sm:px-0 px-6 -translate-y-1/2 -translate-x-1/2">
                <Alert
                    isSuccess={isSuccess}
                    message={message}
                    clearMessage={clearMessage}
                />
                <Question onSubmitForm={onCreateQuestion} />
            </div>
            <div className="absolute bottom-0 left-0 m-5 text-white flex items-center">
                <button
                    type="button"
                    className="outline-none focus:outline-none button-tooltip"
                    onClick={toggleUsingExcel}
                >
                    <img
                        src={ExcelImage}
                        className="sm:w-16 sm:h-16 w-24 cursor-pointer"
                        alt=""
                    />
                </button>
                <div className="content-tooltip items-center flex">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        ></path>
                    </svg>
                    <p className="text-opacity-75">
                        Click vào đây nếu bạn muốn sử dụng file Excel để thêm
                        nhiều câu hỏi !
                    </p>
                </div>
            </div>
        </DefaultLayout>
    );
};
