import React, { useCallback, useState } from 'react';
import CountDownLabel from './child.component';

function UseCallBackDemo() {
	const [remainingMinute, setRemainingMinute] = useState<number>(5);

	return (
		<>
			<p>Kalan Süre: {remainingMinute} dakika</p>
			<hr></hr>
			<CountDownLabel
				_counter={60}
				onMinuteChange={useCallback((minute: number) => {
					console.log('dakika' + minute);
					setRemainingMinute(remainingMinute - minute);
				}, [])}
			/>
			<button
				onClick={() => {
					setRemainingMinute(remainingMinute - 1);
				}}
			>
				Manuel Süre Azalt
			</button>
			<hr></hr>
		</>
	);
}

export default UseCallBackDemo;
