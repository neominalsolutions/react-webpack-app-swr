import React, { useEffect, useState } from 'react';

function UseEffectDemo() {
	const [users, setUsers] = useState([]);

	// useEffect 1. sayfanın ilk açılışındaki network işlemleri
	// state takibi ve state değişimine göre tetiklenmesi
	// [] no deps hali ComponentDidMount
	useEffect(() => {
		console.log('... component load anında burası 1 defaya mahsus tetiklendi.');

		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});
	}, []); // [] herhangi bir state değişimine bağımlılığı yok

	// Not: ilk açılışta bir component içinde ne kadar useEffect varsa hepsi 1 kereye mahsus tetiklenir.

	// componentDidUpdate State takibi varsa
	useEffect(() => {
		console.log('state değişiminde tetiklenir.');

		// c# unmanagement code using kod satırını nasıl yazıyorsak bu component için 3rd bir bileşne ait kill edilmesi gereken bir process varsa kullanırız.
		return () => {
			// componentwillunmount life cycle method denk gelir.
			// clean up functions
			console.log(
				'component domdan çıktığında componentten ayrılınca tetiklenir'
			);
			// socket terminate yada clearInterval, unsubscribe gibi 3rd paketelere ait destruct işlemleri için bu function kullanılır.
		};
	}, [users]); // userState değişimini takip edecek şekilde ayarladık.

	return (
		<>
			{users.map((item: any, index: number) => {
				return <div key={index}>{item.name}</div>;
			})}
		</>
	);
}

export default UseEffectDemo;
