class User extends AbstractComponent {
	constructor(user) {
		super();
		this._user = user;
		this._albumsRenderHandler = null;
	}

	renderIn(container) {
		render(container, this, InsertionPosition.BEFOREEND);
	}

	getTemplate() {
    return (
      `<li class="users__item">
      	<div class="user__block-wrapper">
      		<div class="user__block">
      			<div class="marker__block">
	      			<div class="cross__block">
	      				<div class="hor__line"></div>
	      				<div class="vert__line"></div>
	      			</div>
	      		</div>
        		<h1 class="user__name">${this._user.name}</h1>
        	</div>
      	</div>
      </li>`
    );
  }

  setAlbumsRenderHandler(handler) {
    this._albumsRenderHandler = handler;
    this.getElement().querySelector('.user__block')
      .addEventListener(`click`, this._albumsRenderHandler);
  }

  setCollapseHandler(handler) {
    this.getElement().querySelector('.user__block')
      .addEventListener(`click`, handler);
  }

  removeAlbumsRenderHandler() {
    this.getElement().querySelector('.user__block')
      .removeEventListener(`click`, this._albumsRenderHandler);
  }
}