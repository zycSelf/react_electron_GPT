import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../util/redux/store';
import Styles from './chatBody.module.scss';
import {
	ChatAsk,
	ChatAnswer,
	OpenAIChatChoice,
	ChatDocument,
} from '../../../../util/redux/reducer';
import { ChatAskItem } from '../../../../api/openAIApi';
import Ask from '../ask/ask';
import Answer from '../answer/answer';

const ChatBody = () => {
	const chatList = useSelector(
		(state: StoreState) => state.openAISlice.chatList,
	);
	useEffect(() => {
		console.log(chatList);
	}, [chatList]);
	const renderChatBody = () => {
		return chatList.map(
			<T extends ChatAsk | ChatAnswer | ChatDocument>(
				askOrAnswer: T,
			): ReactElement | null => {
				switch (askOrAnswer.type) {
				case 'ask':
					return <Ask key={askOrAnswer.id} data={askOrAnswer} />;
				case 'answer':
					return <Answer key={askOrAnswer.id} data={askOrAnswer} />;
				case 'document':
					return null;
				default:
					return <>error</>;
				}
			},
		);
	};
	return <div className={Styles.chatBody}>{renderChatBody()}</div>;
};

export default ChatBody;
