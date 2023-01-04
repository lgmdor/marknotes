import { browser } from '$app/environment';

let db;
let notes;

const openDB = () => {
	return new Promise((resolve, reject) => {
		const request = window.indexedDB.open('db1');

		request.onerror = (e) => reject(e);

		request.onupgradeneeded = (e) => {
			db = request.result;
			db.createObjectStore('notes');
		};

		request.onsuccess = (e) => {
			db = request.result;

			//db.transaction('notes', 'readwrite').objectStore('notes').add('oki', Math.random());
			const trans = db.transaction('notes').objectStore('notes').getAll();

			trans.onsuccess = (e) => {
				notes = trans.result;
				resolve(notes);
			};
		};
	});
};

//--------
export async function load({ params }) {
	if (browser) {
		const x = await openDB();

		console.log(x);

		return {
			db,
			notes
		};
	}
}
