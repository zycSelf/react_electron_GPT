import React from 'react';
import Styles from './uploadCard.module.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../util/redux/store';
const UploadCard = () => {
	const document = useSelector(
		(state: StoreState) => state.openAISlice.document,
	);
	return (
		<div className={Styles.uploadCard}>
			<div className={Styles.uploadCardContent}>
				<div className={Styles.uploadCardTitle}>{document.fileName}</div>
			</div>
		</div>
	);
};

export default UploadCard;
