class ImagesList extends AbstractComponent {
	constructor(context, controller, mode = ImagesMode.CATALOG) {
		super();
		this._controller = controller;
		this._popup = null;
		this._context = context;
		this._imagesList = mode === ImagesMode.CATALOG ?  this._controller.getModel().getImages() : this._controller.getModel().getFromLocalStorage();
		this._mode = mode;
	}

	render() {
		this._renderElements();
		if (this._mode === ImagesMode.FAVORITE) {
			render(this._context, this, InsertionPosition.BEFOREEND, true);
		}
		else {
			render(this._context, this, InsertionPosition.AFTEREND);
		}
		resizeMainContainer(4100);
	}

	_renderElements() {
		for (const image of Object.values(this._imagesList)) {
			const imageComponent = new Image(image);
			if (this._mode === ImagesMode.FAVORITE) {
				imageComponent.getElement().querySelector('.empty-star__picture').classList.toggle('active-star__picture');
				let titleElement = document.createElement('p');
				titleElement.className = "image__title";
				titleElement.innerHTML = image.title;
				imageComponent.getElement().querySelector('.images__item').append(titleElement);
				imageComponent.getElement().querySelector('.active-star__picture').style = 'top:-54%';
			}
			else {
			let localStorage = this._controller.getModel().getFromLocalStorage();
				if (localStorage) {
					for (const element of localStorage) {
						if (element.albumId === image.albumId && element.url === image.url) {
							imageComponent.getElement().querySelector('.empty-star__picture').classList.toggle('active-star__picture');
							break;
						}
					}
				}
			}

			imageComponent.setFavoriteBtnHandler(() => {
				imageComponent.getElement().querySelector('.empty-star__picture').classList.toggle('active-star__picture');
				this._controller.getModel().setToLocalStorage(image);
			});

			imageComponent.setOpenPopupHandler(() => {
				this._popup = new Popup(image);
				this._popup.render();
				this._popup.setCloseHandler(() => {
					this._popup.remove();
				});
				this._popup.setCloseESCBtnHandler((evt) => {
					if (evt.key === 'Escape') {
						this._popup.remove();
					}
				});
			});

			imageComponent.setHoverHandler((evt) => {
				let hoverElement = document.createElement('div');
				let coord = {x : evt.offsetX,  y : evt.offsetY};
				hoverElement.className = "image__hover";
				hoverElement.style = `background-color: black; opacity:0.5;font-family: Roboto;font-style: normal;font-weight: normal;font-size: 12px;display: inline-block; padding: 4px 8px;color:white;background-color:black;border-radius:10px;cursor:pointer;border: 2px solid blue;position:relative;width:130px;bottom:${-1*(coord.y * 0.66) - 50}px;right:${-1*(coord.x * 0.66)+260}px`;
				let text = document.createElement('div');
				text.style = "display:inline-block";
				text.innerHTML = image.title;
				hoverElement.append(text);
				imageComponent.getElement().append(hoverElement);
			});

			imageComponent.setMouseOutHandler(() => {
				imageComponent.getElement().getElementsByClassName('image__hover')[0]?.remove();
			})
			imageComponent.renderIn(this);
		}
		resizeMainContainer(4100);
	}

	getTemplate() {
		return (
				`<ul class="images-list">
				 </ul>`
				);
	}

	remove() {
		this.getElement().remove();
	}
}