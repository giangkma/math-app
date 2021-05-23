import React, { FC } from 'react';
import { Chapter } from 'src/domain/question';
import { AppDropdown } from './AppDropdown';

type IProps = {
    title?: string;
    chapters: Chapter[];
    chapterSelected: Chapter | undefined;
    setChapterSelected: (chapter: Chapter) => void;
};
export const DropdownChapters: FC<IProps> = ({
    title = 'Bạn muốn thêm câu hỏi vào chương nào ?',
    chapters = [],
    chapterSelected,
    setChapterSelected,
}) => {
    return (
        <AppDropdown
            classNameContainer="w-full mb-8"
            title={chapterSelected?.name ?? title}
            titleActive={chapterSelected ? 'Thay đổi chương' : 'Chọn chương'}
        >
            {chapters.map(chapter => {
                return (
                    <button
                        key={chapter.id}
                        onClick={(): void => setChapterSelected(chapter)}
                        className="text-black px-4 py-2 w-full leading-5 text-left hover:underline"
                    >
                        Chương {chapter.id} : {chapter.name}
                    </button>
                );
            })}
        </AppDropdown>
    );
};
