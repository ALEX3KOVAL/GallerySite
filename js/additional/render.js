const InsertionPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const RedesignBtn = {
  ON: `on`,
  OF: `off`
}

const LoaderMode = {
  PRE: `pre`,
  ERR: `error`
}

const ImagesMode = {
  CATALOG: `catalog`,
  FAVORITE: `favorite`
}

const render = (container, component, position , favorite = null) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }
  if (favorite) {
    container = document.querySelector('.container');
  }
  switch (position) {
    case InsertionPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case InsertionPosition.AFTEREND:
      container.after(component.getElement());
      break;
    case InsertionPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const resizeMainContainer = (pxs) => {
  document.querySelector('.container-wrapper').setAttribute('style', `height:${document.querySelector('.container').offsetHeight + pxs}px`);
}

const hideVertLine = (context) => {
  context.getElement().querySelector('.vert__line').setAttribute('style', "display:none");
}

const showVertLine = (context) => {
  context.getElement().querySelector('.vert__line').setAttribute('style', 'display:initial');
}

const redesignFavoriteBtn = (state) => {
  switch (state) {
    case RedesignBtn.ON:
    document.querySelector('.navigation__item-favorite').setAttribute('style', 'background: #edf9ff');
    document.querySelector('.favorite').setAttribute('style', 'color: #117dc1');
    break;
    case RedesignBtn.OFF:
    document.querySelector('.navigation__item-favorite').setAttribute('style', 'background: #fbfbfb');
    document.querySelector('.favorite').setAttribute('style', 'color: #1c1c1c');
    break;
  }
}

const redesignCatalogBtn = (state) => {
  switch (state) {
    case RedesignBtn.ON:
    document.querySelector('.navigation__item-catalog').setAttribute('style', 'background: #fbfbfb');
    document.querySelector('.catalog').setAttribute('style', 'color: #1c1c1c');
    break;
    case RedesignBtn.OFF:
    document.querySelector('.navigation__item-catalog').setAttribute('style', 'background: #edf9ff');
    document.querySelector('.catalog').setAttribute('style', 'color: #117dc1');
    break;
  }
}
