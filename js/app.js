var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };



// === lazy load ==================================================================
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          //lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to event handlers here
  }
});
// === // lazy load ==================================================================

$(document).ready(function() {
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

	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
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
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}

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
	}else{
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
	if(wrapper) {
		let headerHeight = document.querySelector('.header').clientHeight;
		if(wrapper.classList.contains('_padding-top')) {
			wrapper.style.paddingTop = headerHeight + 'px';
		}
	}
}
// ==== AND ADD PADDING-TOP ================================

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


};
	
	{
	let fromSearch = document.querySelector('.form-search');
	if(fromSearch) {
		let input = fromSearch.querySelector('.form-search__input');
		input.addEventListener('focus', () => {
			fromSearch.classList.add('_focus');
		})
		input.addEventListener('blur', () => {
			fromSearch.classList.remove('_focus');
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

// ==== AND BLOCKS =====================================================

});