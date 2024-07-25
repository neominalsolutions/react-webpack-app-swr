import React, { useMemo, useState } from 'react';

// useCallback gibi bir değerin yeniden hesaplanmasını engelleyip değeri memoize etmek için kullanılan bir performans yöntemi
// useEfect örneğinde olduğu gibi state bazlı ilgili değerin değişimi sağlanabiliyor.

function UseMemoDemo() {
	// expensiveCal function visible state değişitiğinde boş yere tekrar hesaplanmamalıdır.
	const [visible, setVisible] = useState<boolean>(false);
	const [customerType, setCustomerType] = useState<string>('bireysel');

	const expensiveCal = () => {
		console.log('...calculating ' + customerType);
		// uzun bir hesaplama kodu var
		return 1000;
	};

	// sayfa ilk açıldığında sadece hesaplanacak başka bir state değişiminden etkilenmeyecek.
	let calculation = useMemo(() => expensiveCal(), [customerType]);

	return (
		<>
			<select onChange={(e: any) => setCustomerType(e.target.value)}>
				<option value={'bireysel'}>Bireysel</option>
				<option value={'kurumsal'}>Kurumsal</option>
			</select>
			<p>Hesaplanan : {calculation}</p>
			<hr></hr>
			<p>Visible State: {visible ? 'Açık' : 'Kapalı'}</p>
			<button onClick={() => setVisible(!visible)}>Göster/Gizle</button>
		</>
	);
}

export default UseMemoDemo;
