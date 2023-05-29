import { useState } from 'react';
import Son from './son';
import React from 'react';

const Father = (props: any) => {
	const [name, setName] = useState<string>();
	const handleClickSon = () => {
		setName('asdflkjasd');
	};
	console.log('renderFather');
	return <Son name={name} handleClickSon={handleClickSon} />;
};
export default Father;
