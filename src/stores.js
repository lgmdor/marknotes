import { writable } from 'svelte/store';

export const isEditorVisible = writable(false);
export const editorInput = writable('');
export const editorNoteKey = writable(null);
