import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentInfo } from '../../../../util/redux/reducer';
import { StoreState } from '../../../../util/redux/store';

const UploadFile = () => {
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);
	const document = useSelector(
		(state: StoreState) => state.openAISlice.document,
	);
	const handleFileChange = () => {
		if (inputRef.current) {
			const fileList = inputRef.current.files;
			const formData = new FormData();
			if (fileList && fileList.length > 0) {
				formData.append('file', fileList[0]);
				dispatch(
					setDocumentInfo({
						fileName: fileList[0].name,
					}),
				);
				// const reader = new FileReader();
				// reader.readAsDataURL(fileList[0]);
				// reader.onload = () => {
				dispatch({ type: 'FileConversion', payload: formData });
				// };
			}
		}
	};
	return (
		<div>
			<input type={'file'} ref={inputRef} onChange={handleFileChange} />
			<div>{document.fileName}</div>
			<div>{document.fileConversion}</div>
		</div>
	);
};

export default UploadFile;
