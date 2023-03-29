import React from 'react';
import Styles from './ask.module.scss';
import { ChatAsk } from '../../../../util/redux/reducer';
interface AskProps {
	data: ChatAsk;
}
const Ask = ({ data }: AskProps) => {
	return (
		<div className={Styles.ask}>
			<div className={Styles.userAvatar} />
			<div className={Styles.askContent}>{data.content}</div>
		</div>
	);
};

export default Ask;
