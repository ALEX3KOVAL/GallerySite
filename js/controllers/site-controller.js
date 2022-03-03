class SiteController {
	constructor() {
		this._model = new Model(new API(), this);
	    this._onCatalogClick = this._onCatalogClick.bind(this);
	    this._onFavoriteClick = this._onFavoriteClick.bind(this);
	    this._menu = null;
	    this._emptyloader = null;
	    this._albumImagesController = null;
	  	this._usersListController = null;
	}

	renderSiteMenu() {
		this._menu = new Menu();
		this._menu.setFavoriteHandler(this._onFavoriteClick);
		this._menu.render();
	}

	createUsersList() {
		if (!this._usersListController) {
			this._usersListController = new UsersListController(this._model, this);
		}
		this._usersListController.createUsersList();
	}

	pageIsReady() {
		return document.readyState === "complete";
	}

	_onCatalogClick() {
		if (this._emptyloader) {
			this._emptyloader.remove();
		}
		
		if (this._albumImagesController) {
	      this._albumImagesController.remove();
    	}
    	redesignCatalogBtn(RedesignBtn.OFF);
	    redesignFavoriteBtn(RedesignBtn.OFF);

	    if (!this._usersListController.usersListIsEmpty()) {
    		this._usersListController.renderUsersList();
    	}
    	else {
    		this.createUsersList();
    	}
	    this._menu.removeCatalogHandler();
	    this._menu.setFavoriteHandler(this._onFavoriteClick);
	}

	_onFavoriteClick() {
		this._emptyloader = new EmptyLoader();
		if (this._model.getFromLocalStorage().length === 0) {
			this._emptyloader.render(InsertionPosition.BEFOREEND);
		} 
		if (!this._usersListController.usersListIsEmpty()) {
	      this._usersListController.remove();
	    }
	    else {
	     this._usersListController.removeErrorLoader();
	    }
	    this._menu.setCatalogHandler(this._onCatalogClick);
	    redesignCatalogBtn(RedesignBtn.ON);
	    redesignFavoriteBtn(RedesignBtn.ON);
	    this._albumImagesController = new AlbumImagesController(null, this._model);
	    this._albumImagesController.renderFavoriteImages();
	    this._menu.removeFavoriteHandler();
	    resizeMainContainer(275);
	}


}