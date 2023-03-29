import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { setChatRequest } from '../../../util/redux/reducer';
import ChatBody from './body/chatBody';
import Styles from './chat.module.scss';
const Chat = () => {
	const [chatValue, setChatValue] = useState<string>('');
	const dispatch = useDispatch();
	const handleSendChatValue = () => {
		if (chatValue.length === 0) {
			console.log('chat length is empty');
			return;
		} else {
			console.log(chatValue);
			const message = [{ role: 'user', content: chatValue }];
			dispatch(
				setChatRequest({
					id: v4(),
					content: chatValue,
					message: message.map((item) => {
						return {
							...item,
							askId: v4(),
						};
					}),
				}),
			);
			// todo 携带上下文
			dispatch({
				type: 'OpenAIChat',
				payload: {
					messages: message,
				},
			});
			setChatValue('');
		}
	};
	const handleChatInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode !== 13) {
			return;
		}
		handleSendChatValue();
	};
	return (
		<div className={Styles.chat}>
			<div className={Styles.OpenAIChatBody}>
				<ChatBody />
			</div>
			<div className={Styles.OpenAIChatFooter}>
				<div className={Styles.chatInput}>
					<input
						type='text'
						value={chatValue}
						onChange={(e) => setChatValue(e.target.value)}
						onKeyDown={(e) => handleChatInputKeyDown(e)}
					/>
				</div>
				<div className={Styles.chatSend}>
					<button onClick={() => handleSendChatValue()}>Send</button>
				</div>
			</div>
		</div>
	);
};
export default Chat;
