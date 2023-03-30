import React from 'react';
import Styles from './gptIcon.module.scss';
const GPTIcon = () => {
	return (
		<div className={Styles.titleBox}>
			<div className={Styles.rotate1}></div>
			<div className={Styles.rotate2}></div>
			<div className={Styles.rotate3}></div>
			<span className={Styles.title}>GPT</span>
		</div>
	);
};

export default GPTIcon;
