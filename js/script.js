// window.addEventListener('load', function () {
document.addEventListener("DOMContentLoaded", () => {
// удаляем класс у выбранных элементов
function _removeClasses(elemSelector, elemClass) {
    let el = document.querySelectorAll(elemSelector);
    if (el.length > 0) {
        for (let i = 0; i < el.length; i++) {
            el[i].classList.remove(elemClass);
        }
    }
}

/*  -------------------------------------------------------*/
/*  Функция для прокрутки с контролем скорости
/*  -------------------------------------------------------*/
function scrollToTop(to, duration = 700) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };
    animateScroll();
}


// вставить текущий год
function getAndInsertCurrentYear(insertTag) {
    let tagInsert = document.querySelector(insertTag);
    if (tagInsert) {
        let currentDate = new Date();
        document.querySelector(insertTag).textContent = currentDate.getFullYear();
    }else{
        console.log('Проверь тег');
    }
}
getAndInsertCurrentYear('._current-year');

isMobile();
isWebp();
isIE();

function isMobile() {
    // код определяющий на каком устройстве открыта страница
    let isMob = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMob.Android() ||
                isMob.BlackBerry() ||
                isMob.iOS() ||
                isMob.Opera() ||
                isMob.Windows());
        }
    };

    if (isMob.any()) {
        document.documentElement.classList.add('_touch');

    } else {
        document.documentElement.classList.add('_pc');
    }
}

// Проверка поддержки webp
function isWebp() {
    function testWebp(callback) {

        let webp = new Image();
        webp.onload = webp.onerror = function () {
            callback(webp.height == 2);
        };
        webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    testWebp(function (support) {
        let className = support === true ? '_webp' : "_no-webp";
        document.documentElement.classList.add(className);
    });
}


// IE
function isIE() {
    function isInternetExplorer() {
        return window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    }
    if (isInternetExplorer() === false) {
        // alert('Браузер не IE');
    } else {
        alert('Ваш браузер не поддерживается, страница может отображаться некорректно!');
        document.documentElement.classList.add('_ie');
    }
}
// lock body
const documentBody = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
const lockPaddingValue = window.innerWidth - document.querySelector('._body-wrapper').offsetWidth + 'px';
let unlock = true;
let timeout = 10;

 function bodyLock() {
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  documentBody.style.paddingRight = lockPaddingValue;
  documentBody.classList.add('_lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

 function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    documentBody.style.paddingRight = '0px';
    documentBody.classList.remove('_lock');
  }, 0);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
// nclude('./files/spoller.js')
// задать хедер(по дефолту везде .header)
const headerElement = '.header';

// работа бургера
actionBurgerMenu();
// скрытие хедера при прокрутке
hideHeader(headerElement, 100);
// установка отступа для следующего за хедером элемента
// (не main)
setPaddingHeaderNextBlock(headerElement, ".fullscreen");

/*-------------------------- */
function actionBurgerMenu(iconBurger = '.icon-menu', bodyMenu = '.menu__body') {
    const iconMenu = document.querySelector(iconBurger);
    const menuBody = document.querySelector(bodyMenu);

    function closeBurger() {
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
        iconMenu.removeAttribute('style');
        iconMenu.ariaExpanded = "false";
        bodyUnLock();
    }

    function openBurger() {
        iconMenu.classList.add("_active");
        menuBody.classList.add("_active");
        iconMenu.style.marginRight = lockPaddingValue;
        iconMenu.ariaExpanded = "true";
        bodyLock();
    }

    if (iconMenu && menuBody) {
        iconMenu.addEventListener("click", function (e) {
            if (iconMenu.classList.contains('_active')) {
                closeBurger();
            } else {
                openBurger();
            }
        });
    }
    window.addEventListener('resize', () => {
        closeBurger();
    });
}

/*-------------------------- */
//   для слушателя всего документа
function onMenuLinkClick(e, fixedHeader = false, activeMenuItem = false, linkMenu = '.menu__link', iconBurger = '.icon-menu', bodyMenu = '.menu__body') {

    if (activeMenuItem && linkMenu) {
        let linksMenu = document.querySelectorAll(linkMenu);
        linksMenu.forEach(linkMenu => {
            linkMenu.classList.remove('_active');
        });
        e.target.closest(linkMenu).classList.add('_active');
    }
    onClickLink(e, fixedHeader);
    let menuIcon = document.querySelector(iconBurger);
    let menuBody = document.querySelector(bodyMenu);

    if (menuIcon.classList.contains('_active')) {
        onClickLink(e, fixedHeader);
        bodyUnLock();
        menuIcon.classList.remove('_active');
        menuBody.classList.remove('_active');
    }
}


function onClickLink(e, headerFixed = false) {
    let targetElement = e.target.closest('a');
    let linkName = targetElement.getAttribute('href');
    //   console.log(linkName);
    if (linkName[0] == '#' && linkName.length > 1) {
        //   console.log("якорь");
        e.preventDefault();
        let gotoBlockName = document.querySelector(linkName);
        if (gotoBlockName) {
            if (headerFixed) {
                let gotoBlockValue = gotoBlockName.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                //   let gotoBlockValue = gotoBlockName.getBoundingClientRect().top + document.documentElement.scrollTop - document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
            } else {
                gotoBlockName.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }
    }
    if (linkName[0] == '#' && linkName.length == 1) {
        e.preventDefault();
        //   console.log("ссылка никуда не ведет");
    }
}

/*-------------------------- */
function hideHeader(headerElement = '.header', topOfset = 200) {
    let lastScroll = 0;
    const header = document.querySelector(headerElement);
    const defaultOfset = topOfset;
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains('_hide');

    if (header) {
        window.addEventListener('scroll', () => {
            if (scrollPosition() > lastScroll && !containHide()) {
                //scroll down с нуля
                header.classList.add('_vis');

            }
            if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOfset) {
                //scroll down после определенной позиции
                header.classList.add('_hide');
            }
            if (scrollPosition() < lastScroll && containHide()) {
                //scroll up
                header.classList.remove('_hide');
            }
            if (scrollPosition() == 0) {
                header.classList.remove('_vis');
            }
            lastScroll = scrollPosition();
        });
    }
}

function setPaddingHeaderNextBlock(header, nextBlock) {
    let headerB = document.querySelector(header);
    let nextB = document.querySelector(nextBlock);

    if (headerB && nextB) {
        let height = (headerB.offsetHeight / 16) + "rem";
        nextB.setAttribute("style", `padding-top:${height}; background-position-y:${height};`);
    }

}

// переключение фильтра( для слушателя всего документа)

// встроить в слушатель всего документа
// if (targetElement.closest('.filter__button')) {
//   toggleDocumentFilter(targetElement, '.filter__button', '.filter__item', 'all');
// }

function toggleDocumentFilter(targetElement, buttonsFilter, itemsFilter, filterShowAll = 'all') {
    let filterButtons = document.querySelectorAll(buttonsFilter);
    let filterName = targetElement.dataset.filterName;
    let filterItems = document.querySelectorAll(itemsFilter);
    filterButtons.forEach(filterButton => {
        filterButton.classList.remove('_active');
    });
    targetElement.closest(buttonsFilter).classList.add('_active');
    filterItems.forEach(filterItem => {
        if (filterName == filterShowAll) {
            filterItem.classList.remove('_hide');
        } else {
            filterItem.classList.add('_hide');
            if (filterItem.dataset.filterItem == `${filterName}`) {
                filterItem.classList.remove('_hide');
            }
        }
    });
}

// простое переключение фильтра

// toggleFilter('.filter__button', '.filter__item');

function toggleFilter(buttonsFilter, itemsFilter, filterShowAll = 'all') {
    let filterButtons = document.querySelectorAll(buttonsFilter);
    let filterItems = document.querySelectorAll(itemsFilter);

    function activeFilter() {
        filterButtons.forEach(filterButton => {
            filterButton.classList.remove('_active');
            this.classList.add('_active');
            let filterName = this.dataset.filterName;

            filterItems.forEach(filterItem => {
                if (filterName == filterShowAll) {
                    filterItem.classList.remove('_hide');
                } else {
                    filterItem.classList.add('_hide');
                    if (filterItem.dataset.filterItem == `${filterName}`) {
                        filterItem.classList.remove('_hide');
                    }
                }
            });

        });
    }
    filterButtons.forEach(filterButton => {
        filterButton.addEventListener('click', activeFilter);
    });
}


//=========== TABS ===============

//переключение табов(для слушателя всего документа)

// встроить в слушатель всего документа
//   if (targetElement.closest('.tabs-button')) {
//       toggleDocumentTabs(targetElement, '.tabs-button', '.tabs-block');
//   }

 function toggleDocumentTabs(targetElement, buttonTab, blockTab) {
    let tabsTitles = document.querySelectorAll(buttonTab);
    let tabsBlocks = document.querySelectorAll(blockTab);
    let id = targetElement.closest(buttonTab).dataset.tab;
    tabsTitles.forEach(title => {
        title.classList.remove('_active');

    });
    targetElement.closest(buttonTab).classList.add("_active");
    tabsBlocks.forEach(tabsBlock => {
        tabsBlock.classList.remove('_active');
        if (tabsBlock.dataset.tab == id) {
            tabsBlock.classList.add('_active');
        }
    });
}

//простое переключение табов

// toggleTabs('.tabs-button', '.tabs-block');

function toggleTabs(buttonTab, blockTab) {
    let tabsButtons = document.querySelectorAll(buttonTab);
    let tabsBlocks = document.querySelectorAll(blockTab);

    function activeTab() {
        tabsButtons.forEach(tabsButton => {
            tabsButton.classList.remove('_active');
            this.classList.add('_active');
            let id = this.dataset.tab;
            tabsBlocks.forEach(tabBlock => {
                tabBlock.classList.remove('_active');
                if (tabBlock.dataset.tab == id) {
                    tabBlock.classList.add('_active');
                }
            });
        });
    }
    tabsButtons.forEach(tabsButton => {
        tabsButton.addEventListener('click', activeTab);
    });
}
// nclude('./files/popup.js')
// nclude('./files/form.js')
// nclude('./files/custom-swiper.js')
// nclude('./files/google-map.js')
// слушатель всего документа
document.addEventListener('click', documentActions);

// делегирование события клик
function documentActions(e) {
    const targetElement = e.target;

    // переключение фильтра(раскоментировать код ниже)
    // if (targetElement.closest('.filter__button')) {
    //     toggleDocumentFilter(targetElement, '.filter__button', '.filter__item', 'all');
    // }

    // переключение табов(раскоментировать код ниже)
    if (targetElement.closest('.tabs__button')) {
        toggleDocumentTabs(targetElement, '.tabs__button', '.tabs__block');
    }

    //   обработка клика на стрелку меню
    // if (targetElement.classList.contains('menu__arrow')) {
    //     targetElement.closest('.menu__item').classList.toggle('_hover');
    // }

    // if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
    //     _removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover");

    // }

    //   обработка ссылок
    if (targetElement.closest('a')) {
        onClickLink(e, true);
    }

    //   обработка ссылок из меню
    if (targetElement.closest('.menu__link') && targetElement.hasAttribute('href')) {
        onMenuLinkClick(e, false, false, '.menu__link');
    }

    // btn-up
    // if (targetElement.closest('._btn-up')) {
    //     e.preventDefault();
    //     scrollToTop(0, 400);
    // }

}

});