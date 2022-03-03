class AlbumsList extends AbstractComponent {
	constructor(userItem, controller) {
		super();
		this._controller = controller;
		this._userItem = userItem;
		this._albumsList = this._controller.getModel().getAlbums();
		this._objectOfAlbumsImages = {};
	}

	render() {
		this._renderElements();
		render(this._userItem, this, InsertionPosition.AFTEREND);
		resizeMainContainer(-120);
	}

	_renderElements() {
		for (const album of Object.values(this._albumsList)) {
			const albumComponent = new Album(album);

			const imagesComponentHandler = () => {
	        let imagesController = new AlbumImagesController(albumComponent, this._controller.getModel(), album.id);
	        if (album.id in this._objectOfAlbumsImages) 
	        {
	        	imagesController.setImages(this._objectOfAlbumsImages[`${album.id}`]);
	        	imagesController.renderImagesList(ImagesMode.CATALOG);
	        }
	        else 
	        {
	        	imagesController.renderPreloaderIn(albumComponent);
	        	imagesController.createImagesListReq().then((images) => {
	        		this._objectOfAlbumsImages[`${album.id}`] = images;
	        	}, () => {
	        		imagesController.removeUserImagesPreloader();
	        		imagesController.renderErrorLoaderIn(albumComponent);
	        		resizeMainContainer(20);
	        	});
	        }
	        resizeMainContainer(10);
	        albumComponent.removeImagesRenderHandler();

	        albumComponent.setCollapseHandler(() => {
	        	if (imagesController.errorLoaderIsInit()) {
	        		imagesController.removeUserImagesErrorLoader();
	        	}
	        	imagesController.remove();
	        	albumComponent.setImagesRenderHandler(imagesComponentHandler);
	        	showVertLine(albumComponent);
	        	resizeMainContainer(25);

	        });
	        hideVertLine(albumComponent);
	    }
	    	albumComponent.setImagesRenderHandler(imagesComponentHandler);

			albumComponent.renderIn(this);
		}
	}

	getTemplate() {
		return (
				`<ul class="albums-list">
				 </ul>`
				);
	}

	remove() {
		this.getElement().remove();
	} 
}