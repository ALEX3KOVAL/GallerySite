class UserAlbumsController {
	constructor(container, model, id) {
		this._preloader = new Preloader();
		this._errorloader = null;
		this._container = container;
    	this._model = model;
    	this._albumsList = null;
    	this._id = id;
	}

	renderPreloaderIn(context) {
		this._preloader.renderIn(context, InsertionPosition.AFTEREND);
	}

	renderErrorLoaderIn(context) {
		if (!this._errorloader) {
			this._errorloader = new ErrorLoader();
		}
			this._errorloader.renderIn(context, InsertionPosition.AFTEREND);
	}

	getModel() {
		return this._model;
	}

	errorLoaderIsInit() {
		return (Boolean(this._errorloader));
	}


	removeUserAlbumsPreloader() {
		this._preloader.remove();
	}

	removeUserAlbumsErrorLoader() {
		this._errorloader.remove();
		this._errorloader = null;
	}

	getAlbums() {
		return this._model.getAlbums();
	}

	setAlbums(albums) {
		this._model.setAlbums(albums);
	}

	async createAlbumsListReq() {
		return await this._model.loadAlbums(this._id).then((albums) => {
			this._model.setAlbums(albums);
			this.renderAlbumsList();
			this.removeUserAlbumsPreloader();
			return albums;
		}, () => {
		});
	}

	renderAlbumsList() {
		this._albumsList = new AlbumsList(this._container, this);
		this._albumsList.render();
	}

	remove() {
		this._albumsList.remove();
	}
}