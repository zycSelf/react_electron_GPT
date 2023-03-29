// import React, { useState } from 'react';
// import Styles from './index.module.scss';
// import classnames from 'classnames';
// import FeatureList from './list/featureList';
// import { featureList } from '../../util/openai/openAIFeature';
// import { HashRouter } from 'react-router-dom';
// import { OpenAIRouter } from '../../router/openAIRouter';
// import Chat from './page/chat/chat';
// const App = () => {
// 	const cardRef = React.useRef<HTMLDivElement>(null);
// 	const [mouseEnterCard, setMouseEnterCard] = useState<boolean>(false);
// 	const [showGPT, setShowGPT] = useState<boolean>(false);
// 	return (
// 		<HashRouter>
// 			<div className={Styles.main}>
// 				<div className={Styles.header}>
// 					<div
// 						ref={cardRef}
// 						className={classnames(Styles.userAvatar, {
// 							[Styles.userAvatarAnimation]: mouseEnterCard,
// 						})}
// 						onClick={() => setShowGPT(true)}
// 						onMouseEnter={() => setMouseEnterCard(true)}
// 						onMouseLeave={() => setMouseEnterCard(false)}
// 					/>
// 				</div>
// 				<div className={Styles.body}>
// 					<div className={Styles.left}>
// 						<FeatureList list={featureList} />
// 					</div>
// 					<div className={Styles.right}>{OpenAIRouter}</div>
// 				</div>
// 				<div className={Styles.footer}>footer</div>
// 			</div>
// 			<div
// 				className={classnames(Styles.gptRobot, {
// 					[Styles.gptShow]: showGPT,
// 				})}>
// 				<Chat />
// 			</div>
// 		</HashRouter>
// 	);
// };

// export default App;
