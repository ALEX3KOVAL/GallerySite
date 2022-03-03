class UsersListController {
	constructor(model, siteController) {
		this._preloader = new Preloader();
		this._errorloader = null;
		this._siteController = siteController;
		this._usersList = null;
		this._model = model;
	}

	renderPreloader(context) {
		this._preloader.renderIn(context, InsertionPosition.BEFOREEND);
	}

	renderErrorLoaderIn(context) {
		if (!this._errorloader) {
			this._errorloader = new ErrorLoader();
		}
		this._errorloader.renderIn(context, InsertionPosition.BEFOREEND);
	}

	usersListIsEmpty() {
		return (!this._usersList && typeof this._usersList === 'object');
	}

	removeUsersListPreloader() {
		this._preloader.remove();
	}

	removeErrorLoader() {
		this._errorloader.remove();
	}

	getModel() {
		return this._model;
	}

	createUsersList() {
		this.renderPreloader(this);
		this._model.loadUsers().then((users) => {
			this.removeUsersListPreloader();
			this._model.setUsers(users);
			this.renderUsersList();
		}, () => {
			this.removeUsersListPreloader();
			this.renderErrorLoaderIn(this);
		});
	}

	renderUsersList() {
		this._usersList = new UsersList(this);
		this._usersList.render();
		resizeMainContainer(30);
	}

	remove() {
		this._usersList.remove();
	}
}