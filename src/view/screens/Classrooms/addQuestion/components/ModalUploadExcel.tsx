import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseIconSVG } from 'src/assets/svg';
import container from 'src/container';
import { AppModal } from 'src/view/components/modal/AppModal';

type IProps = {
    classNameContainer?: string;
    onCancel: () => void;
    onUpload: (file: FormData) => void;
};

export const ModalUploadExcel: FC<IProps> = ({
    classNameContainer,
    onCancel,
    onUpload,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();

    const onChangeFileExcel = (
        event: React.ChangeEvent<HTMLInputElement>,
    ): void => {
        if (!event.target.files?.length) return;
        setSelectedFile(event.target.files[0]);
    };

    const onSubmit = (): void => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('files', selectedFile);
        onUpload(formData);
    };

    return (
        <div
            className={`absolute z-50 w-full h-full px-4 bg-black bg-opacity-75 top-0 left-0 flex items-center justify-center ${classNameContainer}`}
        >
            <AppModal clickOutside={onCancel}>
                <div className="bg-white rounded-xl px-8 py-5 pb-8 relative">
                    <button
                        type="button"
                        className="outline-none bg-white border-2 border-gray-500 rounded-full shadow-lg absolute top-0 right-0 -m-3 p-1 hover:underline group hover:border-sunsetOrange hover:bg-sunsetOrange focus:outline-none transition duration-300"
                        onClick={onCancel}
                    >
                        <CloseIconSVG className="w-6 h-6 text-nobelGray group-hover:text-white" />
                    </button>
                    <input
                        id="selectExcel"
                        className="hidden"
                        type="file"
                        name="files"
                        onChange={onChangeFileExcel}
                    />
                    <label
                        htmlFor="selectExcel"
                        className="flex items-center gap-2 text-lg cursor-pointer "
                    >
                        <span
                            className={`${
                                selectedFile
                                    ? 'text-brightGreen'
                                    : 'text-nobelGray'
                            } hover:text-brightGreen`}
                        >
                            <svg
                                className="w-12 h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 13h6M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                ></path>
                            </svg>
                        </span>
                        <p className={selectedFile && 'text-brightGreen'}>
                            {selectedFile
                                ? selectedFile?.name
                                : 'Chọn file Excel từ máy'}
                        </p>
                    </label>
                    <div className="flex mt-3 items-center justify-end">
                        Tải file excel mẫu tại đây&nbsp;
                        <Link
                            to="/files/file_mau.xlsx"
                            target="_blank"
                            download
                        >
                            <span className="text-nobelGray hover:text-brightGreen">
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
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    ></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                    <div className="mt-6 w-full text-right xs:text-lg text-base">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="px-4 py-1 rounded-full outline-none focus:outline-none border-1.6px border-successGreen text-successGreen hover:bg-successGreen  hover:text-white transition duration-200"
                        >
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
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </AppModal>
        </div>
    );
};
