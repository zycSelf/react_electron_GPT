import React, { useState } from 'react';
import { useEffect } from 'react';

const Son = (props: any) => {
	const [sonName, setSonName] = useState<string>();
	useEffect(() => {
		if (sonName) {
			props.handleClickSon();
		}
	}, [sonName]);

	const clickFunc = () => {
		setSonName((Math.random() * 10000 + 100).toString());
	};
	console.log('renderSon');
	return (
		<div>
			<button onClick={() => clickFunc()}>click</button>
			{sonName}
		</div>
	);
};

// export default Son;
export default React.memo(Son, (prevProps, nextProps) => {
	return prevProps.name !== nextProps.name;
});
