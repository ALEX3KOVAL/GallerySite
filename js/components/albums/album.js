class Album extends AbstractComponent {
	constructor(album) {
		super();

		this._album = album;
		this._renderHandler = null;
	}

	renderIn(container) {
		render(container, this, InsertionPosition.BEFOREEND);
	}

	getTemplate() {
		return(
				`<li class="albums__item"
					<div class="user__album--block-wrapper">
						<div class="user__album--block">
							<div class="marker__block">
		      					<div class="cross__block">
		      						<div class="hor__line"></div>
		      						<div class="vert__line"></div>
		      					</div>
		      				</div>
							<h2 class="user__album">${this._album.title}</h2>
						</div>
					</div>
				 </li>`);
	}

setImagesRenderHandler(handler) {
    this._albumsRenderHandler = handler;
    this.getElement().querySelector(`.user__album--block`).addEventListener(`click`, this._albumsRenderHandler);
}

  setCollapseHandler(handler) {
    this.getElement().querySelector(`.user__album--block`).addEventListener(`click`, handler);
  }

  removeImagesRenderHandler() {
    this.getElement().querySelector(`.user__album--block`).removeEventListener(`click`, this._albumsRenderHandler);
  }
}