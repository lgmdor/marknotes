import { writable } from 'svelte/store';

export const isPopupVisible = writable(false);
export const editorInput = writable('');
export const editorNoteKey = writable(null);
export const editorNoteTags = writable([]);
