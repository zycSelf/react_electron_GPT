/* eslint-disable react/no-unknown-property */
import React from 'react';
import {
	appClose,
	appMaximize,
	appMinimize,
	appResize,
} from '../../util/appOperate/operate';
import Styles from './headerOperate.module.scss';
const AppHeaderOperate = () => {
	const [maxmize, setMaxmize] = React.useState<boolean>(false);
	return (
		<div className={Styles.appOperation}>
			<div className={Styles.minmize} onClick={() => appMinimize()} />
			{maxmize ? (
				<div
					className={Styles.resize}
					onClick={() => {
						setMaxmize(false);
						appResize();
					}}
				/>
			) : (
				<div
					className={Styles.maxmize}
					onClick={() => {
						setMaxmize(true);
						appMaximize();
					}}
				/>
			)}
			<div className={Styles.close} onClick={() => appClose()} />
		</div>
	);
};

export default AppHeaderOperate;
