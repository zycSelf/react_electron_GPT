import React from 'react';
import UploadFile from './upload/upload';
import Styles from './chatOperate.module.scss';
const ChatOperate = () => {
	return (
		<div className={Styles.operateArea}>
			<UploadFile />
		</div>
	);
};

export default ChatOperate;
