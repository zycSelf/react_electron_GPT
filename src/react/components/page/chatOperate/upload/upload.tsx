import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentInfo } from '../../../../util/redux/reducer';
import { StoreState } from '../../../../util/redux/store';
import UploadCard from '../uploadCard/uploadCard';
import Styles from './upload.module.scss';
const UploadFile = () => {
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);
	const document = useSelector(
		(state: StoreState) => state.openAISlice.document,
	);
	const fetchConversion = (file: File) => {
		const formData = new FormData();
		formData.append('file', file);
		dispatch(
			setDocumentInfo({
				fileName: file.name,
			}),
		);
		dispatch({ type: 'FileConversion', payload: formData });
	};
	const handleFileChange = () => {
		if (inputRef.current && inputRef.current.files) {
			const fileList = inputRef.current.files;
			if (fileList.length > 0) {
				fetchConversion(fileList[0]);
			}
		}
	};
	return (
		<div className={Styles.uploadArea}>
			<input
				accept={'.pdf'}
				className={Styles.fileInput}
				type={'file'}
				ref={inputRef}
				onChange={handleFileChange}
			/>
			<div
				onDrop={(e: React.DragEvent) => {
					e.preventDefault();
					fetchConversion(e.dataTransfer.files[0]);
				}}
				onDragOver={(e: React.DragEvent) => {
					e.preventDefault();
					console.log('dragOvers');
				}}
				onClick={() => {
					inputRef.current?.click();
				}}
				className={Styles.upload}>
				{document.status === 'idle' ? null : <UploadCard />}
			</div>
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
