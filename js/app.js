var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };



// === lazy load ==================================================================
document.addEventListener("DOMContentLoaded", function () {
	var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

	if ("IntersectionObserver" in window) {
		let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					let lazyImage = entry.target;
					lazyImage.src = lazyImage.dataset.src;
					//lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove("lazy");
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	} else {
		// Possibly fall back to event handlers here
	}
});
// === // lazy load ==================================================================

$(document).ready(function () {
	document.body.classList.add('is-load');

	//SlideToggle
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================




// === Конвертация svg картинки в svg код ==================================================================
$('img.img-svg').each(function(){
  var $img = $(this);
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  $.get(imgURL, function(data) {
    var $svg = $(data).find('svg');
    if(typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass+' replaced-svg');
    }
    $svg = $svg.removeAttr('xmlns:a');
    if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }
    $img.replaceWith($svg);
  }, 'xml');
});
// === // Конвертация svg картинки в svg код ==================================================================



//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling)
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');

				
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
//spollerInit()
// === // Spollers ==================================================================;
	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}

//Вызываем функцию
move();

*/
;
	// //let btn = document.querySelectorAll('button[type="submit"],input[type="submit"]');
// let forms = document.querySelectorAll('form');
// if (forms.length > 0) {
// 	for (let index = 0; index < forms.length; index++) {
// 		const el = forms[index];
// 		el.addEventListener('submit', form_submit);
// 	}
// }
// function form_submit(e) {
// 	let btn = event.target;
// 	let form = btn.closest('form');
// 	let message = form.getAttribute('data-message');
// 	let error = form_validate(form);
// 	if (error == 0) {
// 		//SendForm
// 		form_clean(form);
// 		if (message) {
// 			popup_open('message-' + message);
// 			e.preventDefault();
// 		}
// 	} else {
// 		let form_error = form.querySelectorAll('._error');
// 		if (form_error && form.classList.contains('_goto-error')) {
// 			_goto(form_error[0], 1000, 50);
// 		}
// 		event.preventDefault();
// 	}
// }
// function form_validate(form) {
// 	let error = 0;
// 	let form_req = form.querySelectorAll('._req');
// 	if (form_req.length > 0) {
// 		for (let index = 0; index < form_req.length; index++) {
// 			const el = form_req[index];
// 			if (!_is_hidden(el)) {
// 				error += form_validate_input(el);
// 			}
// 		}
// 	}
// 	return error;
// }
// function form_validate_input(input) {
// 	let error = 0;
// 	let input_g_value = input.getAttribute('data-value');

// 	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// 		if (input.value != input_g_value) {
// 			let em = input.value.replace(" ", "");
// 			input.value = em;
// 		}
// 		if (email_test(input) || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 		form_add_error(input);
// 		error++;
// 	} else {
// 		if (input.value == '' || input.value == input_g_value) {
// 			form_add_error(input);
// 			error++;
// 		} else {
// 			form_remove_error(input);
// 		}
// 	}
// 	return error;
// }
// function form_add_error(input) {
// 	input.classList.add('_error');
// 	input.parentElement.classList.add('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// 	let input_error_text = input.getAttribute('data-error');
// 	if (input_error_text && input_error_text != '') {
// 		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
// 	}
// }
// function form_remove_error(input) {
// 	input.classList.remove('_error');
// 	input.parentElement.classList.remove('_error');

// 	let input_error = input.parentElement.querySelector('.form__error');
// 	if (input_error) {
// 		input.parentElement.removeChild(input_error);
// 	}
// }
// function form_clean(form) {
// 	let inputs = form.querySelectorAll('input,textarea');
// 	for (let index = 0; index < inputs.length; index++) {
// 		const el = inputs[index];
// 		el.parentElement.classList.remove('_focus');
// 		el.classList.remove('_focus');
// 		el.value = el.getAttribute('data-value');
// 	}
// 	let checkboxes = form.querySelectorAll('.checkbox__input');
// 	if (checkboxes.length > 0) {
// 		for (let index = 0; index < checkboxes.length; index++) {
// 			const checkbox = checkboxes[index];
// 			checkbox.checked = false;
// 		}
// 	}
// 	let selects = form.querySelectorAll('select');
// 	if (selects.length > 0) {
// 		for (let index = 0; index < selects.length; index++) {
// 			const select = selects[index];
// 			const select_default_value = select.getAttribute('data-default');
// 			select.value = select_default_value;
// 			select_item(select);
// 		}
// 	}
// }

// let viewPass = document.querySelectorAll('.form__viewpass');
// for (let index = 0; index < viewPass.length; index++) {
// 	const element = viewPass[index];
// 	element.addEventListener("click", function (e) {
// 		if (element.classList.contains('_active')) {
// 			element.parentElement.querySelector('input').setAttribute("type", "password");
// 		} else {
// 			element.parentElement.querySelector('input').setAttribute("type", "text");
// 		}
// 		element.classList.toggle('_active');
// 	});
// }


//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}

//Placeholers
let inputs = document.querySelectorAll('input');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];

			if (input.classList.contains('_phone')) {
				//'+7(999) 999 9999'
				//'+38(999) 999 9999'
				//'+375(99)999-99-99'
				let maskValue = input.dataset.mask;
				input.classList.add('_mask');
				Inputmask(maskValue, {
					//"placeholder": '',
					clearIncomplete: true,
					clearMaskOnLostFocus: true,
					onincomplete: function () {
						//input_clear_mask(input, input_g_value);
					}
				}).mask(input);
			}

			//const input_g_value = input.getAttribute('data-value');
			//input_placeholder_add(input);
			// if (input.value != '' && input.value != input_g_value) {
			// 	input_focus_add(input);
			// }
			// input.addEventListener('focus', function (e) {
			// 	if (input.value == input_g_value) {
			// 		input_focus_add(input);
			// 		input.value = '';
			// 	}
			// 	if (input.getAttribute('data-type') === "pass") {
			// 		input.setAttribute('type', 'password');
			// 	}
			// 	if (input.classList.contains('_date')) {
			// 		/*
			// 		input.classList.add('_mask');
			// 		Inputmask("99.99.9999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 		*/
			// 	}
			// 	if (input.classList.contains('_phone')) {
			// 		//'+7(999) 999 9999'
			// 		//'+38(999) 999 9999'
			// 		//'+375(99)999-99-99'
			// 		input.classList.add('_mask');
			// 		Inputmask("+375 (99) 9999999", {
			// 			//"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	if (input.classList.contains('_digital')) {
			// 		input.classList.add('_mask');
			// 		Inputmask("9{1,}", {
			// 			"placeholder": '',
			// 			clearIncomplete: true,
			// 			clearMaskOnLostFocus: true,
			// 			onincomplete: function () {
			// 				input_clear_mask(input, input_g_value);
			// 			}
			// 		}).mask(input);
			// 	}
			// 	form_remove_error(input);
			// });
			// input.addEventListener('blur', function (e) {
			// 	if (input.value == '') {
			// 		input.value = input_g_value;
			// 		input_focus_remove(input);
			// 		if (input.classList.contains('_mask')) {
			// 			input_clear_mask(input, input_g_value);
			// 		}
			// 		if (input.getAttribute('data-type') === "pass") {
			// 			input.setAttribute('type', 'text');
			// 		}
			// 	}
			// });
			// if (input.classList.contains('_date')) {
			// 	datepicker(input, {
			// 		customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			// 		customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			// 		formatter: (input, date, instance) => {
			// 			const value = date.toLocaleDateString()
			// 			input.value = value
			// 		},
			// 		onSelect: function (input, instance, date) {
			// 			input_focus_add(input.el);
			// 		}
			// 	});
			// }
		}
	}
}
// function input_placeholder_add(input) {
// 	const input_g_value = input.getAttribute('data-value');
// 	if (input.value == '' && input_g_value != '') {
// 		input.value = input_g_value;
// 	}
// }
// function input_focus_add(input) {
// 	input.classList.add('_focus');
// 	input.parentElement.classList.add('_focus');
// }
// function input_focus_remove(input) {
// 	input.classList.remove('_focus');
// 	input.parentElement.classList.remove('_focus');
// }
// function input_clear_mask(input, input_g_value) {
// 	input.inputmask.remove();
// 	input.value = input_g_value;
// 	input_focus_remove(input);
// }


// let quantityButtons = document.querySelectorAll('.quantity__button');
// if (quantityButtons.length > 0) {
// 	for (let index = 0; index < quantityButtons.length; index++) {
// 		const quantityButton = quantityButtons[index];
// 		quantityButton.addEventListener("click", function (e) {
// 			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
// 			if (quantityButton.classList.contains('quantity__button_plus')) {
// 				value++;
// 			} else {
// 				value = value - 1;
// 				if (value < 1) {
// 					value = 1
// 				}
// 			}
// 			quantityButton.closest('.quantity').querySelector('input').value = value;
// 		});
// 	}
// };

	// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	// === // Проверка, поддержка браузером формата webp ==================================================================




	// ==== parallax =====================================================
	$('._parallax').parallax();
	// ==== parallax =====================================================


	// ==== PAGES =====================================================

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('.wrapper');
		if (wrapper) {
			let headerHeight = document.querySelector('.header').clientHeight;
			if (wrapper.classList.contains('_padding-top')) {
				wrapper.style.paddingTop = headerHeight + 'px';
			}
		}
	}
	// ==== AND ADD PADDING-TOP ================================

	let priceSlider = document.querySelector('.price-filter__slider');

if(priceSlider) {
	let inputNumFrom = document.getElementById('priceStart');
	let inputNumTo = document.getElementById('priceEnd');
	let value = document.querySelector('.values-price-filter');

	let min = value.dataset.min;
	let max = value.dataset.max;
	let numStart = value.dataset.start;
	let numEnd = value.dataset.end;
	noUiSlider.create(priceSlider, {
		start: [+numStart, +numEnd],  
		connect: true,
		tooltips:[wNumb({decimals: 0, thousand: ','}) , wNumb({decimals: 0, thousand: ','})], 
		range: {
			'min': [+min],
			'max': [+max],
		}
	});

	priceSlider.noUiSlider.on('update', function (values, handle) {

	    var value = values[handle];

	    if (handle) {
	        inputNumTo.value = Math.round(value);
	    } else {
	        inputNumFrom.value = Math.round(value);
	    }
	});

	inputNumTo.onchange = function() {
		setPriceValues()
	}

	inputNumFrom.onchange = function() {
		setPriceValues()
	}

	function setPriceValues() {
		let priceStartValue;
		let priceEndValue;
		if(inputNumFrom.value != '') {
			priceStartValue = inputNumFrom.value;
		}

		if(inputNumTo.value != '') {
			priceEndValue = inputNumTo.value;
		}

		  priceSlider.noUiSlider.set([priceStartValue, priceEndValue])
	}
}


//OPTION
$.each($('.option.active'), function(index, val) {
	$(this).find('input').prop('checked', true);
});
$('.option').click(function(event) {
	if(!$(this).hasClass('disable')){
			var target = $(event.target);
		if (!target.is("a")){
			if($(this).hasClass('active') && $(this).hasClass('order') ){
				$(this).toggleClass('orderactive');
			}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
		}
	}
});

// == shop aside =====================================
{
	let aside = document.querySelector('.shop-aside');
	if(aside) {
		let btnOpen = document.querySelector('.head-shop__mobile-btn');
		let btnClose = document.querySelector('.shop-aside__mobile-btn-close');

		btnOpen.addEventListener('click', () => {
			if(aside.classList.contains('open')) {
				aside.classList.remove('open');
			} else {
				aside.classList.add('open');
			}
		})

		btnClose.addEventListener('click', () => {
			aside.classList.remove('open');
		})

		document.body.addEventListener('click', (e) => {
			if(!e.target.closest('.shop-aside')) {
				if(e.target.closest('.head-shop__mobile-btn')) {
					return;
				} else {
					aside.classList.remove('open');

				}
			}
		})
	}
}
// == // shop aside =====================================;
	{
    let sliderProduct = document.querySelector('.slider-product');
    if (sliderProduct) {
        let sliderProductThumbs;
        sliderProductThumbs = new Swiper(sliderProduct.querySelector('.slider-product__thumbs'), {
            spaceBetween: 10,

            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            breakpoints: {
                // when window width is >= 320px
                576: {
                    direction: 'vertical',
                },
            }
        });
        let sliderProductTop;
        sliderProductTop = new Swiper(sliderProduct.querySelector('.slider-product__main'), {
            spaceBetween: 0,
            effect: 'fade',
            thumbs: {
                swiper: sliderProductThumbs
            },
            preloadImages: false,
            // lazy: {
            //     loadOnTranstitionStart: false,
            //     loadPrevNext: true,
            // }
        });

        let zoomImages = sliderProduct.querySelectorAll('.zoom');
        if (zoomImages.length > 0) {
            zoomImages.forEach(item => {
                new Drift(item, {
                    paneContainer: document.querySelector('.detail'),
                    inlinePane: 900,
                    inlineOffsetY: -85,
                    containInline: true,
                    hoverBoundingBox: true,
                    zoomFactor: 2.5,
                });

            })
        }

        if (document.documentElement.clientWidth < 576) {
            sliderProduct.append(sliderProduct.querySelector('.slider-product__thumbs'));
        }

        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth < 576) {
                sliderProduct.append(sliderProduct.querySelector('.slider-product__thumbs'));
            }
        })
    }

}


let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", function (e) {
            let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
            if (quantityButton.classList.contains('quantity__button_plus')) {
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1
                }
            }
            quantityButton.closest('.quantity').querySelector('input').value = value;
        });
    }
};
	{
    let faqList = document.querySelector('.faq__list');
    if(faqList) {

        
        faqList.querySelectorAll('.faq__collapse').forEach(btn => {
            btn.addEventListener('click', function(e){
                e.preventDefault();
                _slideUp(this.closest('.faq__collapse-content'));
                this.closest('.faq__collapse-content').previousElementSibling.classList.remove('_active')
            })
        })
    }
};

	// ==== AND PAGES =====================================================




	// ==== BLOCKS =====================================================	

	// === Burger Handler =====================================================================
	function burgerBtnAnimation(e) {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		let classNameElem = document.querySelector('.burger').dataset.activel;
		document.querySelector(`.${classNameElem}`).classList.toggle('open');
		let el = document.querySelector(`.${classNameElem}`);

			if(el.classList.contains('open')) {
				document.querySelector('.header').classList.add('background');
			} else {
				if(window.pageYOffset <= 10) {
					document.querySelector('.header').classList.remove('background');
				}
			}

		_slideToggle(document.querySelector(`.${classNameElem}`));
	}
	$('.burger').click((e) => burgerBtnAnimation(e));
// === Burger Handler =====================================================================	;

	{
	let header = document.querySelector('.header');
	let wrapper = document.querySelector('.wrapper');
	if(wrapper) {
		let menu = header.querySelector('.header__menu');

		window.addEventListener('scroll', () => {
			if(window.pageYOffset > 10) {
				header.classList.add('background');
			} else if(window.pageYOffset <= 10) {
				if(!menu.classList.contains('open')) {
					header.classList.remove('background');
				}
			}
		})
	}


	let navMenu = document.querySelector('.header__menu-list');
	if(navMenu) {
		function addClasses() {
			if(document.documentElement.clientWidth < 992) {
				navMenu.classList.add('_spollers', '_one');
				navMenu.querySelectorAll('.header__menu-link').forEach(link => {
					link.classList.add('_spoller');
				})
			}
		}

		function removeClasses() {
				navMenu.classList.remove('_spollers', '_one');
				navMenu.querySelectorAll('.header__menu-link').forEach(link => {
					link.classList.remove('_spoller');
				})
		}
		addClasses() ;
		spollerInit();
		
		window.addEventListener('resize', function() {
			if(document.documentElement.clientWidth < 992) {
				addClasses();
				spollerInit();
			} else {
				removeClasses();
			}
		})
	}


}


;

	{
	let fromSearch = document.querySelectorAll('.form-search');
	if(fromSearch) {
		fromSearch.forEach(form => {
			let input = form.querySelector('.form-search__input'); 
			input.addEventListener('focus', () => {
				if(!form.classList.contains('form-search_open')) { 
					form.classList.add('_focus');
				}
			})
			input.addEventListener('blur', () => {
				form.classList.remove('_focus');
			})
		})
	}
};

	// ==  slider ==========================================================================
{
	let promoSlider = document.querySelector('.promo-slider');
	if(promoSlider) {
		let sliderBg = document.querySelector('.promo-slider__bg');
				let promoSlideBg = new Swiper(sliderBg, {
				slidesPerView:1,
				effect: 'fade',
				loop: true,
				speed: 600,
				// autoplay: {
				//   delay: document.querySelector('.res-single .res-single__hero.slider') ? 8000 : 4000,
				//    disableOnInteraction: false,
				// },
				//spaceBetween: 15,
				preloadImages: false,
				lazy: {
					loadOnTranstitionStart: false,
					loadPrevNext:true,
				}
				})

		let sliderContent = document.querySelector('.promo-slider__content .swiper-container');
				let promoSliderContent = new Swiper(sliderContent, {
				slidesPerView: 1,
				loop: true,
				speed: 600,
				// autoplay: {
				//   delay: document.querySelector('.res-single .res-single__hero.slider') ? 8000 : 4000,
				//    disableOnInteraction: false,
				// },
				//spaceBetween: 35,
				pagination: {
				    el: document.querySelector('.promo-slider__pagination'),
				     clickable: true,
				     renderBullet: function(index, className) {
				     	let num;
				     	if((index + 1) >= 10) {
				     	    num = index + '.';
				     	} else {
				     		num = '0' + (index + 1) + '.'; 
				     	}
				     	return '<span class="'+ className +'"> ' + num + '</span>';
				     }
				  },
				 navigation: {
				 	nextEl: '.promo-slider__btn-next',
				 	prevEl: '.promo-slider__btn-prev',
				 }, 
				})

		promoSliderContent.controller.control = promoSlideBg;
	}
}
// == and  slider ==========================================================================;

	{
	const slider = document.querySelector('.products-category__list');
	if(slider) {
		let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
					slidesPerView: 1,
					//centeredSlides: true,
					speed: 600,
					pagination: {
					    el: slider.querySelector('.slider-pagination'),
					    clickable: true,
					    renderBullet: function(index, className) {
					    	let num;
					    	if((index + 1) >= 10) {
					    	    num = index + '.';
					    	} else {
					    		num = '0' + (index + 1) + '.'; 
					    	}
					    	return '<span class="'+ className +'"> ' + num + '</span>';
					    }
					  },
				});

				slider.dataset.mobile = 'true';

				//mySwiper.slideNext(0);
			}

			if(document.documentElement.clientWidth > 767) {
				slider.dataset.mobile = 'false';

				if(slider.classList.contains('swiper-container-initialized')) {
					mySwiper.destroy();
				}
			}
		}

		mobileSlider();

		window.addEventListener('resize', () => {
			mobileSlider();
		})
	}

};

	function cardVideoHandler() {
	function togglePlayPause(video,btn) {
		if(video.paused) {
			video.play();
			btn.firstElementChild.className = 'icon-pause2';

		} else {
			video.pause();
			btn.firstElementChild.className = 'icon-play3';
		}
	}

	let videoBlock = document.querySelectorAll('.video-block');
	if(videoBlock.length) {
		let timerId;
		videoBlock.forEach((item) => {

			//let videoWrap = card.querySelector('.card-video__video-wrap');
			let video = item.querySelector('.video-block__video');
			let btn = item.querySelector('.video-block__play-pause');
			//let time = item.querySelector('.card-video__duration-time');
			//let btnLink = item.querySelector('.card-video__btn');

			if(video) {
				btn.addEventListener('click', (e) => {
					e.preventDefault();
					togglePlayPause(video,btn);
				});
				video.addEventListener('ended', () => {
					video.pause();
					btn.firstElementChild.className = 'icon-play3';
				});
				video.addEventListener('mousemove', (e) => { 
					if(!video.paused) {
						btn.style.opacity = '1';
						
							clearTimeout(timerId);
							timerId = setTimeout(() => {
								btn.style.opacity = '0';
							}, 2000);

					} else {
						btn.style.opacity = '1';
					}

				});

			}
		})
	}

}

cardVideoHandler();;

	{
	const slider = document.querySelector('.latest-articles__list');
	if(slider) {
		let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
					slidesPerView: 1,
					spaceBetween: 15,
					speed: 600,
					pagination: {
					    el: slider.querySelector('.slider-pagination'),
					    clickable: true,
					    renderBullet: function(index, className) {
					    	let num;
					    	if((index + 1) >= 10) {
					    	    num = index + '.';
					    	} else {
					    		num = '0' + (index + 1) + '.'; 
					    	}
					    	return '<span class="'+ className +'"> ' + num + '</span>';
					    }
					  },
				});

				slider.dataset.mobile = 'true';
			}

			if(document.documentElement.clientWidth > 767) {
				slider.dataset.mobile = 'false';

				if(slider.classList.contains('swiper-container-initialized')) {
					mySwiper.destroy();
				}
			}
		}

		mobileSlider();

		window.addEventListener('resize', () => {
			mobileSlider();
		})
	}

};

	// ==  slider ==========================================================================
{
	let slider = document.querySelector('.testimonials-slider__body .swiper-container');
	if(slider) {
		let promoSliderContent = new Swiper(slider, {
			slidesPerView: 1,
			loop: true,
			speed: 600,
			autoHeight: true,
			pagination: {
			    el: document.querySelector('.testimonials-slider__pagination'),
			     clickable: true,
			     renderBullet: function(index, className) {
			     	let num;
			     	if((index + 1) >= 10) {
			     	    num = index + '.';
			     	} else {
			     		num = '0' + (index + 1) + '.'; 
			     	}
			     	return '<span class="'+ className +'"> ' + num + '</span>';
			     }
			  },
			 navigation: {
			 	nextEl: '.testimonials-slider__btn-next',
			 	prevEl: '.testimonials-slider__btn-prev',
			 }, 
		})

	}
}
// == and  slider ==========================================================================;

	{
	let timerBlock = document.querySelector('.time-block');
	if(timerBlock) {

		function countdown(dateEnd) {
		  let timer, days, hours, minutes, seconds;

		  dateEnd = new Date(dateEnd);
		  dateEnd = dateEnd.getTime();

		  if (isNaN(dateEnd)) {
		  	console.log( '%c%s', 'color: red;', 'timer error, incorrect date format, use this option - (12/03/2020 02:00:00 AM)')
		    return;
		  }

		  timer = setInterval(calculate, 1000);

		  function calculate() {
		    let dateStart = new Date();
		      dateStart = new Date(dateStart.getUTCFullYear(),
		      dateStart.getUTCMonth(),
		      dateStart.getUTCDate(),
		      dateStart.getUTCHours(),
		      dateStart.getUTCMinutes(),
		      dateStart.getUTCSeconds());
		    let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

		    if (timeRemaining >= 0) {
		      days = parseInt(timeRemaining / 86400);
		      timeRemaining = (timeRemaining % 86400);
		      hours = parseInt(timeRemaining / 3600);
		      timeRemaining = (timeRemaining % 3600);
		      minutes = parseInt(timeRemaining / 60);
		      timeRemaining = (timeRemaining % 60);
		      seconds = parseInt(timeRemaining);


		      document.getElementById("days").innerHTML = parseInt(days, 10);
		      document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
		      document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
		      document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
		    } else {
		      return;
		    }
		  }

		  function display(days, hours, minutes, seconds) {}
		}

		countdown (timerBlock.dataset.time);
	}
};

	{
	let popularProductsBlock = document.querySelector('.popular-products');
	if(popularProductsBlock) {
		popularProductsBlock.querySelectorAll('.popular-products__triggers').forEach((item) => {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				const id = e.target.getAttribute('href').replace('#','');

				popularProductsBlock.querySelectorAll('.popular-products__triggers').forEach((child) => {
					child.classList.remove('active');
				});

				popularProductsBlock.querySelectorAll('.popular-products__tabs-content').forEach((child) => {
					child.classList.remove('active');
				});

				item.classList.add('active');
				document.getElementById(id).classList.add('active');
			});
		});
	}
};

	//RATING
$('.rating.edit .star').hover(function () {
    var block = $(this).parents('.rating');
    block.find('.rating__activeline').css({ width: '0%' });
    var ind = $(this).index() + 1;
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
}, function () {
    var block = $(this).parents('.rating');
    block.find('.star').removeClass('active');
    var ind = block.find('input').val();
    var linew = ind / block.find('.star').length * 100;
    setrating(block, linew);
});
$('.rating.edit .star').click(function (event) {
    var block = $(this).parents('.rating');
    var re = $(this).index() + 1;
    block.find('input').val(re);
    var linew = re / block.find('.star').length * 100;
    setrating(block, linew);
});
$.each($('.rating'), function (index, val) {
    var ind = $(this).find('input').val();
    var linew = ind / $(this).parent().find('.star').length * 100;
    setrating($(this), linew);
});
function setrating(th, val) {
    th.find('.rating__activeline').css({ width: val + '%' });
};

	// ==== AND BLOCKS =====================================================

});

{


	let isMap = document.getElementById("map");
	if(isMap) {
		var map;

		let center = {
			lat: 40.68950,
			lng: -74.044683,
		}

		let markerPosition = {
			lat: 40.68950,
			lng: -74.044683,
		}

		// Функция initMap которая отрисует карту на странице
		function initMap() {

			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
			map = new google.maps.Map(document.getElementById('map'), {
				// При создании объекта карты необходимо указать его свойства
				// center - определяем точку на которой карта будет центрироваться
				center: {lat: center.lat, lng: center.lng},
				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

				zoom: 16,

				// Добавляем свои стили для отображения карты
				//styles: 
			});

			// Создаем маркер на карте
			var marker = new google.maps.Marker({

				// Определяем позицию маркера
			    position: {lat: markerPosition.lat, lng: markerPosition.lng},

			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
			    map: map,

			    // Пишем название маркера - появится если навести на него курсор и немного подождать
			    title: '',
			    label: '',

			    // Укажем свою иконку для маркера
			   // icon: 'img/contact/googlMarker.svg',
			});

		}
	}
}