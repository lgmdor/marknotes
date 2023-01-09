import Dexie from 'dexie';

export const db = new Dexie('dbMarknotes');

db.version(1).stores({
	notes: '++id, text, *tags',
	tags: '++id, name, isActive'
});
