class Preloader extends AbstractComponent {
	constructor() {
		super();
	}

	renderIn(context, pos) {
		switch (context.constructor.name) {
			case 'UsersListController':
				render(document.querySelector('.container'), this, pos);
				break;
			default:
				render(context, this, pos);
				for(let element of document.getElementsByClassName('preloader')) {
					element.style = "margin:60px 38% 60px 23%;";
				}
				break;
		}	
	}

	getTemplate() {
		return (
			`<div class="preloader">
				<div class="info-wrapper">
					<img src="statics/loader.gif">
				</div>
			 </div>`
			);
	}

	remove() {
		document.querySelector('.preloader').remove();
	}
}


class ErrorLoader extends AbstractComponent {
	constructor() {
		super();
	}

	renderIn(context, pos) {
		switch(context.constructor.name) {
			case 'UsersListController':
				render(document.querySelector('.container'), this, pos);
				break;
			default:
				render(context, this, pos);
				for(let element of document.getElementsByClassName('errorloader')) {
					element.getElementsByClassName('info-wrapper')[0].style = "flex-direction:row";
					element.style = "margin:60px 10% 60px 25%; width:70%; height: 160px";
					element.getElementsByClassName('messages')[0].style = "align-items: flex-start;padding-left:4%; margin-top:5px";
				}
				break;
		}
		
	}

	getTemplate() {
		return (
			`<div class="errorloader">
				<div class="info-wrapper">
					<img src="statics/error.jpg">
					<div class="messages">
						<h1>Сервер не отвечает</h1>
						<h2>Уже работаем над этим</h2>
					</div>
				</div>
			 </div>`
			);
	}

	remove() {
		this.getElement().remove();
	}
}


class EmptyLoader extends AbstractComponent {
	constructor() {
		super();
	}

	render(pos) {
		render(document.querySelector('.container'), this, pos);
	}

	getTemplate() {
		return (
			`<div class="emptyloader">
				<div class="info-wrapper">
					<img src="statics/empty.png">
					<div class="messages">
						<h1>Список избранного пуст</h1>
						<h2>Добавляйте изображения, нажимая на звёздочки</h2>
					</div>
				</div>
			 </div>`
			);
	}

	remove() {
		this.getElement().remove();
	}
}