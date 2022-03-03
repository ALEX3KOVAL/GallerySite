class AlbumImagesController {
	constructor(container, model, id = null) {
		this._preloader = new Preloader();
		this._errorloader = null;
		this._container = container;
		this._model = model;
		this._imagesList = null;
		this._id = id;
	}

	renderPreloaderIn(context) {
		this._preloader.renderIn(context, InsertionPosition.AFTEREND);
		this._preloader.getElement().setAttribute('style', `margin: ${13}% auto ${13}% auto`);
	}

	renderFavoriteImages() {
		this.renderImagesList(ImagesMode.FAVORITE);
	}

	renderErrorLoaderIn(context) {
		if (!this._errorloader) {
			this._errorloader = new ErrorLoader();
		}
			this._errorloader.renderIn(context, InsertionPosition.AFTEREND);
	}

	errorLoaderIsInit() {
		return (Boolean(this._errorloader));
	}


	removeUserImagesPreloader() {
		this._preloader.remove();
	}

	removeUserImagesErrorLoader() {
		this._errorloader.remove();
		this._errorloader = null;
	}


	getModel() {
		return this._model;
	}

	getImages() {
		return this._model.getImages();
	}

	setImages(images) {
		this._model.setImages(images);
	}

	async createImagesListReq() {
		return await this._model.loadImages(this._id).then((images) => {
			this._model.setImages(images);
			this.renderImagesList();
			this.removeUserImagesPreloader();
			return images;
		});
	}

	renderImagesList(mode) {
		this._imagesList = new ImagesList(this._container, this, mode);
		this._imagesList.render();
	}

	remove() {
		this._imagesList.remove();
	}
}