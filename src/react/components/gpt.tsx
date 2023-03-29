import React, { useRef, useState } from 'react';
import Styles from './index.module.scss';
import classnames from 'classnames';
import Chat from './page/chat/chat';
import withDraggable from './draggable/draggable';
import AppHeaderOperate from './appHeader/headerOperate';
import ChatOperate from './page/chatOperate/chatOperate';
declare global {
	interface Window {
		ipcApi?: any;
	}
}

const Gpt = () => {
	const [mouseEnterCard, setMouseEnterCard] = useState<boolean>(false);
	const [showGPT, setShowGPT] = useState<boolean>(true);
	return (
		<div
			className={classnames(
				// 'draggable',
				// { [Styles.userAvatar]: !showGPT },
				// {
				// 	[Styles.userAvatarAnimation]: mouseEnterCard && !showGPT,
				// },
				{
					[Styles.gptRobot]: showGPT,
				},
			)}
			onClick={() => {
				if (window.ipcApi) {
					window.ipcApi.clickGPT();
				}
				setShowGPT(true);
			}}
			onMouseEnter={() => setMouseEnterCard(true)}
			onMouseLeave={() => setMouseEnterCard(false)}>
			<div
				className={classnames(Styles.gptBox, {
					[Styles.gptHidden]: !showGPT,
				})}>
				<div className={classnames(Styles.header)}>
					<div className={Styles.headerLeft}></div>
					<div className={Styles.headerOperate}>
						<AppHeaderOperate />
					</div>
				</div>
				<div className={Styles.body}>
					<div className={Styles.left}>
						<Chat />
					</div>
					<div className={Styles.right}>
						<ChatOperate />
					</div>
				</div>
			</div>
		</div>
	);
};

export default withDraggable(Gpt);
