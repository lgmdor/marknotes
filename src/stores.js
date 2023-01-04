import { writable } from 'svelte/store';

export const isEditorVisible = writable(false);
export const db = writable(null);
export const notesLocal = writable([]);
export const editorInput = writable('');
