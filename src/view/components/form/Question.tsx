import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { CloseIconSVG } from 'src/assets/svg';
import { Chapter, QuestionForm, QuestionType } from 'src/domain/question';
import { QuestionFormSchema } from 'src/domain/question/schema';
import { dataChapters } from 'src/utils/dummy';
import { InputText } from 'src/view/components/input/InputText';
import { InputTextarea } from 'src/view/components/input/InputTextarea';
import { PrimaryButton } from '../button/PrimaryButton';
import { DropdownChapters } from '../dropdown/DropdownChapters';

type IProps = {
    onSubmitForm: (
        data: QuestionForm,
        chapterSelected: Chapter | undefined,
        answers: string[],
    ) => Promise<boolean | void>;
    dataQuestion?: QuestionType;
};

type ParamType = {
    className: string;
};

const initialAnswers = ['A', 'B', 'C', 'D'];

const initialForm = {
    question: '',
    answerA: '',
    answerB: '',
    answerC: '',
    answerD: '',
    indexCorrectAnswer: '',
};

export const Question: FC<IProps> = ({ onSubmitForm, dataQuestion }) => {
    const { className } = useParams<ParamType>();

    const chapters =
        dataChapters[
            Number(dataQuestion ? dataQuestion.className : className) - 1
        ];

    const [chapterSelected, setChapterSelected] = useState<
        Chapter | undefined
    >();

    const [answers, setAnswers] = useState<string[]>(initialAnswers);

    const { register, handleSubmit, reset } = useForm<QuestionFormSchema>({
        defaultValues: initialForm,
    });

    const removeAnswer = (): void => {
        answers.pop();
        setAnswers([...answers]);
    };

    const addAnswer = (): void => {
        if (answers.length === 2) {
            const newAnswer = answers.concat('C');
            setAnswers(newAnswer);
            return;
        }
        const newAnswer = answers.concat('D');
        setAnswers(newAnswer);
    };

    const resetForm = (): void => {
        reset(initialForm);
    };

    const onSubmit = async (data: QuestionForm): Promise<void> => {
        const res = await onSubmitForm(data, chapterSelected, answers);
        if (res && !dataQuestion) resetForm();
    };
    useEffect(() => {
        if (!dataQuestion) return;
        const { question, correctAnswer, answer, chapter } = dataQuestion;

        const questionChapter = chapters.find(item => item.id === chapter);
        setChapterSelected(questionChapter);

        let indexCorrectAnswer = 0;
        answer.map((item, index) => {
            if (item === correctAnswer) indexCorrectAnswer = index;
            return 1;
        });

        // update total answers
        setAnswers(answers.slice(0, answer.length));

        reset({
            question,
            indexCorrectAnswer: indexCorrectAnswer.toString(),
            answerA: answer[0],
            answerB: answer[1],
            answerC: answer[2],
            answerD: answer[3],
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataQuestion]);

    return (
        <>
            <DropdownChapters
                chapterSelected={chapterSelected}
                setChapterSelected={setChapterSelected}
                chapters={chapters}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center">
                    <InputTextarea
                        name="question"
                        placeholder="..."
                        label="Đề bài : "
                        register={register}
                    />
                </div>
                <div className="mt-4 sm:text-xl text-lg flex items-center gap-4">
                    <span>Đáp án :</span>
                    {answers.length !== 4 && (
                        <button
                            onClick={addAnswer}
                            className="outline-none focus:outline-none text-white border-b-3px px-4 transition duration-300 hover:bg-white hover:bg-opacity-25 py-1 flex border-1.6px border-primaryColor rounded-full xs:mr-8 mr-4 text-sm items-center"
                            type="button"
                        >
                            Thêm đáp án
                        </button>
                    )}
                </div>
                {answers.map((answer, index) => {
                    return (
                        <div
                            key={answer}
                            className="flex items-center mt-4 gap-4 relative"
                        >
                            <input
                                type="radio"
                                name="indexCorrectAnswer"
                                value={index}
                                ref={register}
                                className="form-radio cursor-pointer h-6 w-6 text-blue-600"
                            />
                            <InputText
                                name={`answer${answer}`}
                                register={register}
                                placeholder={`Đáp án ${answer} : `}
                            />
                            {answers.length > 2 &&
                                index === answers.length - 1 && (
                                    <button
                                        className="outline-none absolute right-0 mr-2 xs:-mr-10 focus:outline-none"
                                        onClick={removeAnswer}
                                        type="button"
                                    >
                                        <CloseIconSVG className="w-8 h-8 text-white" />
                                    </button>
                                )}
                        </div>
                    );
                })}
                {answers.length < 3 && (
                    <p className="mt-4">
                        Lưu ý : Mỗi câu hỏi cần tối thiểu 2 đáp án
                    </p>
                )}
                <div className="w-full text-right mt-10">
                    {dataQuestion ? (
                        <PrimaryButton
                            color="blue"
                            className="px-6 py-1"
                            title="Lưu chỉnh sửa"
                            submit
                        />
                    ) : (
                        <PrimaryButton
                            color="green"
                            className="px-6 py-1"
                            title="Thêm câu hỏi"
                            submit
                        />
                    )}
                </div>
            </form>
        </>
    );
};
