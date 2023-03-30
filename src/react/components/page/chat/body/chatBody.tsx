import React, { ReactElement, useEffect, useRef } from 'react';
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
	const chatBodyRef = useRef<HTMLDivElement>(null);
	const chatList = useSelector(
		(state: StoreState) => state.openAISlice.chatList,
	);
	useEffect(() => {
		if (chatBodyRef.current) {
			const container = chatBodyRef.current;
			const observer = new MutationObserver(() => {
				container.scrollTop = container.scrollHeight;
			});
			observer.observe(container, { childList: true });
		}
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
	return (
		<div ref={chatBodyRef} className={Styles.chatBody}>
			{renderChatBody()}
		</div>
	);
};

export default ChatBody;
