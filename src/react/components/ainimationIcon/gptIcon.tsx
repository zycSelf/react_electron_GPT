import React from 'react';
import Styles from './gptIcon.module.scss';
const GPTIcon = () => {
	return (
		<div className={Styles.titleBox}>
			<div className={Styles.surround}>
				<div className={Styles.ring1}></div>
				<div className={Styles.ring2}></div>
				<div className={Styles.ring3}></div>
				<div className={Styles.ring4}></div>
				<div className={Styles.ring5}></div>
				<div className={Styles.ring6}></div>
			</div>
		</div>
	);
};

export default GPTIcon;
