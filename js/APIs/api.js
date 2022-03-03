class API {
  async getUsers() {
    const response = await fetch(`https://json.medrating.org/users/`);
    return await response.json();
  }

  async getAlbums(id) {
    const response = await fetch(`https://json.medrating.org/albums?userId=${id}`);
    return await response.json();
  }

  async getImages(id) {
    const response = await fetch(`https://json.medrating.org/photos?albumId=${id}`);
    return await response.json();
  }
};