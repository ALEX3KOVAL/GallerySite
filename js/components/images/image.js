class Image extends AbstractComponent {
	constructor(image, mode = ImagesMode.CATALOG) {
		super();
		this._mode = mode;
		this._image = image;
	}

	renderIn(container) {
		render(container, this, InsertionPosition.BEFOREEND);
	}

	getTemplate() {
		let imageTitle = ``;
		let favorite = ``;
		let titleHoverClass = `image__wrapper--hover`;

		if (this._mode !== ImagesMode.CATALOG) {
			imageTitle = title;
	        favorite = `checked`;
	        titleHoverClass = ``;
		}
		return (
				`<div class="images__item-wrapper">
					<li class="images__item">
						<div class="user__album-image">
							<img src="${this._image.thumbnailUrl}">
						</div>
						<div class="empty-star__picture">
					 		<img>
					 	</div>
					 </li>
				</div>`);
	}

	setFavoriteBtnHandler(handler) {
		this.getElement().querySelector('.empty-star__picture').addEventListener('click', handler);
	}

	setHoverHandler(handler) {
		this.getElement().querySelector('.user__album-image').addEventListener('mouseover', handler);
	}

	setMouseOutHandler(handler) {
		this.getElement().querySelector('.images__item').addEventListener('mouseout', handler);
	}

	setOpenPopupHandler(handler) {
		this.getElement().querySelector('.user__album-image').addEventListener('click', handler);
	}
}