import React from 'react';
import Styles from './answer.module.scss';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import {
	ChatAnswer,
	OpenAIChatChoice,
} from '../../../../util/redux/reducer';
interface AnswerProps {
	data: ChatAnswer;
}
const Answer = ({ data }: AnswerProps) => {
	const getMsg = (choice: OpenAIChatChoice) => {
		if (choice.message && choice.message.content) {
			return choice.message.content;
		}
		if (choice.delta && choice.delta.content) {
			return choice.delta.content;
		}
		return '';
	};
	return (
		<div className={Styles.answer}>
			<div className={Styles.userAvatar} />
			<div className={Styles.answerContent}>
				<ReactMarkdown
					components={{
						code({ node, inline, className, children, ...props }: CodeProps) {
							return (
								<SyntaxHighlighter
									showLineNumbers={true}
									PreTag='div'
									{...props}
									style={coldarkCold}>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							);
						},
					}}>
					{data.choices.map((choice) => getMsg(choice)).join('')}
				</ReactMarkdown>
				{/* {data.choices.map((choice) => getMsg(choice))} */}
			</div>
		</div>
	);
};

export default Answer;
