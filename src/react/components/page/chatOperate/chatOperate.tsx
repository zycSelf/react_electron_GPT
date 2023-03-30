import React from 'react';
import UploadFile from './upload/upload';
import Styles from './chatOperate.module.scss';
import { apiKeyInput } from '../../../util/appOperate/operate';
const ChatOperate = () => {
	return (
		<div className={Styles.operateArea}>
			<button onClick={apiKeyInput} className={Styles.apiKeyBtn}>
				inputYourApiKey
			</button>
			<UploadFile />
		</div>
	);
};

export default ChatOperate;
