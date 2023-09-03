const getElementMenu = (context, selector) => {
  if (!context && !selector) {
    return null;
  }

  return context.querySelector(selector);
};

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}



const arrayFrom = Array.from;

const getElements = (context, selector, returnAsArray = false) => {
  if (!context && !selector) {
    return [];
  }

  return returnAsArray ? arrayFrom(context.querySelectorAll(selector)) : context.querySelectorAll(selector);
};

const getSiblings = (element, parent) => {
  if (!element && !parent) {
    return [];
  }

  const children = [...parent.children];
  return children.filter(child => child !== element);
};

function addActive(item) {
  item.classList.add('is-active');
  item.setAttribute('aria-expanded', 'true');

  getSiblings(item, item.parentElement).forEach(el => {
    el.classList.remove('is-active');
    el.setAttribute('aria-expanded', 'false');
  });
}

function clearList(context) {
  getElements(context, '.nav-menu__list-item').forEach(item => {
    item.classList.remove('is-active');
    item.setAttribute('aria-expanded', 'false');
  });
}

function clearColumn(column) {
  column.classList.remove('is-show');
  clearList(column);
}

function menu() {
  const element = getElementMenu(document, '.js-menu');

  if (!element) {
    return;
  }

  let mar = []
  let myTimeout;


  const eventsFunc = function (event) {
    const item = event.target.closest('.nav-menu__list-item');
    if (item) {
      const parentId = item.dataset.id;
      const nextColumn = item.closest('.nav-menu__column').nextElementSibling;
      const column = item.closest('.nav-menu__column');

      addActive(item);

      if (parentId) {
        const subMenu = getElements(nextColumn, `[data-parent="${parentId}"]`);
        if (subMenu.length) {
          nextColumn.classList.add('is-show');
          nextColumn.focus()
          Array.from(nextColumn.querySelectorAll('.nav-menu__list-item')).forEach((link, i) => {
            link.classList.toggle('is-show', (
              link.dataset.parent === parentId
            ));
          });
          Array.from(nextColumn.querySelectorAll('.nav-menu__column-bottom')).forEach((bottom, i) => {
            bottom.classList.remove('show')
          });
        } else {
          nextColumn.classList.remove('is-show');
        }
      }

      if(event.type === 'touchend' || event.type === 'click') {
        const back = nextColumn.querySelector('.nav-menu__back');
        if(event.target.classList.contains('nav-link__arrow')) {
          back.querySelector('span').innerText = event.target.closest('.nav-link').querySelector('.nav-link__text').innerText
        } else {
          back.querySelector('span').innerText = event.target.innerText;
        }

        back.addEventListener('touchend', () => {
          setTimeout(() => {
            back.closest('.nav-menu__column').classList.remove('is-show');
          }, 1)
        })

        back.addEventListener('click', () => {
          setTimeout(() => {
            back.closest('.nav-menu__column').classList.remove('is-show');
          }, 1)
        })
      }
    }
  }


  if (getMobileOperatingSystem() === "iOS" || getMobileOperatingSystem() === "Android") {
    element.addEventListener('touchend', (event) => {
      setTimeout(() => {
        eventsFunc(event)
      }, 1)
    });

  } else if(getMobileOperatingSystem() === "unknown" && window.innerWidth <= 1280 && window.innerWidth > 1024) {
    element.addEventListener('keyup', (event) => {
      var code = event.keyCode || event.which;
      if(code === 13 || code === 37) {
        eventsFunc(event)
      }
    });

    element.addEventListener('click', (event) => {
      eventsFunc(event)
    });
  } else {
    element.addEventListener('keyup', (event) => {
      var code = event.keyCode || event.which;
      if(code === 13 || code === 37) {
        eventsFunc(event)
      }
    });

    element.addEventListener('mouseover', (event) => {
      eventsFunc(event)
    });
  }

  getElements(element, '.nav-menu__column').forEach(column => {
    column.addEventListener('mouseenter', (e) => {
      const nextColumn = e.target.nextElementSibling;

      if (nextColumn) {
        clearColumn(nextColumn);

        const lastColumn = nextColumn.nextElementSibling;

        if (lastColumn) {
          clearColumn(lastColumn);
        }
      }
    });

  });


  getElements(element, '.nav-menu__list-item').forEach(item => {

    item.addEventListener('mouseenter', () => {
      const parentId = item.dataset.id;
      document.querySelector('.start').classList.add('hide')

      myTimeout = setTimeout(function () {
        item.closest('.nav-menu__column').querySelectorAll('.nav-menu__column-bottom').forEach((bottom) => {
          if(bottom.dataset.id !== parentId) {
            bottom.classList.remove('show')
          }
        })
        document.querySelector('.nav-menu__column-bottom[data-id="'+ parentId+'"]').classList.add('show')
      }, 350);

    })

    item.addEventListener('mouseleave', () => {
      clearTimeout(myTimeout);
    })
  });

  getElementMenu(document, '.nav-menu__wrap').addEventListener('mouseleave', () => {
    getElements(element, '.nav-menu__column--inner').forEach(column => {
      column.classList.remove('is-show');
    });

    clearList(element);
  });
}

menu()
