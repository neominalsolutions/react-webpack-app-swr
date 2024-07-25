import React, { useRef, useState } from 'react';

// state üzerinde verileri tutmadan arka planda hesaplamak için kullanılan bir teknik.
// bu sebep ile gerekesiz renderın önüne geçiyoruz.
// useRef html elementin referansına erişmek // useRef<HTMLButtonElement>(null);
// bir değişken değerini memoize edip state değişiminde değerin korunmasını sağlamak. // useRef<number>(0);
function UseRefDemo() {
	// 10 basıştan sonra butonu kitleyeceğiz
	const buttonClickCount = useRef<number>(0);
	const btnRef = useRef<HTMLButtonElement>(null);

	const [btnClickCount, setbtnClickCount] = useState<number>(0);
	const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

	let btnClkCount = 0; // normal bir variable

	// not useRef state değişimi sonrasında dahi değeri memoize eder. değer sıfırlanmaz.
	console.log('...rendering');

	console.log('buttonClickCount', buttonClickCount);
	console.log('btnClickCount', btnClickCount);
	console.log('btnClkCount', btnClkCount);

	const onBtnClickWithUseRef = () => {
		if (buttonClickCount.current >= 10) {
			// butonu disabled et.

			if (btnRef.current) {
				btnRef.current.disabled = true;
			}
		} else {
			btnClkCount = btnClkCount + 1;
		}

		buttonClickCount.current = buttonClickCount.current + 1;
		console.log('buttonClickCount.current', buttonClickCount.current);
		console.log('btnClkCount-Normal', btnClkCount);
	};

	const onBtnClickWithUseState = () => {
		if (btnClickCount + 1 >= 10) {
			setBtnDisabled(true);
		} else {
			setbtnClickCount(btnClickCount + 1);
			console.log('btnClickCount', btnClickCount + 1);
		}
	};

	// UseRef kullanılarak tutulan değişken değerleri bir sonraki rendera kadar arayüze yansımaz.
	// Arayüze yansıtılacak bir değişken ile çalışıyorsak bu durumda useState kullanımınıu öneririz.
	// Yada Arayüze yansıtılacak değer bir element ise disabled örneğinde olduğu gibi useRef 'i element ile birlikte kullanarak da bu işlemi gereçekleştirebiliriz.

	return (
		<>
			<div>Button Click Sayısı {buttonClickCount.current}</div>

			<p>
				<button ref={btnRef} onClick={onBtnClickWithUseRef}>
					Click Count With UseRef
				</button>
			</p>
			<p>
				<button disabled={btnDisabled} onClick={onBtnClickWithUseState}>
					Click Count With UseState
				</button>
			</p>
		</>
	);
}

export default UseRefDemo;
