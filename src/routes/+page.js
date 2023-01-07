/*import { browser } from '$app/environment';

let db;

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

			resolve(db);
		};
	});
};

//--------
export async function load({ params }) {
	if (browser) {
		await openDB();

		return {
			db
		};
	}
}*/
