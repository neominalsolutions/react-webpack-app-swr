import React, { useState } from 'react';

function UseStateDemo() {
	console.log('... rendering');

	// getter=> random okumak için
	// setter => random değerini state üzerinden güncellemek için
	const [random, setRandom] = useState<number>(0);

	const changeRandom = () => {
		setRandom(Math.round(Math.random() * 100));
		// arayüz güncellemesi için virtaul dom tetiklenmesi lazım setState tetkleme sağlar:
        // random  = 5;
	};

	// render method bu sebeple tekrardan tetiklenmesi için state değişimi olmalı.
	return (
		<>
			<p>Random: {random}</p>
			<button onClick={changeRandom}>Random</button>
		</>
	);
}

export default UseStateDemo;
