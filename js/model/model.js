class Model {
  constructor(api, controller) {
    this._api = api;
    this._users = null;
    this._albums = null;
    this._images = null;
    this._siteController = controller;

    this._onUsersLoadSuccessHandlers = [];
    this._onAlbumsLoadSuccessHandlers = [];
    this._onImagesLoadSuccessHandlers = [];
  }

  async loadUsers() {
    try {
      return this._api.getUsers();
    }
    catch {

    }
  }

  async loadAlbums(id) {
    try {
      return await this._api.getAlbums(id);
    }
    catch {

    }
  }

  async loadImages(id) {
    try {
      return await this._api.getImages(id);
    }
    catch {
    }
  }

  setToLocalStorage(image) {
    let currentLocalStorage = [];

    if (!this._isInLocalStorage()) {
      currentLocalStorage.push(image);
      localStorage.images = JSON.stringify(currentLocalStorage);
    } else {
      currentLocalStorage = this.getFromLocalStorage();
      const index = currentLocalStorage.findIndex((item) => item.id === image.id);

      if (index === -1) {
        currentLocalStorage.push(image);
        localStorage.images = JSON.stringify(currentLocalStorage);
      } else {
        currentLocalStorage = [].concat(currentLocalStorage.slice(0, index), currentLocalStorage.slice(index + 1));
        localStorage.images = JSON.stringify(currentLocalStorage);
      }
    }
  }

  _isInLocalStorage() {
    const localStorageKeys = Object.keys(localStorage);
    const keyIndex = localStorageKeys.findIndex((item) => item === `images`);
    return keyIndex === -1 ? false : true;
  }

  getUsers() {
    return this._users;
  }

  getAlbums() {
    return this._albums;
  }

  getImages() {
    return this._images;
  }

  setUsers(users) {
    this._users = users;
  }

  setAlbums(albums) {
    this._albums = albums;
  }

  setImages(images) {
    this._images = images;
  }

  setToLocalStorage(image) {
    let currentLocalStorage = [];

    if (!this._isInLocalStorage()) {
      currentLocalStorage.push(image);
      localStorage.images = JSON.stringify(currentLocalStorage);
    } else {
      currentLocalStorage = this.getFromLocalStorage();
      const index = currentLocalStorage.findIndex((item) => item.id === image.id);

      if (index === -1) {
        currentLocalStorage.push(image);
        localStorage.images = JSON.stringify(currentLocalStorage);
      } else {
        currentLocalStorage = [].concat(currentLocalStorage.slice(0, index), currentLocalStorage.slice(index + 1));
        localStorage.images = JSON.stringify(currentLocalStorage);
      }
    }
  }

  getFromLocalStorage() {
    if (this._isInLocalStorage()) {
      return JSON.parse(localStorage.images);
    }

    return false;
  }

  setUsersSuccessLoadHandler(handler) {
    this._onUsersLoadSuccessHandlers.push(handler);
  }

  setAlbumsLoadSuccessHandlers(handler) {
    this._onAlbumsLoadSuccessHandlers.push(handler);
  }

  setImagesLoadSuccessHandlers(handler) {
    this._onImagesLoadSuccessHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}