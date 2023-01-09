export function Note(text, tags) {
	this.text = text;
	this.tags = tags || [];
}

export function Tag(name, isActive) {
	this.name = name;
	this.isActive = isActive || true;
}
