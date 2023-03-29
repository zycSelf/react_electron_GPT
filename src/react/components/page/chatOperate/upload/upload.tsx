import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentInfo } from '../../../../util/redux/reducer';
import { StoreState } from '../../../../util/redux/store';
import Styles from './upload.module.scss';

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
		<div className={Styles.uploadArea}>
			<input
				className={Styles.fileInput}
				type={'file'}
				ref={inputRef}
				onChange={handleFileChange}
			/>
			<div className={Styles.Precautions}>
				<span>
					目前仅支持pdf文档,由于GPT3.5模型存在token上限问题,请勿上传字数过多的文档。
				</span>
				<span>
					目前暂未处理网络错误，如遇到长时间无返回或answer停止不动可能是网络原因导致。
				</span>
			</div>
		</div>
	);
};

export default UploadFile;
