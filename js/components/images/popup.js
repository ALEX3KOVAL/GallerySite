class Popup extends AbstractComponent {
	constructor(image) {
		super();
		this._image = image;
	}

	render() {
		render(document.querySelector('body'), this, InsertionPosition.AFTERBEGIN);
	}

	getTemplate() {
		return (
				`<div class="popup">
					<div class="close_popup"></div>
					<img class="popup__picture" src="${this._image.url}">
				 </div>`);
	}

	remove() {
		this.getElement().remove();
	}

	setCloseHandler(handler) {
		this.getElement().querySelector('.close_popup').addEventListener('click', handler);
	}

	setCloseESCBtnHandler(handler) {
		document.addEventListener('keydown', handler);
	}
}