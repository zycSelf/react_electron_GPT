import React, { useEffect, useRef, useState } from 'react';
import Styles from './rotateCard.module.scss';

const RotateCard = () => {
	const cardRef = useRef<HTMLDivElement>(null);
	const [basicData, setBasicData] = useState({
		cardWidth: 0,
		cardHeight: 0,
		cardCenter: {
			x: 0,
			y: 0,
		},
		cardHyp: 0,
	});
	const [cardTransform, setCardTransform] = useState('rotate3d(0,0,0,0deg)');
	useEffect(() => {
		if (cardRef.current) {
			setBasicData({
				cardWidth: cardRef.current.offsetWidth,
				cardHeight: cardRef.current.offsetHeight,
				cardCenter: {
					x: cardRef.current.offsetWidth / 2,
					y: cardRef.current.offsetHeight / 2,
				},
				cardHyp: Math.sqrt(
					cardRef.current.offsetHeight ** 2 + cardRef.current.offsetWidth ** 2,
				),
			});
		}
	}, [cardRef]);
	const cardMouseMove = (e: React.MouseEvent) => {
		if (cardRef.current) {
			const skewX = Math.abs(e.nativeEvent.offsetX - basicData.cardCenter.x);
			const skewY = Math.abs(e.nativeEvent.offsetY - basicData.cardCenter.y);
			const skew = Math.sqrt(skewX * skewX + skewY * skewY);
			const degY =
				-(e.nativeEvent.offsetX - basicData.cardCenter.x) /
				basicData.cardCenter.x;
			const degX =
				(e.nativeEvent.offsetY - basicData.cardCenter.y) /
				basicData.cardCenter.y;
			const deg = (skew / basicData.cardHyp) * 30;
			setCardTransform(`rotate3d(${degX}, ${degY},0,${deg}deg)`);
		}
	};
	return (
		<div className={Styles.scene}>
			<div
				ref={cardRef}
				style={{ transform: cardTransform }}
				onMouseMove={cardMouseMove}
				className={Styles.card}>
				Card
			</div>
		</div>
	);
};

export default RotateCard;
