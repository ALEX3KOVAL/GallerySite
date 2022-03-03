class Menu extends AbstractComponent {
  constructor() {
    super();
    this._catalogHandler = null;
    this._favoriteHandler = null;
  }

  getTemplate() {
    return (
        `<div class="container-wrapper">
          <main class="container">
            <div class="site-navigation">
              <div class="navigation__item-catalog">
                <h2 class="catalog">Каталог</h2>
              </div>
              <div class="navigation__item-favorite">
                <h2 class="favorite">Избранное</h2>
              </div>
            </div>
          </main>
         </div>`
    );
  }

  render() {
    render(document.querySelector('body'), this, InsertionPosition.AFTERBEGIN);
  }

  setCatalogHandler(handler) {
    this._catalogHandler = handler;
    this.getElement().querySelector(`.navigation__item-catalog`).addEventListener(`click`, this._catalogHandler);
  }

  setFavoriteHandler(handler) {
    this._favoriteHandler = handler
    this.getElement().querySelector(`.navigation__item-favorite`).addEventListener(`click`, this._favoriteHandler);
  }

  removeCatalogHandler() {
    this.getElement().querySelector(`.navigation__item-catalog`).removeEventListener(`click`, this._catalogHandler);
  }

  removeFavoriteHandler() {
    this.getElement().querySelector(`.navigation__item-favorite`).removeEventListener(`click`, this._favoriteHandler);
  }
}