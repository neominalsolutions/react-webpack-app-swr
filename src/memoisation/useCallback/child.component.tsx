import React, { memo, useEffect } from 'react';
import { useState } from 'react';

// 1. Child Component aşağıdaki gibi bir action props sahip ise onMinuteChange props gibi,
// js functionlarda referans type değişkenler olduğu için, child component de react memo kullanımı yapsak dahi, memo(CountDownLabel) kullanımına rağmen, parent componentteki kendisine ait bir state değişikiliği componentin gereksiz yere render almasını sağlar. bunu önlemek için tek başına react memo yeterli değildir. React Memo ile birlikte parent component de child componente ait action useCallback function ile sarmalanmakıdır.

type Props = {
	_counter?: number;
	onMinuteChange?: (minute: number) => void;
};

// sayacı kendi içinde saniyede 1 artıran bir component
// Her 1 dakikada bir bir event fırlatıp dakika bilgisi versin.
function CountDownLabel({ _counter, onMinuteChange }: Props) {
	const [counter, setCounter] = useState<number>(_counter || 0);
	let timer: any;

	console.log('...rendering');

	useEffect(() => {
		// her dakikada 1 değer pushla.
		if (counter % 60 == 0) {
			if (onMinuteChange) {
				onMinuteChange(counter / 60);
			}
		}

		timer = setInterval(() => {
			setCounter(counter + 1);
		}, 1000);

		// bir önceki instance uçuyor.
		return () => {
			console.log('clean-up');
			clearInterval(timer);
		};
	}, [counter]);

	return <>Sayım: {counter}</>;
}

export default memo(CountDownLabel);
