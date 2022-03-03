class UsersList extends AbstractComponent {
	constructor(controller) {
		super();
		this._controller = controller;
		this._usersList = this._controller.getModel().getUsers();
		this._objectOfUsersAlbums = {};
	}

	render() {
		this._renderElements();
		render(document.querySelector('.container'), this, InsertionPosition.BEFOREEND);
	}

	_renderElements() {
		for (const user of Object.values(this._usersList)) {
			const userComponent = new User(user);
	      	const albumsComponentHandler = (event) => {
	        let albumsController = new UserAlbumsController(userComponent, this._controller.getModel(), user.id);
	        if (user.id in this._objectOfUsersAlbums) 
	        {
	        	albumsController.setAlbums(this._objectOfUsersAlbums[`${user.id}`]);
	        	albumsController.renderAlbumsList();
	        }
	        else 
	        {
	        	albumsController.renderPreloaderIn(userComponent);
	        	albumsController.createAlbumsListReq().then((albums) => {
	        		this._objectOfUsersAlbums[`${user.id}`] = albums;
	        	}, () => {
	        		albumsController.removeUserAlbumsPreloader();
	        		albumsController.renderErrorLoaderIn(userComponent);
	        		resizeMainContainer(20);
	        	});
	        }
	        resizeMainContainer(10);
	        userComponent.removeAlbumsRenderHandler();

	        userComponent.setCollapseHandler((evt) => {
	        	if (albumsController.errorLoaderIsInit()) {
	        		albumsController.removeUserAlbumsErrorLoader();
	        	}
	        	albumsController.remove();
	        	userComponent.setAlbumsRenderHandler(albumsComponentHandler);
	        	showVertLine(userComponent);
	        	resizeMainContainer(25);

	        });
	        hideVertLine(userComponent);
	    }
	      	userComponent.setAlbumsRenderHandler(albumsComponentHandler);
	      	userComponent.renderIn(this);
    	}
	}

	getTemplate() {
		return (
				`<ul class="users-list">
				 </ul>`
				);
	}

	remove() {
		this.getElement().remove();
	}

}