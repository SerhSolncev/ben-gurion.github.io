document.addEventListener('DOMContentLoaded', (event) => {
  // lazy-load
  const el = document.querySelectorAll('.lazy');
  window.observer = lozad(el);
  window.observer.observe();

  // use-babulation



  document.addEventListener('keyup', function (event) {
    var code = event.keyCode || event.which;
    const widgetButton = document.querySelector('.widget-button');
    const langItem = document.querySelectorAll('.js-lang-item');
    const menuItem = document.querySelectorAll('.nav-menu__list-item');

    langItem.forEach((el) => {
      const id = el.getAttribute('id')
      if (document.activeElement === el) {
        el.closest('ul').setAttribute('aria-activedescendant', id);
      }
    })

    document.querySelectorAll('.form__input').forEach((el) => {
      if(el === document.activeElement && code === 9 || code === 9 && code === 16) {
        el.closest('.form__body').classList.add('hover')
        el.closest('.form').classList.add('hover')
      } else {
        el.closest('.form__body').classList.remove('hover')
        el.closest('.form').classList.remove('hover')
      }
    })

    document.querySelectorAll('.select2-search__field').forEach((el) => {
      if(el.closest('.form--catalog') !== null) {
        if(el === document.activeElement && code === 9 || code === 9 && code === 16) {
          el.closest('.form__body').classList.add('hover')
          el.closest('.form').classList.add('hover')
        } else {
          el.closest('.form__body').classList.remove('hover')
          el.closest('.form').classList.remove('hover')
        }
      }
    })
  });


  if($('.js-datepicker').length) {
    let dateFoemat = 'mm.dd.yyyy'

    $.fn.datepicker.dates['he'] = {
      days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
      daysShort:['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
      daysMin:  ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'],
      months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
      monthsShort: ['ינו', 'פבר', 'מרץ', 'אפר', 'מאי', 'יוני', 'יולי', 'אוג', 'ספט', 'אוק', 'נוב', 'דצמ'],
      today: "היום",
      clear: "ברור",
      format: "mm/dd/yyyy",
      titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
      weekStart: 0
    };
    $('.js-datepicker-from').each((i, el) => {
      $(el).datepicker({
        // templates: {
        //   leftArrow: '<i class="fa fa-chevron-left"></i>',
        //   rightArrow: '<i class="fa fa-chevron-right"></i>'
        // },
        format: "d.m.yy",
        keyboardNavigation: true,
        todayHighlight: true,
        orientation: 'bottom',
        container: $(el).closest('.js-datepicker-from-inline'),
        language: 'he'
      })
      $(el).on('changeDate', () => {
        $(el).datepicker('hide');
      });

      $(el).on('show', () => {
        document.querySelector('.filter-sidebar').classList.add('hide')
      });

      $(el).on('hide', () => {
        document.querySelector('.filter-sidebar').classList.remove('hide')
      });
    })

    $('.js-datepicker-to').each((i, el) => {
      $(el).datepicker({
        format: "d.m.yy",
        keyboardNavigation: true,
        todayHighlight: true,
        orientation: 'bottom',
        container: $(el).closest('.js-datepicker-to-inline'),
        language: 'he'
      })

      $(el).on('changeDate', () => {
        $(el).datepicker('hide');
      });

      $(el).on('show', () => {
        document.querySelector('.filter-sidebar').classList.add('hide')
      });

      $(el).on('hide', () => {
        document.querySelector('.filter-sidebar').classList.remove('hide')
      });
    })

  }

  $('.js-close-cookie').on('click', () => {
    $('.cookie').addClass('hide');
  })


  $('.small-search--mini').each((i, el) => {
    let input = $(el).find('input');
    let close = $(el).find('.small-search__clear');

    close.on('click', (event) => {
      input.val('');
      close.hide();
    })

    input.on('keyup', () => {
      if(input.val().length > 0) {
        close.show();
      } else {
        close.hide();
      }
    })
  })

  const menuItem = document.querySelectorAll('.nav-menu__list-item');

  menuItem.forEach((el) => {
    const parent = el.closest('.nav-menu__column')
    el.addEventListener('keydown', (event) => {
      var code = event.keyCode || event.which;
      if(parent !== null && code ===27) {

        setTimeout(() => {
          parent.classList.remove('is-show')
          parent.previousElementSibling.focus()
        }, 100)
      }

    })
  })

  if(document.querySelector('.js-content-block') !== null) {
    document.querySelector('.js-content-block').querySelectorAll('li, a').forEach((li) => {
      li.setAttribute('tabindex', li.closest('.js-content-block').getAttribute('data-index'))
    })

  }

  document.querySelectorAll('.form__input').forEach((el) => {

    el.addEventListener('mouseenter', () => {
      el.closest('.form__body').classList.add('hover')
      el.closest('.form').classList.add('hover')
    })

    el.addEventListener('mouseleave', () => {
      el.closest('.form__body').classList.remove('hover')
      el.closest('.form').classList.remove('hover')
    })
  })


  setTimeout(() => {
    document.querySelectorAll('.select2-selection ').forEach((el) => {
      if(el.closest('.form--catalog') !== null) {
        el.addEventListener('mouseenter', () => {
          if(!el.closest('.select2-container').classList.contains('select2-container--open')) {
            el.closest('.form__body').classList.add('hover')
            el.closest('.form').classList.add('hover')
          }
        })

        el.addEventListener('mouseleave', () => {
          el.closest('.form__body').classList.remove('hover')
          el.closest('.form').classList.remove('hover')
        })
      }
    })
  }, 0)

  $('.swiper-button').each((i, el)  => {
    if($(el).hasClass("swiper-button-lock")) {
      $(el).attr('tabindex', '-1').prop('tabindex', '-1');
      $(el).attr('aria-hidden', 'true').prop('aria-hidden', 'true')
    }
  })


  // widget-button
  const widgetFunc = function () {

    const parent = document.querySelector('[data-toggle]');
    const toggleButton = parent.querySelector('.widget-button');
    const parentTab = toggleButton.getAttribute('tabindex')
    const elenTab = parent.querySelectorAll('.drop-link');

    toggleButton.addEventListener('click', () => {
      if (parent.classList.contains('open')) {
        parent.classList.remove('open');
        toggleButton.setAttribute('aria-expanded', 'false');
        parent.querySelectorAll('a').forEach((el) => {
          el.setAttribute('tabindex', '-1')
        })
      } else {
        var child = parent.querySelector(".small-menu__body");
        parent.classList.add('open');
        toggleButton.setAttribute('aria-expanded', 'true');
        parent.querySelectorAll('a').forEach((el) => {
          el.setAttribute('tabindex', parentTab)
        })
      }
    })

    elenTab.forEach((elem, i) => {
      elem.addEventListener('blur', (ev) => {
        setTimeout(() => {
          if (i + 1 === elenTab.length && !document.activeElement.classList.contains('drop-link' || i===0 && !document.activeElement.classList.contains('drop-link'))) {
            parent.classList.remove('open')
            parent.setAttribute('aria-expanded', 'false');
          }
        }, 0)
      })
    })

  }

  const headerJHeight = document.querySelector('.header').offsetHeight;
  const nextSection = document.querySelectorAll('.js-next-section');
  document.querySelector('.header').style.position = 'fixed'
  document.body.style.paddingTop = headerJHeight + 'px';

  // parallax
  const image = document.getElementsByClassName('parallax');

  if (image.length > 0) {
    if (window.outerWidth > 1366) {
      var p = new Parallax(image, {
        offsetYBounds: 1200,
        intensity: 40,
        center: 2.5,
        safeHeight: 0.15
      }).init()
    }
  }

  // burger and search triggers

  const body = document.querySelector('body');
  const burger = document.querySelector('.burger');
  const navMenu = document.querySelector('.nav-menu');
  const searchButton = document.querySelector('.js-open-search');
  const searchBlock = document.querySelector('.search-block');
  const searchClose = document.querySelector('.js-close-search');
  const menuClose = document.querySelector('.js-close-menu');
  const menuTabElem = navMenu.querySelectorAll('[tabindex]');
  const searchTabElem = searchBlock.querySelectorAll('[tabindex]');

  searchBlock.removeAttribute('hidden')

  burger.addEventListener('keydown', (event) => {
    var code = event.keyCode || event.which;
    if(event.shiftKey && code === 9 && code === 9) {

      setTimeout(() => {
        document.querySelector('.nav-menu__list-item').focus()
      }, 0)
    }
  })


  menuTabElem.forEach((el, i) => {
    el.addEventListener('keydown', (ev) => {
      var code = ev.keyCode || ev.which;
      if( code === 9) {
        setTimeout(() => {
          if (document.activeElement.closest('.nav-menu') === null) {
            burger.focus()
          }
        }, 1)
      }

    })
  })

  searchTabElem.forEach((el, i) => {
    el.addEventListener('blur', (ev) => {
      setTimeout(() => {
        if (document.activeElement.closest('.search-block') === null) {
          searchClose.focus()
        }
      }, 0)
    })
  })

  // open menu
  burger.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('open')) {
      event.currentTarget.classList.remove('open');
      navMenu.classList.remove('open');
      body.classList.remove('menu-is-open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('title', '');
      document.querySelectorAll('.nav-menu__column--inner').forEach(column => {
        column.classList.remove('is-show');
      });
    } else {
      event.currentTarget.classList.add('open');
      setTimeout(() => {
        document.querySelector('.nav-menu__column').focus()
      }, 50)
      searchButton.classList.remove('open');
      searchBlock.classList.remove('open');
      navMenu.classList.add('open');
      body.classList.add('menu-is-open');
      body.classList.remove('search-is-open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('title', 'סגור תפריט');
    }
  });

  // search widget
  searchButton.addEventListener('click', (event) => {
    if (event.currentTarget.classList.contains('open')) {
      event.currentTarget.classList.remove('open');
      navMenu.classList.remove('open');
      searchBlock.classList.remove('open');
      searchBlock.classList.add('not-open');
      body.classList.remove('search-is-open');
    } else {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
      searchBlock.classList.add('open');
      searchBlock.classList.remove('not-open');
      body.classList.add('search-is-open');
      setTimeout(() => {
        searchClose.focus()
      }, 100)
    }
  });

  searchClose.addEventListener('click', () => {
    searchBlock.classList.remove('open');
    body.classList.remove('search-is-open');
    body.classList.remove('menu-is-open');
  })

  menuClose.addEventListener('click', () => {
    navMenu.classList.remove('open');
    body.classList.remove('menu-is-open');
    burger.classList.remove('open');
  })

  SmoothScroll({
    animationTime: 800,
    stepSize: 75,
    accelerationDelta: 30,
    accelerationMax: 2,
    keyboardSupport: true,
    arrowScroll: 50,
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    touchpadSupport: true,
  })

  const elem = document.querySelectorAll('.js-close-outside')

  if (elem !== null) {
    elem.forEach((el) => {

      document.addEventListener('click', function (event) {
        if (!el.contains(event.target)) {
          el.classList.remove('open')
        }
      });

    })
  }

  window.addEventListener('resize', () => {
    const headerJHeight = document.querySelector('.header').offsetHeight;
    document.body.style.paddingTop = headerJHeight + 'px';
  })

  // mobile-detect

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

  if (getMobileOperatingSystem() === "iOS") {
    $('body').addClass('ios-detect')
  }

  if (getMobileOperatingSystem() === "Android") {
    $('body').addClass('android-detect')
  }

  $('body').on('click', '.js-clear-selectSearch', () => {

  })

  $('body').on('click', '.js-close-popup', () => {
    $.magnificPopup.close();
    $('close-popup-tooltip').hide()
  });

  $(window).on('beforeunload', function(){
    $(window).scrollTop(0);
  });
  // copied block
  window.testMethod = function () { alert('from andrey code') };
  function myFunction(element) {
    let copyText = element.nextElementSibling;
    copyText.select();
    document.execCommand("copy");
    element.innerText = 'מוּעֲתָק!'
    element.classList.add('copied')
  }

  let copyBtn = document.querySelectorAll('.js-copy-button');

  if (copyBtn !== null) {
    copyBtn.forEach((el) => {
      el.addEventListener('click', function () {
        myFunction(el);
      })
    })
  }

  // typehead

  $.typeahead({
    input: '.js-typeahead-search-2',
    dynamic: true,
    minLength: 1,
    order: "asc",
    source: {
      ajax: {
        url: "/umbraco/api/SearchApi/SearchForAutoComplete?term={{query}}&cultureCode=" + $("#currentCultureCode").val(),
        callback: {
          done: function (data) {
            var result = [];
            $.each(data, function (index, value) {

              result.push({ "name": data[index].title, "groupName": data[index].groupName, "url": data[index].absoluteUrl });

            });
            return result;
          }
        }
      }
    },
    templateValue: "{{name}}",
    display: ["name"],
    filter: false,
    group: { key: "groupName" },
    emptyTemplate: $("#header-no-results-text").val() + ' {{query}}',
    callback: {
      onClickAfter: function (node, a, item, event) {

        event.preventDefault();

        window.location.href = item.url;

      }
    }
  });

  $('body').on('click keyup', '.custom-select', (e) => {
    $('.inp_select').removeClass('opened')
    $(e.target).closest('.inp_select').addClass('opened')
    if(!$('.inp__label').hasClass('has-value')) {
      $('.inp__label').removeClass('focus')
    }
    $(e.target).prev('.inp__label').addClass('focus')
    if(e.type === 'keyup') {
      setTimeout(() => {
        $(e.target).closest('.inp_select').find('.custom-select-item').eq(0).focus()
        $(e.target).attr('aria-expanded', true).prop('aria-expanded', true)
      }, 300)
    }
  })


  $('.custom-select-item').on('blur',(ev) => {
    setTimeout(() => {
      if (!document.activeElement.classList.contains('custom-select-item')) {
        $('.inp_select').removeClass('opened')
        if(!$('.inp__label').hasClass('has-value')) {
          $('.inp__label').removeClass('focus')
        }
        $(ev.target).attr('aria-expanded', false).prop('aria-expanded', false)
      }
    }, 0)
  } )


  $('body').on('click', '.custom-select-item', (e) => {
    let text = $(e.currentTarget).find('.custom-select-item__name').text();
    let textSimple = $(e.currentTarget).text();
    const value = $(e.currentTarget).closest('.inp_select').find('.custom-select').val();
    const dropWrap = $(e.currentTarget).closest('.inp_select').find('.drop-block');
    const textDrop = dropWrap.find('.drop-block__text');
    let newVal
    if($(e.currentTarget).hasClass('js-custom-select-item-multiple')) {
      if($(e.currentTarget).hasClass('active')) {
        $(e.currentTarget).removeClass('active')
        if(value.match(text) !== null) {
          newVal = value.replace(text, '');
        }

        if(value.match(', '+text) !== null) {
          newVal = value.replace(', '+text, '');
        }
        $(e.currentTarget).closest('.inp_select').find('.custom-select').val(newVal);
        textDrop.text(newVal)
        if(value.length < 10) {
          dropWrap.addClass('hide')
        } else {
          dropWrap.removeClass('hide')
        }
      } else {
        if($(e.currentTarget.closest('.inp__dropdown')).find('.custom-select-item.active').length > 0) {

          $(e.currentTarget).closest('.inp_select').find('.custom-select').val(value+', '+text);
          textDrop.text(value+', '+text);
        } else {
          $(e.currentTarget).closest('.inp_select').find('.custom-select').val(value+text);
          textDrop.text(value+text);
        }
        $(e.currentTarget).addClass('active')
        if(value.length < 10) {
          dropWrap.addClass('hide')
        } else {
          dropWrap.removeClass('hide')
        }
      }
    } else{
      $(e.currentTarget).closest('.inp_select').find('.custom-select').val(textSimple)
    }

    $(e.target).closest('.inp_select').find('.custom-select').prev().addClass('has-value')
    $(e.target).closest('.inp_select').find('.custom-select-drop').removeClass('show')
  })

  $('.custom-select-item').on('keyup', (e) => {
    var code = e.keyCode || e.which;
    if(code === 13) {
      let text = $(e.currentTarget).find('.custom-select-item__name').text();
      let textSimple = $(e.currentTarget).text();
      const value = $(e.currentTarget).closest('.inp_select').find('.custom-select').val();
      const dropWrap = $(e.currentTarget).closest('.inp_select').find('.drop-block');
      const textDrop = dropWrap.find('.drop-block__text');
      let newVal
      if($(e.currentTarget).hasClass('js-custom-select-item-multiple')) {
        if($(e.currentTarget).hasClass('active')) {
          $(e.currentTarget).removeClass('active')
          if(value.match(text) !== null) {
            newVal = value.replace(text, '');
          }

          if(value.match(', '+text) !== null) {
            newVal = value.replace(', '+text, '');
          }
          $(e.currentTarget).closest('.inp_select').find('.custom-select').val(newVal);
          textDrop.text(newVal)
          if(value.length < 10) {
            dropWrap.addClass('hide')
          } else {
            dropWrap.removeClass('hide')
          }
        } else {
          if($(e.currentTarget.closest('.inp__dropdown')).find('.custom-select-item.active').length > 0) {

            $(e.currentTarget).closest('.inp_select').find('.custom-select').val(value+', '+text);
            textDrop.text(value+', '+text);
          } else {
            $(e.currentTarget).closest('.inp_select').find('.custom-select').val(value+text);
            textDrop.text(value+text);
          }
          $(e.currentTarget).addClass('active')
          if(value.length < 10) {
            dropWrap.addClass('hide')
          } else {
            dropWrap.removeClass('hide')
          }
        }
      } else{
        $(e.currentTarget).closest('.inp_select').find('.custom-select').val(textSimple)
      }

      $(e.target).closest('.inp_select').find('.custom-select').prev().addClass('has-value')
      $(e.target).closest('.inp_select').find('.custom-select-drop').removeClass('show')
    }

  })

  $(document).on('click', function (e) {
    if ($(e.target).closest(".custom-select").length === 0) {
      $('.custom-select').closest('.inp_select').removeClass('opened');
      $('.inp__label').removeClass('focus')
    }
  });

  $('input, textarea').each(function(i, item) {
    $(item).on('change', (el) => {
      if($(item).val().length > 0) {
        $(item).addClass('has-value')
        $(item).prev('.inp__label').addClass('has-value')
      } else {
        $(item).removeClass('has-value')
        $(item).prev('.inp__label').removeClass('has-value')
      }
    })
  });

  $.typeahead({
    input: '.js-typeahead-search-1',
    minLength: 1,
    dynamic: true,
    // maxItem: 15,
    order: "asc",
    // hint: true,
    //group: {
    //    template: '{{group}}'
    //},
    //maxItemPerGroup: 5,
    //backdrop: '',
    // href: "/beers/{{group|slugify}}/{{display|slugify}}/",
    // dropdownFilter: "",
    emptyTemplate: $("#home-page-no-results-text").val() + ' {{query}}',
    source: {
      ajax: {
        url: "/umbraco/api/SearchApi/SearchForAutoComplete?term={{query}}&cultureCode=" + $("#currentCultureCode").val(),
        callback: {
          done: function (data) {
            var result = [];
            $.each(data, function (index, value) {

              result.push({
                "name": data[index].title, "groupName": data[index].groupName, "url": data[index].absoluteUrl
              });

            });
            return result;
          }
        }
      }
    },
    templateValue: "{{name}}",
    display: ["name"],
    filter: false,
    group: { key: "groupName" },
    callback: {
      onClickAfter: function (node, a, item, event) {

        event.preventDefault();
        if (item.url != undefined)
          window.location.href = item.url;

      }
    }

  });

  typeof $.typeahead === 'function' && $.typeahead({
    input: '.js-typeahead-search-3',
    minLength: 1,
    maxItem: 8,
    maxItemPerGroup: 6,
    order: "asc",
    hint: true,
    searchOnFocus: true,
    blurOnTab: false,
    matcher: function (item, displayKey) {
      if (item.id === "BOS") {
        // Disable Boston for X reason
        item.disabled = true;
      }
      // Add all items matched items
      return true;
    },
    multiselect: {
      limit: 10,
      limitTemplate: 'You can\'t select more than 10 teams',
      matchOn: ["id"],
      cancelOnBackspace: true,
      data: function () {

        var deferred = $.Deferred();

        setTimeout(function () {
          deferred.resolve([{
            "matchedKey": "name",
            "name": "פסיכולוגיה",
            "img": "canadiens",
            "city": "Montreal",
            "id": "MTL",
            "conference": "Eastern",
            "division": "Northeast",
            "group": "teams"
          }]);
        }, 2000);

        deferred.always(function () {
          console.log('data loaded from promise');
        });

        return deferred;

      },
      callback: {
        onClick: function (node, item, event) {
          console.log(item);
          alert(item.name + ' Clicked!');
        },
        onCancel: function (node, item, event) {
          console.log(item);
          alert(item.name + ' Removed!');
        }
      }
    },
    templateValue: "{{name}}",
    display: ["name", "city"],
    emptyTemplate: 'no result for {{query}}',
    source: {
      teams: {
        url: "/search-second.json"
      }
    },
    callback: {
      onClick: function (node, a, item, event) {
        console.log(item.name + ' Added!')
      },
      onSubmit: function (node, form, items, event) {
        event.preventDefault();

        alert(JSON.stringify(items))
      }
    },
    debug: true
  });


  $(document).click(function (event) {
    let $target = $(event.target);

    if (!$target.hasClass('js-open-drop') && !$target.closest('.js-drop').length && $('.js-drop').hasClass('open')) {
      $('.js-drop').removeClass("open");
      $('body').removeClass('drop-opened')
      $('body').removeClass('filter-opened')
      $('.js-drop').closest('.swiper-slide').css('z-index', '1');
      $('section').removeClass('z-top')
    }
  });

  // help-popup

  $('body').on('click', '.js-open-drop', (event) => {
    let $this = $(event.currentTarget);
    let $wrap = $this.closest('.js-help')
    let $drop = $wrap.find('.js-drop')
    let $close = $wrap.find('.js-drop-close')
    $('.js-drop').removeClass('open')
    $drop.toggleClass('open');
    $this.closest('section').addClass('z-top')
    $('.swiper-slide').removeClass('z-top')
    $this.closest('.swiper-slide').addClass('z-top')
    let innerItems = $drop.find('[tabindex]');
    console.log($drop);
    if ($this.closest('.popup').length) {
      $this.closest('.popup').find('.close-popup-tooltip').css('display', 'flex');
      $drop.closest('li').css('position', 'initial');
    }

    if ($wrap.hasClass('js-help-popup')) {
      $('body').addClass('drop-opened')
    }

    if(window.outerWidth < 1025 && !$wrap.hasClass('link--dop')) {
      document.body.classList.add('filter-opened')
    }

    if($this.closest('.popup').length && window.outerWidth > 1024) {
      const popupW = $this.closest('.popup').width();
      const posLeft = $this.offsetParent()[0].offsetLeft
      if(posLeft > popupW / 2) {
        $drop.addClass('reverse')
      }
    }

    $close.focus()

    innerItems.each(function (i, el) {
      $(this).on('blur', function () {
        setTimeout(() => {
          if (i + 1 === innerItems.length && document.activeElement.closest('.js-drop') === null || i === 0 && document.activeElement.closest('.js-drop') === null) {
            $drop.removeClass("open")
            $this.closest('section').removeClass('z-top')
          }
        }, 0)
      })
    })
  })

  // awiper-drop

  $('body').on('click', '.js-swiper-drop', (event) => {
    let $this = $(event.currentTarget);
    let $drop = $this.find('.include-item__drop');
    $this.toggleClass('show');
    $drop.toggleClass('show');
    if($this.hasClass('show')) {
      $this.attr('aria-expanded', 'true').prop('aria-expanded', 'true');
    } else {
      $this.attr('aria-expanded', 'false').prop('aria-expanded', 'false');
    }
  })



  $('body').on('click', '.js-drop-close', (event) => {
    let $this = $(event.currentTarget);
    let $drop = $this.closest('.js-drop');
    let $wrap = $this.closest('.js-help')
    $drop.removeClass("open")
    $this.closest('section').removeClass('z-top')

    if ($this.closest('.popup').length) {
      $this.closest('.popup').find('.close-popup-tooltip').css('display', 'none');
      $this.closest('.popup').find('.js-help').each(function () {
        $(this).closest('li').css('position', 'relative');
      })
    }

    if ($wrap.hasClass('js-help-popup')) {
      $('body').removeClass('drop-opened')
    }

    if(window.outerWidth < 1025) {
      document.body.classList.remove('filter-opened')
    }

  })

  // thanks form

  $('body').on('click', '.js-thank', (event) => {
    let $this = $(event.currentTarget);
    let form = $this.closest('form');
    let preloader = form.find('.preloader')
    let $parent = $this.closest('.js-wrap-form');
    let $thank = $parent.find('.thanks-block')

    preloader.addClass('show');
    setTimeout(() => {
      $parent.addClass('finish')
      preloader.hide();
      $thank.css('display', 'flex');
      form.remove()
    }, 3000)
  });

  // open/close multi-select2 mobile

  $('body').on('click', '.js-mobile-search-trigger', (event) => {
    let $this = $(event.currentTarget);
    const $parent = $this.closest('.js-catalog-wrap');
    const $search = $parent.find('.js-mobile-search');
    const $section = $parent.closest('.section--top');
    $section.css('z-index', '12');
    $search.addClass("open");
    $parent.addClass('open');
    $search.find('input').focus();
    $search.find('.select2-selection').trigger('click');
    $('body').addClass('filter-opened');
    // if ($('.js-choosed').find('.js-choosed-item').length > 0) {
    //   $('body').addClass('ios-pos')
    // } else {
    //   $('body').removeClass('ios-pos')
    // }
    disableBodyScroll(window, {
      allowTouchMove: (el) => {
        while (el && el !== document.body) {
          if (el.getAttribute('body-scroll-lock-ignore') !== null) {
            return true;
          }
          el = el.parentNode;
        }
      }
    });

  });

  $('body').on('click', '.close-mob-search', (event) => {
    let $this = $(event.currentTarget);
    const $parent = $this.closest('.js-mobile-search');
    const $section = $parent.closest('.section--top');
    $section.css('z-index', 'initial');
    $parent.removeClass('open')
    $('.js-catalog-wrap').removeClass('open')
    $('body').removeClass('filter-opened search-is-open');
    $this.closest('.search-block').removeClass('open')
    clearAllBodyScrollLocks();
  });

  // multi-select2 mobile

  $('body').on('click', '.js-choosed-item', (event) => {
    let $this = $(event.currentTarget);
    let $id = $this.data('select2-id');
    $('.js-mobile-search').find('.select2-selection__choice[data-select2-id="' + $id + '"]').find('.select2-selection__choice__remove').trigger('click');
    let choosed = $('.js-mobile-search').find('.select2-selection__rendered').html()
    let length = $('.js-mobile-search').find('.select2-selection__rendered .select2-selection__choice').length;
    $('.js-mob-count-selected').text(length)

    $('.js-choosed').html(choosed);
    $('.js-choosed').find('.select2-selection__choice').addClass('js-choosed-item')
  });

  // magnific popups
  //.E.S. Removed and wrapped by us again - Do not uncomment (28-11-2022)

  $('body').on('click', '.js-dmi[data-mfp]', (event) => {
    let $this = event.currentTarget;
    let $modalId = $($this).data('mfp-src');
    $.magnificPopup.open({
      mainClass: 'mfp-with-zoom',
      items: {
        src: $modalId, // can be a HTML string, jQuery object, or CSS selector
        type: 'inline'
      },
      callbacks: {
        open() {
          if(window.event.pointerType !== 'mouse'){
            $(this.content).find('.js-close-popup').focus()
          }
          if($(this.content).find('.youtube-video')) {
            const src = $(this.content).find('.youtube-video').data('src')
            setTimeout(() => {
              var player;
              function onYouTubeIframeAPIReady() {
                window.player = new YT.Player('ytplayer', {
                  width: '100%',
                  videoId: src,
                  playerVars: { 'autoplay': 1, 'playsinline': 1, 'showinfo': 0, 'enablejsapi': 1 },
                  events: {
                    'onReady': onPlayerReady
                  }
                });
              }
              onYouTubeIframeAPIReady()
              function onPlayerReady(event) {
                event.target.playVideo();
              }


            }, 0)
          }
          $(this.content).find('[tabindex]').each((i, el) => {
            $(el).on('blur', () => {
              setTimeout(() => {
                if (document.activeElement.closest('.popup') === null) {
                  // why remove? i need this for accessibility
                  $(this.content).find('.js-close-popup').focus()
                }
              }, 0)
            })
          })
          $('body').css('overflow', 'hidden');
          disableBodyScroll(window, {
            allowTouchMove: (el) => {
              while (el && el !== document.body) {
                if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                  return true;
                }
                el = el.parentNode;
              }
            }
          });
        },
        close() {
          if($(this.content).find('.youtube-video')) {
            setTimeout(() => {
              document.querySelector('#ytplayer').contentWindow.postMessage( '{"event":"command", "func":"stopVideo", "args":""}', '*');
            }, 1000)
          }
          clearAllBodyScrollLocks();
          $('body').css('overflow', 'initial');
        }
      }
    });
  })

  // page favorites
  $('body').on('click', '.js-button-fav', (event) => {
    const $this = $(event.currentTarget);
    const $text = $this.find('.button__text');
    const $status = $this.data('add-fav');
    const $addText = $this.data('text-add');
    const $defText = $this.data('text-default');

    if ($this.hasClass('added-fav')) {
      $this.removeClass('added-fav')
      $this.attr('data-add-fav', 'false');
      $text.text($defText);
    } else {
      $this.addClass('added-fav')
      $text.text($addText);
      $this.attr('data-add-fav', 'true');
    }
  });

  /*E.S. Encapsulations */

  window.openPopup = function ($sender) {

    let $this = $sender
    let $modalId = $($this).data('mfp-src');

    $.magnificPopup.open({
      mainClass: 'mfp-with-zoom',
      items: {
        src: $modalId, // can be a HTML string, jQuery object, or CSS selector
        type: 'inline'
      },
      callbacks: {
        open() {
          $('body').css('overflow', 'hidden');
          disableBodyScroll(window, {
            allowTouchMove: (el) => {
              while (el && el !== document.body) {
                if (el.getAttribute('body-scroll-lock-ignore') !== null) {
                  return true;
                }
                el = el.parentNode;
              }
            }
          });
        },
        close() {
          clearAllBodyScrollLocks();
          $('body').css('overflow', 'initial');
        }
      }
    });
  };

  // combination selects
  $('body').on('click', '.js-combinations-fake', (event) => {
    const $this = $(event.currentTarget);
    const id = $this.data('id')
    let $search = $('.js-combinations-search[data-id="'+id +'"]').addClass('open')
    $search.show();
    $search.find($('.js-select')).select2('open');
    $('body').addClass('comb-search');
  });


  let filter = document.querySelectorAll('.js-filter-check');

  if (filter !== null) {
    filter.forEach((el) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('is-active')) {
          el.classList.remove('is-active');
        } else {
          el.classList.add('is-active');
        }
      })
    })
  }

  if (nextSection.length > 0) {
    nextSection.forEach((el, i) => {
      el.addEventListener('click', () => {
        const elem = el.getAttribute('data-scroll-to')
        $('html, body').animate({
          scrollTop: $(elem).offset().top - headerJHeight + 1
        }, 1200);
      })
    })
  }

  // inview

  const blockInView = document.querySelectorAll('.js-inview');
  blockInView.forEach((el, i) => {
    $(el).bind('inview', function (event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        setTimeout(() => {
          el.classList.add('showed')
        }, 50)
      }
    });
  });

  // favorites
  const favoriteItem = document.querySelectorAll('.js-favorite');

  if (favoriteItem.length > 0) {
    favoriteItem.forEach((el, i) => {
      el.addEventListener('click', () => {
        if (el.classList.contains('active')) {
          el.classList.remove('active');
        } else {
          el.classList.add('active');
        }
      })
    })
  }

  // masonry
  window.masonry = function () {
    let container = document.querySelector('.js-masonry-grid');
    if (container !== null) {
      let gutter;
      if (window.innerWidth < 1200 && window.innerWidth > 1024) {
        gutter = 60
      } else if (window.innerWidth > 1200) {
        gutter = 124
      } else if (window.innerWidth < 1024) {
        gutter = 40
      }

      window.addEventListener('resize', () => {
        if (window.innerWidth < 1200 && window.innerWidth > 1024) {
          gutter = 60
        } else if (window.innerWidth > 1200) {
          gutter = 124
        } else if (window.innerWidth < 1024) {
          gutter = 40
        }
      })

      let msnry = new Masonry(container, {
        columnWidth: '.js-masonry-item',
        itemSelector: '.js-masonry-item',
        gutter: gutter,
        horizontalOrder: true,
        percentPosition: true,
        originLeft: false
      });

      if (window.innerWidth < 639) {
        msnry.destroy()
      }

      window.addEventListener('resize', () => {
        let msnry = new Masonry(container, {
          columnWidth: '.js-masonry-item',
          itemSelector: '.js-masonry-item',
          gutter: gutter,
          horizontalOrder: true,
          percentPosition: true,
          originLeft: false
        });
        if (window.innerWidth < 639) {
          msnry.destroy()
        }
      })
    }
  }

  // fly-favorites
  window.favorites = function (element, context = 'body') {

    function executionTimeout(timeout = 1000) {
      let timer;
      return function (callback, data) {
        clearTimeout(timer);
        timer = setTimeout(callback.bind(data), timeout)
      }
    }

    let clickTimeout = executionTimeout(300);
    $(element, context).on('click', function (event) {
      event.preventDefault();
      clickTimeout(function () {
        //$(element).addClass('is-active');
        // var favCount = $('.js-favorites-count');
        var flyIconFav = $(element).find('svg');
        var iconFav = $('.js-head-favorite').find('svg');
        if ($('.button__count').text() > '0') {
          $('.js-head-favorite')[0].classList.add('is-active')
        } else {
          $('.js-head-favorite')[0].classList.remove('is-active')
        }
        var $window = $(window);

        var create = flyIconFav.clone().appendTo('html').addClass('fly-icon-fav');
        var timeout = 10;

        var length = Math.sqrt(((flyIconFav[0].getBoundingClientRect().top - iconFav[0].getBoundingClientRect().top) ** 2 + (flyIconFav[0].getBoundingClientRect().left - iconFav[0].getBoundingClientRect().left) ** 2));
        var duration = "1";
        var time = length / duration + timeout;

        create.css({
          "transition-duration": duration + 's',
          "top": flyIconFav[0].getBoundingClientRect().top,
          "left": flyIconFav[0].getBoundingClientRect().left,
        });

        setTimeout(function () {
          create.css({
            "top": iconFav[0].getBoundingClientRect().top,
            "left": iconFav[0].getBoundingClientRect().left,
            "width": iconFav.width(),
            "height": iconFav.height(),
          });
        }, timeout);

        $window.on('scroll.buy', function () {
          if (length < 1) {
            create.remove();
            $window.off('scroll.buy');
            clearInterval(interval);
          }
          time = length / duration;
          create.css({
            "transition-duration": duration + 's',
            "top": iconFav[0].getBoundingClientRect().top,
            "left": iconFav[0].getBoundingClientRect().left,
          });
        });

        var interval = setInterval(() => {
          if (iconFav[0].getBoundingClientRect().top === create[0].getBoundingClientRect().top && iconFav[0].getBoundingClientRect().left === create[0].getBoundingClientRect().left) {
            create.remove();
            $window.off('scroll.buy');
            // favCount.text(data.favoriteCount);
            clearInterval(interval);
          }
        }, 100);
      })
    });
  }
  // open-filter
  window.openFilter = function () {
    const filterButton = document.querySelector('.js-open-filter');

    if (filterButton !== null) {
      const filterBlock = document.querySelector('.js-filter-sidebar');
      const filterClose = document.querySelector('.js-close-filter');

      // open filter
      filterButton.addEventListener('click', (event) => {
        filterBlock.classList.add('open');
        document.querySelector('body').classList.add('filter-opened');
        document.querySelector('.header').classList.add('filt');
      });

      filterClose.addEventListener('click', (event) => {
        filterBlock.classList.remove('open');
        document.querySelector('body').classList.remove('filter-opened');
        document.querySelector('.header').classList.remove('filt');
      });
    }
  }

  // accordion
  window.accordions = function () {
    $('body').find('.ac-trigger').each((i, el) => {
      let $this = $(el);
      let $parent = $this.closest('.ac');
      let $block = $parent.find('.ac-panel');
      let $button = $parent.find('.ac-trigger');
      let innerItems = $block.find('[tabindex]');
      let $parentMini = $parent.closest('.js-accordion-wrap');

      // show if .ac hasClass "is-active"
      if ($parent.hasClass('is-active')) {
        $block.show()
        $button.attr('aria-expanded', 'true').prop('aria-expanded', 'true');
      }
      if(!$parent.hasClass('more-info') ) {
        innerItems.each(function (i, el) {
          $(this).on('blur', function (event) {
            setTimeout(() => {
              if (i + 1 === innerItems.length  && document.activeElement.closest('.ac-panel') === null || i === 0 && document.activeElement.closest('.ac-panel') === null) {
                $parent.removeClass('is-active');
                $block.slideUp(400);
                $parentMini.removeClass('opened');
                $button.attr('aria-expanded', 'false').prop('aria-expanded', 'false');
              }
            }, 0)
          })
        })
      }

    })

    $('body').on('click', '.ac-trigger', (event) => {
      let $this = $(event.currentTarget);
      let $parent = $this.closest('.ac');
      let $parentMini = $parent.closest('.js-accordion-wrap');
      let $parentWrap = $parent.closest('.js-accordion');
      let $block = $parent.find('.ac-panel');
      let mitiple = $parentWrap.data('multiple');
      let innerItems = $block.find('[tabindex]');
      const tabindex = $this.attr('tabindex');

      if ($parent.hasClass('is-active')) {
        $parent.removeClass('is-active');
        $parentMini.removeClass('opened');
        $block.slideUp(400);
        $this.attr('aria-expanded', 'false').prop('aria-expanded', 'false');
        innerItems.each(function (el) {
          if(!$(el).hasClass('link--footer-column')) {
            $(this).attr('tabindex','-1').prop('tabindex','-1');
          }

        })
      } else {
        if (!mitiple) {
          $parentWrap.find('.ac-panel').slideUp(400);
          $parentWrap.find('.ac').removeClass('is-active');
        }
        $parent.addClass('is-active');
        $parentMini.addClass('opened');
        $block.slideDown(400)
        $this.attr('aria-expanded', 'true').prop('aria-expanded', 'true');
        innerItems.each(function (i) {
          $(this).attr('tabindex',tabindex).prop('tabindex',tabindex);

          if($this.hasClass('ac-card')) {
            if(i === 0) {
              $(this).focus()
            }
          }
        })
      }
    })
  }
  //select2
  window.customSelect = function () {
    // select2
    let query = {};

    $('.select2-selection__choice').each(function () {
      $(this).removeAttr('title');
    })


    $('.js-close-combinations-search').on('click', (event) => {
      const parent = $(event.currentTarget).closest('.js-combinations-search')

      $('body').removeClass('comb-search');
      parent.removeClass('open')
    })

    $('.js-mob-destroy-select').each((i, el) => {
      if($('body').hasClass('android-detect') || $('body').hasClass('ios-detect')) {
        setTimeout(() => {
          $(el).select2('destroy')
        }, 0)
      }
    })

    $('.tip-normal').tooltip({
      placement: "auto",
      html: true
    });


    setTimeout(() => {

      $(".select2-container").each(function () {
        if($(this).closest('.js-tooltip-on').length) {
          $(this).tooltip({
            title: function() {
              return $(this).find('.select2-selection__rendered').attr("title");
            },
            placement: "auto",
            tooltipClass: 'select2-tooltip',
            position: { my: "right center", at: "right bottom+15" }
            //container: 'body'
          });
        }

      })
    }, 500)

    $('.js-select').each((i, el) => {
      $(el).select2({
        allowClear: true,
        placeholder: $(this).data('placeholder'),
        minimumResultsForSearch: $(el).data('search-min-length') === undefined ? '10' : $(el).data('search-min-length'),
        dropdownPosition: 'below',
        dropdownParent: $(el).parent(),
        maximumSelectionLength: $(el).data('max-length'),
        language: {
          noResults: () => {
            return 'לא נמצאו תוצאות';
          },
          maximumSelected: () => {
            return + $(el).data('max-length') + ' ' +
              'באפשרותך לבחור עד ';
          },
          searching: function (params) {
            query = params;
            return 'Searching…';
          }
        },
        templateResult: function (item) {
          if (item.loading) {
            return item.text;
          }
          var term = query.term || '';
          var $result = markMatch(item.text, term);
          return $result;
        },
        // ajax: {
        //   url: '/select2.json',
        //   dataType: 'json'
        // }
      });

      function markMatch(text, term) {
        var match = text.toUpperCase().indexOf(term.toUpperCase());
        var $result = $('<span></span>');
        if (match < 0) {
          return $result.text(text);
        }
        $result.text(text.substring(0, match));
        var $match = $('<span class="select2-rendered__match"></span>');
        $match.text(text.substring(match, match + term.length));
        $result.append($match);
        $result.append(text.substring(match + term.length));
        return $result;
      }

      // clone and append choises

      $('.select2-search__field').on('blur', () => {
        $('body').removeClass('ios-pos')
      })

      $(el).on('select2:select', function (e) {
        if ($(this).hasClass('js-multi-mob')) {
          const parent = $(this).closest('div')
          let choosed = parent.find('.select2-selection__rendered').html();
          $('.js-choosed').html(choosed);
          $('.js-choosed').find('.select2-selection__choice').addClass('js-choosed-item');
          let length = $('.js-mobile-search').find('.select2-selection__rendered .select2-selection__choice').length;
          $('.js-mob-count-selected').text(length)
          $('body').addClass('ios-pos')

          if ($('.js-choosed').find('.js-choosed-item').length > 0) {
            $('.button--select').css('display', 'flex');
          } else {
            $('.button--select').css('display', 'none');
          }
        }

        if ($(this).hasClass('js-select-search-comb')) {
          const parent = $(this).closest('.js-combinations-search')
          const id = parent.data('id')
          $('body').removeClass('comb-search');
          parent.removeClass('open')
          let selectedText = $(this).find(':selected').text();
          $('.js-combinations-fake[data-id="'+ id +'"]').find('.select2-selection__rendered').text(selectedText)
        }

        $('.select2-selection__choice').each(function () {
          $(this).removeAttr('title');
        })
      })

      $(el).on('select2:unselect', function (e) {
        if ($(this).hasClass('js-multi-mob')) {
          const parent = $(this).closest('div')
          let choosed = parent.find('.select2-selection__rendered').html();
          $('.js-choosed').html(choosed);
          $('.js-choosed').find('.select2-selection__choice').addClass('js-choosed-item');
          let length = $('.js-mobile-search').find('.select2-selection__rendered .select2-selection__choice').length;
          $('.js-mob-count-selected').text(length)
        }
      })

      $(el).on('select2:open', function (e) {
        const parent = $(this).closest('div');
        const dropWown = parent.find('.select2-dropdown').closest('.select2-container');
        dropWown.addClass('imp')
        setTimeout(() => {
          parent.find('.select2-results__option--selected').on('click', (event) => {
           if($(event.currentTarget).closest('.js-select-search')) {
             $('.js-close-combinations-search').trigger('click')
           }
          })
        }, 500)
        if ($(this).hasClass('js-multi-mob')) {
          const parent = $(this).closest('div');
          const choosed = parent.find('.select2-selection__rendered');
          const drop = parent.find('.select2-dropdown').closest('.select2-container');
          const posTop = 8 +choosed.height() + 'px';
          $('body').addClass('ios-pos')
          setTimeout(() => {
            drop.css('top', 'calc(100% + '+posTop +')' )
          }, 0)
        }

        if ($(this).hasClass('js-select-search')) {
          const parent = $(this).closest('div')
          const input = parent.find('.select2-search__field')
          const selectClesr = document.createElement('div');
          selectClesr.classList.add('js-clear-selectSearch');
          $('<div>', {
            class: 'js-clear-selectSearch',
          }).appendTo(parent.find('.select2-search'));

          input.on('input', function () {
            let $val = $(this).val()
            if ($val.length > 0) {
              $(this).next('.js-clear-selectSearch').addClass('show');
            } else {
              $(this).next('.js-clear-selectSearch').removeClass('show');
            }
          })

          input.next('.js-clear-selectSearch').on('click', () => {
            input.val('');
            input.next('.js-clear-selectSearch').removeClass('show');
          })
        }

        if (e.target.dataset.dropdownInfoText) {
          $('.select2-results').prepend('<div class="select-2-dropdown-info-text">' + e.target.dataset.dropdownInfoText + '</div>');
        }
      })

      $(el).on('select2:closing', function () {
        const parent = $(this).closest('div')
        const input = parent.find('.select2-search__field')
        input.next('.js-clear-selectSearch').remove();
        $('.select-2-dropdown-info-text').remove();
      })
    })
  }

  // tabs
  window.tabsFunc = function () {
    const parent = document.querySelector('[data-tabs]');
    if (parent !== null) {
      const tabButton = parent.querySelectorAll('.js-tab-button');
      const buttonsWrap = parent.querySelector('.big-tabs__buttons');

      parent.querySelectorAll('.js-tab-block').forEach((el) => {
        if(!el.classList.contains('active')) {
          el.setAttribute('aria-hidden', 'true')
          el.querySelectorAll('[tabindex]').forEach((tabindex) => {
            tabindex.setAttribute('tabindex', '-1');
            tabindex.setAttribute('aria-disabled', 'true')
          })
          setTimeout(() => {
            el.querySelectorAll('.select2-selection').forEach((select) => {
              select.setAttribute('tabindex', '-1');
            })
          }, 0)
        }
      })

      tabButton.forEach((el, i) => {
        const id = el.getAttribute('data-id');
        const tabindex = el.getAttribute('tabindex')
        const prev = el.previousElementSibling;
        const next = el.nextElementSibling;
        const index = i;

        el.addEventListener('click', () => {
          document.querySelectorAll('.js-tab-block').forEach((elenemt) => {
            elenemt.classList.remove('active');

            elenemt.querySelectorAll('[tabindex]').forEach((el) => {
              el.setAttribute('tabindex', '-1')
              el.setAttribute('aria-disabled', 'true')
            })
            parent.classList.add('loading')

            setTimeout(() => {
              el.querySelectorAll('.select2-selection').forEach((select) => {
                select.setAttribute('tabindex', '9');
              })
            }, 0)

          })
          document.querySelectorAll('.js-tab-button').forEach((elenemt) => {
            elenemt.classList.remove('active');
            elenemt.setAttribute('aria-selected', 'false');
            elenemt.setAttribute('tabindex', '-1');
          })

          el.classList.add('active');
          el.setAttribute('tabindex', '9');
          el.setAttribute('aria-selected', 'true');

          if (el.classList.contains('js-line-detect')) {
            const topBHeight = document.querySelector('.js-uniq-top').offsetHeight;

            if (window.pageYOffset > topBHeight) {
              $('html, body').animate({
                scrollTop: topBHeight - 70
              }, 600);
            }
          }

          setTimeout(() => {
            parent.querySelector('.js-tab-block[data-id="' + id + '"]').classList.add('active');
            parent.querySelector('.js-tab-button[data-id="' + id + '"]').classList.add('active');
            parent.querySelector('.js-tab-block[data-id="' + id + '"]').querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelectorAll('[tabindex]').forEach((elenIn) => {
                  elenIn.setAttribute('tabindex', '-1')
                })
              }
            })
            parent.querySelector('.js-tab-block[data-id="' + id + '"]').querySelectorAll('[tabindex]').forEach((el) => {
              el.setAttribute('tabindex', '9')
              el.setAttribute('aria-disabled', 'false')
            })
          }, 0)

          setTimeout(() => {
            parent.classList.remove('loading')
          }, 300)
        })

        el.addEventListener('keyup', (event) => {
          switch (event.key) {
          case 'ArrowLeft':
            if(next !== null) {
              next.click()
              next.focus()
            } else {
              tabButton.forEach((btns, i) => {
                if(i === 0) {
                  btns.click()
                  btns.focus()
                }
              })
            }
            break;

          case 'ArrowRight':
            if(prev !== null) {
              prev.click()
              prev.focus()
            }else {
              tabButton.forEach((btns, i) => {
                if(i === tabButton.length - 1) {
                  btns.click()
                  btns.focus()
                }
              })
            }
            break;

          default:
            break;
          }
        })
      })

    }
  }

  //  js-short-top
  window.shortTop = function () {
    const shortTop = document.querySelector('.js-uniq-top');

    if (shortTop !== null) {
      window.addEventListener('scroll', () => {
        const headerJHeight = document.querySelector('.header').offsetHeight;
        const elHeight = shortTop.offsetHeight;
        const fixedBlock = document.querySelector('.js-short-top');
        if(fixedBlock !== null) {
          if (window.pageYOffset > elHeight - fixedBlock.offsetHeight * 1.2) {
            fixedBlock.style.top = headerJHeight + 'px';
            fixedBlock.style.opacity = 1;
          } else {
            fixedBlock.style.opacity = 0;
            fixedBlock.style.top = -140 + 'px';
          }
        }

      })
    }

  }
  //  js-short-top
  window.bigTabsButtonsWrap = function () {
    if (document.querySelector('.big-tabs__buttons-wrap') !== null) {
      let tabLeft = document.querySelector('.js-tabs-prev');
      let tabRight = document.querySelector('.js-tabs-next');
      tabRight.style.display = 'none';
      tabLeft.style.display = 'none';
      tabLeft.addEventListener('click', (event) => {
        document.querySelector('.big-tabs__buttons-wrap').scrollLeft -= 300;
        document.querySelector('.big-tabs__buttons-top').classList.add('left');
        event.currentTarget.style.display = 'none'
        tabRight.style.display = 'block';
      })

      tabRight.addEventListener('click', (event) => {
        document.querySelector('.big-tabs__buttons-wrap').scrollLeft += 300;
        document.querySelector('.big-tabs__buttons-top').classList.remove('left');
        event.currentTarget.style.display = 'none';
        tabLeft.style.display = 'block';
      })

      document.querySelector('.big-tabs__buttons-wrap').addEventListener('scroll', (event) => {
        if (event.currentTarget.scrollLeft < 0) {
          document.querySelector('.big-tabs__buttons-top').classList.add('left');
          tabLeft.style.display = 'none';
          tabRight.style.display = 'block';
        } else {
          document.querySelector('.big-tabs__buttons-top').classList.remove('left');
          tabLeft.style.display = 'block';
          tabRight.style.display = 'none';
        }
      })
    }


  }
  // lang-block
  window.langSwitch = function () {
    const parent = document.querySelector('[data-lang]');
    const langItem = document.querySelectorAll('.js-lang-item');
    const langName = document.querySelector('.js-lang-name');

    // its broken tab navigation on dropdown, i fixed it on line 1434

    // var isExpandButtonLanguage = function (event) {
    //   if (parent.classList.contains('open')) {
    //     parent.classList.remove('open')
    //     event.currentTarget.setAttribute('aria-expanded', 'false');
    //   } else {
    //     parent.classList.add('open')
    //     event.currentTarget.setAttribute('aria-expanded', 'true');
    //   }
    // }
    // parent.querySelector('.lang-block__body').addEventListener('click', (event) => {
    //   isExpandButtonLanguage(event);
    // });
    // parent.querySelector('.lang-block__body').addEventListener('blur', (event) => {
    //   isExpandButtonLanguage(event);
    // });

    parent.querySelector('.lang-block__body').addEventListener('click', (event) => {
      if (parent.classList.contains('open')) {
        parent.classList.remove('open')
        event.currentTarget.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('open')
        event.currentTarget.setAttribute('aria-expanded', 'true');
      }
    })

    parent.addEventListener('keydown', (event) => {
      var code = event.keyCode || event.which;
      if(code === 40) {
        event.preventDefault()
        langItem.forEach((el, i) => {
            if(i === 0) {
              el.focus()
            }
        })
      }
    });



    langItem.forEach((el, i) => {
      const name = el.getAttribute('data-name')
      const id = el.getAttribute('id');

      el.addEventListener('blur', (ev) => {
        setTimeout(() => {
          if (i + 1 === langItem.length && !document.activeElement.classList.contains('lang-block__item') || i === 0 && !document.activeElement.classList.contains('lang-block__item')) {
            parent.classList.remove('open')
            parent.querySelector('.lang-block__body').setAttribute('aria-expanded', 'false');
            el.closest('ul').removeAttribute('aria-activedescendant')
          }
        }, 0)
      })
      el.addEventListener('click', (event) => {
        langName.innerText = name;
        parent.classList.remove('open');
        document.querySelectorAll('.js-lang-item').forEach((elenemt) => {
          elenemt.classList.remove('is-current');
          elenemt.removeAttribute('aria-selected');
        })
        el.classList.add('is-current');
        el.setAttribute('aria-selected', 'true');
      });

      el.addEventListener('keydown', (event) => {
        var code = event.keyCode || event.which;
        const next = event.currentTarget.nextElementSibling;
        const prev = event.currentTarget.previousElementSibling;
        if (code === 13) {
          langName.innerText = name;
          document.querySelectorAll('.js-lang-item').forEach((elenemt) => {
            elenemt.classList.remove('is-current');
            elenemt.removeAttribute('aria-selected');
          })
          el.classList.add('is-current');
          el.setAttribute('aria-selected', 'true');

          setTimeout(() => {
            parent.classList.remove('open');
          }, 0)
        }

        if(code === 40) {
          event.preventDefault()
          if(next !== null) {
            setTimeout(() => {
              next.focus()
            }, 0)
          }
        }

        if(code === 38) {
          event.preventDefault()
          if(prev !== null) {
            setTimeout(() => {
              prev.focus()
            }, 0)
          } else {
            setTimeout(() => {
              next.focus()
            }, 0)
          }
        }

      });
    })
  }

  //Elipaz software dont delete
  // wave-surfer
  window.waveSurfer = function () {
    if (document.querySelectorAll('.wave-block') !== null) {
      let waveBlockWrap = document.querySelectorAll('.wave-block');

      waveBlockWrap.forEach((waveBlock) => {
        let height = waveBlock.getAttribute('data-height');
        let source = waveBlock.getAttribute('data-source');
        let bgc = waveBlock.getAttribute('data-bgc');
        let wcolor = waveBlock.getAttribute('data-wcolor');
        let pxPer = waveBlock.getAttribute('data-px-per');
        let barWMob = waveBlock.getAttribute('data-barw-mobile');
        let barHMob = waveBlock.getAttribute('data-barH-mobile');
        const surf = waveBlock.querySelector('.waveform')


        var wavesurfer = WaveSurfer.create({
          container: surf,
          scrollParent: true,
          height: height,
          backgroundColor: bgc,
          barWidth: window.outerWidth < 980 ? Number(barWMob) : 2,
          barGap: window.outerWidth < 980 ? Number(barWMob) : 2,
          barHeight: window.outerWidth < 980 ? Number(barHMob) : 0.7,
          cursorWidth: 0,
          progressColor: window.outerWidth < 980 ? '#f90' : 'white',
          waveColor: window.outerWidth < 980 ? '#CFD6DA' : '#9b9da0',
          responsive: true,
          minPxPerSec: pxPer,
          fillParent: true
        });

        wavesurfer.load(source);

        const formatFunc = function (value) {
          const minutes = Math.floor(value / 60);
          let seconds = Math.floor(value - minutes * 60);
          if (seconds < 10) seconds = '0' + seconds;

          return Number(minutes) + ':' + seconds
        }

        wavesurfer.on('ready', function () {
          const containerWave = wavesurfer.container;
          const parent = containerWave.closest('.wave-block');
          const currentTime = parent.querySelector('.js-wave-current');
          const durationTime = parent.querySelector('.js-wave-duration');

          currentTime.innerHTML = formatFunc(wavesurfer.getCurrentTime());
          durationTime.innerHTML = formatFunc(wavesurfer.getDuration());

          waveBlock.parentElement.querySelector('.js-play-audio').addEventListener('click', (ev) => {
            document.querySelectorAll('.js-play-audio').forEach((el) => {
              if (el.classList.contains('pause') && el !== ev.currentTarget) {
                el.click()
                el.classList.remove('pause')
              }
            })
            if (ev.currentTarget.classList.contains('pause')) {
              ev.currentTarget.classList.remove('pause')
              wavesurfer.pause();
            } else {
              ev.currentTarget.classList.add('pause')
              wavesurfer.play();
            }
          })
          if (document.querySelector('.js-open-audio-podcast') !== null) {
            document.querySelector('.js-open-audio-podcast').addEventListener('click', (ev) => {
              document.querySelector('.audio-block').classList.add('open')
            })

            document.querySelector('.js-close-audio').addEventListener('click', (ev) => {
              document.querySelector('.audio-block').classList.remove('open');
              document.querySelector('.js-play-audio').classList.remove('pause');
              wavesurfer.pause();
            })
          }
          wavesurfer.setVolume(0.2)
          var volumeInput = document.querySelector('#volume');
          volumeInput.value = 0.2;
          volumeInput.addEventListener('input', (e) => {
            wavesurfer.setVolume(e.target.value)
            e.target.style.background = `linear-gradient(to right, #f90 0%, #f90 ${e.target.value * 100}%, #CFD6DA ${e.target.value * 100}%, #CFD6DA 100%)`
          })
        });

        wavesurfer.on('finish', function () {
          document.querySelector('.js-play-audio').classList.remove('pause');
        });

        wavesurfer.on('audioprocess', function () {
          const containerWave = wavesurfer.container;
          const parent = containerWave.closest('.wave-block');
          const currentTime = parent.querySelector('.js-wave-current');

          currentTime.innerHTML = formatFunc(wavesurfer.getCurrentTime());
        });

        // Why you remove this?
        window.pauseWave = function () {
          wavesurfer.pause()
        }
      })



    }
  }
  if (document.querySelector('.js-open-audio') !== null) {
    const auidoTabElem = document.querySelector('.audio-block').querySelectorAll('[tabindex]');
    document.querySelector('.js-open-audio').addEventListener('click', (ev) => {
      const tabindex = ev.currentTarget.getAttribute('tabindex')
      document.querySelector('.audio-block').classList.add('open');
      document.querySelector('.audio-block').querySelector('.js-close-audio').focus();

      auidoTabElem.forEach((el, i) => {
        el.setAttribute('tabindex', tabindex)
      })
    })
    auidoTabElem.forEach((el, i) => {
      el.addEventListener('blur', (ev) => {
        setTimeout(() => {
          if (i + 1 === auidoTabElem.length && !document.activeElement.closest('.audio-block') || i === 0 && !document.activeElement.closest('.audio-block')) {
            document.querySelector('.audio-block').querySelector('.js-close-audio').focus();
          }
        }, 0)
      })
    })

    document.querySelector('.js-close-audio').addEventListener('click', (ev) => {
      document.querySelector('.audio-block').classList.remove('open');
      document.querySelector('.js-play-audio').classList.remove('pause');
      window.pauseWave()
      auidoTabElem.forEach((el, i) => {
        el.setAttribute('tabindex', '-1')
      })
      setTimeout(() => {
        document.querySelector('.ac-trigger').focus()
      }, 500)
    })
  }

  // useful dropdowns

  window.usefulDrop = function () {
    const usefulDrop = document.querySelectorAll('.js-useful-drop');

    if (usefulDrop !== null) {
      usefulDrop.forEach((el) => {
        const parent = el.closest('.useful-drop');
        const dropdown = parent.querySelector('.useful-drop__dropdown');
        const dropdownItem = parent.querySelectorAll('.js-useful-choose');
        const nameFiled = parent.querySelector('.js-useful-field');
        const pop = parent.querySelector('.drop-block__uniq');

        el.addEventListener('click', (event) => {
          if (parent.classList.contains('open')) {
            parent.classList.remove('open')
            dropdownItem.forEach((item) => {
              item.setAttribute('tabindex', '-1');
              el.setAttribute('aria-expanded', 'false');
            })
          } else {
            parent.classList.add('open')
            dropdownItem.forEach((item) => {
              item.setAttribute('tabindex', '9');
              el.setAttribute('aria-expanded', 'true');
            })
          }
        });

        dropdownItem.forEach((item, i) => {
          const grg = item
          const text = item.innerText;
          item.addEventListener('click', (event) => {
            dropdownItem.forEach((itemSec) => {
              itemSec.classList.remove('is-current')
            })
            event.currentTarget.classList.add('is-current')
            nameFiled.value = text;
            pop.innerHTML = text
            parent.classList.remove('open')
            // setTimeout(() => {
            //   nameFiled.focus()
            // },10)
          });

          item.addEventListener('blur', (ev) => {
            setTimeout(() => {
              if (i + 1 === dropdownItem.length && !document.activeElement.classList.contains('js-useful-choose' || i===0 && !document.activeElement.classList.contains('js-useful-choose'))) {
                parent.classList.remove('open')
                parent.setAttribute('aria-expanded', 'false');
              }
            }, 0)
          })
        })
      })
    }
  }

  // fixed widget
  widgetFunc();

  document.querySelectorAll('.checkbox-item, .item, .icon-checker').forEach((label) => {

    label.addEventListener('keyup', (event) => {
      var code = event.keyCode || event.which;

      if(code === 13) {
        label.querySelector('input').click()

        if(label.querySelector('input').checked) {
          label.setAttribute('aria-checked', 'true');
        } else {
          label.setAttribute('aria-checked', 'false');
        }
      }
    })

    label.addEventListener('click', (event) => {
      if(label.querySelector('input').checked) {
        label.setAttribute('aria-checked', 'true');
      } else {
        label.setAttribute('aria-checked', 'false');
      }
    })
  })

  if(document.querySelector('.js-print-article') !== null) {
    document.querySelector('.js-print-article').addEventListener('click', () => {
      window.print();
    })
  }

  let parseText = function(text, limit){
    if (text.length > limit)
      for (let i = limit; i > 0; i--){
        if(text.charAt(i) === ' ' && (text.charAt(i-1) != ','||text.charAt(i-1) != '.'||text.charAt(i-1) != ';')) {
          return text.substring(0, i) + '...';
        }
      }
    else
      return text;
  };

  $('.js-cut-text').each((i, el) => {
    const col = $(el).data('symbols')
    $(el).text( parseText($(el).html(), col))
  })

  $('.js-show-all').on('click', () => {
    $('.js-show-list').addClass('show-all')
    $('.js-show-all').hide()
  })

  if($('.js-dynamic-grid li').length === 4) {
    $('.js-dynamic-grid').addClass('double')
  }

  $('.js-overlay-map').on('click', (ev) => {
    $(ev.currentTarget).remove()
  })

  $('.js-all-text-button').each((i, el) => {
    const block = $(el).prev('.js-all-text-block')
    const blockHeight = $(el).prev('.js-all-text-block').height()
    const blockHeightTwo = Number(block.data('height'))
    block.css('height', blockHeightTwo+'px')

    $(el).on('click', (ev) => {
      if($(el).hasClass("is-active")){
        block.css('height', blockHeightTwo+'px')
        $(ev.currentTarget).removeClass('is-active')
      } else {
        block.css('height', blockHeight)
        $(ev.currentTarget).addClass('is-active')
      }

    })
  })



  // about page avatar amimation
  if(document.querySelector('.js-about-anim') !== null) {
    (function () {
      const A = {};
      window.aboutAnimate = A;

      (A.photo = $('.about-item--first .about-item__img img')).css({"transform-origin": "top left", right: "unset", bottom: "unset"});
      (A.photoContainer = A.photo.parent()).css({overflow: "visible"});
      A.photo.closest('.section').css({"z-index": 10});
      A.baseWidth = A.photo.data('basewidth') || A.photo.width();
      A.clipRadius = A.photo.data('clipradius') || Math.min(A.photo.width(), A.photo.height()) / 2;
      A.clipCX = A.photo.data('clipcx') || (A.photo.width() / 2);
      A.clipCY = A.photo.data('clipcy') || (A.photo.height() / 2);

      A.avatar = $('.facultet-item__avatar img');
      (A.avatarContainer = A.avatar.parent()).css({"z-index": 10});
      A.avatar.closest('.section').css({"z-index": 9});
      A.avatarRadius = A.avatar.width() / 2;
      (A.card = A.avatar.closest('.facultet-item')).css({opacity: 0});

      A.chatAvatar = $('.sms-item--user .sms-item__avatar img').css({opacity: 0});;
      A.chatMainItem = A.chatAvatar.closest('.sms-item');
      (A.chatItems = A.chatAvatar.closest('.section').find('.sms-item, .about-item__bottom button')).css({position: "relative", top: 50, opacity: 0});
      A.chat = A.chatAvatar.closest('.sms-block');

      A.stage = 0;
      A.animating = 0;

      A.photoAnimateStep = function (t, fx) {
        if (t < 1) {
          const tAvatarScale = t <= 0? 1: (t < 1? A.avatarScale * t + 1 - t: A.avatarScale);
          A.photo.css({
            "clip-path": "circle(" + ((A.clipRadius * t + 500 * (1 - t)) * A.photoScale) + "px at " + (A.clipCX * A.photoScale) + "px " + (A.clipCY * A.photoScale) + "px)",
            top: (A.avatarTop - A.photoTop - (A.clipCY - A.clipRadius) * A.photoScale * tAvatarScale) * t,
            left: (A.avatarLeft - A.photoLeft - (A.clipCX - A.clipRadius) * A.photoScale * tAvatarScale) * t,
            transform: `scale(${tAvatarScale})`,
          });
        }
        else {
          const t2 = t - 1;
          A.photo.css({
            "clip-path": "circle(" + (A.clipRadius * A.photoScale) + "px at " + (A.clipCX * A.photoScale) + "px " + (A.clipCY * A.photoScale) + "px)",
            top: A.avatarTop - A.photoTop - (A.clipCY - A.clipRadius) * A.photoScale * A.avatarScale  + (A.chatAvatarTop - A.avatarTop) * t2,
            left: A.avatarLeft - A.photoLeft  - (A.clipCX - A.clipRadius) * A.photoScale * A.avatarScale + (A.chatAvatarLeft - A.avatarLeft) * t2,
            transform: `scale(${A.avatarScale})`,
          });
        }
      }

      A.avatarAnimateStep = function (t, fx) {
        const t2 = t - 1;
        A.avatarContainer.css({
          top: (A.chatAvatarTop - A.avatarTop) * t2,
          left: (A.chatAvatarLeft - A.avatarLeft) * t2,
        });
      }

      A.onResize = function () {
        let o;
        A.windowHeight = $(window).height();
        A.viewportGreyZone = Math.min(100, A.windowHeight / 3);
        A.cardHeight = A.card.height();
        A.chatHeight = A.chat.height();
        o = A.chat.offset();
        A.chatTop = o.top;
        A.photoVisible = A.photo.is(':visible');
        if (A.photoVisible) {
          A.avatar.css({opacity: 0});

          A.photoWidth = A.photo.width();
          A.photoScale = A.photoWidth / A.baseWidth;
          A.avatarScale = A.avatarRadius / (A.clipRadius * A.photoScale);
          o = A.photoContainer.css({top: 0, left: 0}).offset();
          window.setTimeout(() => A.photoAnimateStep(A.stage), 1);
          A.photoTop = o.top;
          A.photoLeft = o.left;
        }
        else {
          A.avatar.css({opacity: 1});
        }
        o = A.avatarContainer.css({top: 0, left: 0}).offset();
        window.setTimeout(() => A.avatarAnimateStep(A.stage), 1);
        A.avatarTop = o.top;
        A.avatarLeft = o.left;
        o = A.chatAvatar.offset();
        A.chatAvatarTop = o.top - parseInt(A.chatMainItem.css('top'));
        A.chatAvatarLeft = o.left;
        A.onScroll();
      }

      A.onScroll = function () {
        if (! A.windowHeight) {
          A.onResize();
          return;
        }
        if (A.animating) return;

        const scrollTop = $(window).scrollTop();

        if (! A.photoVisible || scrollTop + A.windowHeight / 2 > (A.avatarTop + A.photoTop) / 2) {
          if (A.stage < 2 && ((scrollTop + A.windowHeight > A.chatTop + A.chatHeight) || (scrollTop + A.windowHeight / 2 > A.chatTop))) {
            if (A.stage != 2) {console.log([scrollTop, A.windowHeight, A.chatTop,  A.chatHeight])
              //$(window).animate({scrollTop, A.chatAvatarTop + 150}, 150);
              //A.chat[0].scrollIntoView({align: "bottom", behavior: 'smooth'});
              if (A.photoVisible) A.photo.stop().animate({stage: 2}, {step: A.photoAnimateStep, duration: 600, start: A.animationStart, complete: A.animationComplete});
              else A.avatar.stop().animate({stage: 2}, {step: A.avatarAnimateStep, duration: 600, start: A.animationStart, complete: A.animationComplete});
              A.card.stop().animate({opacity: 1}, {duration: 300, start: A.animationStart, complete: A.animationComplete});
              A.chatItems.each(function (i) {
                A.animationStart();
                $(this).stop().css({top: 50, opacity: 0}).delay(500 + i * 100).animate({top: 0, opacity: 1}, 200, A.animationComplete);
              });
              A.stage = 2;
            }
          }
          else if ((A.stage > 1 && scrollTop + A.viewportGreyZone < A.avatarTop) || (A.stage < 1 && scrollTop + A.windowHeight > A.avatarTop + Math.min(A.cardHeight * 0.8, A.windowHeight * 0.5))) {
            if (A.stage != 1) {
              if (A.photoVisible) A.photo.stop().animate({stage: 1}, {step: A.photoAnimateStep, duration: 600, start: A.animationStart, complete: A.animationComplete});
              else A.avatar.stop().animate({stage: 1}, {step: A.avatarAnimateStep, duration: 600, start: A.animationStart, complete: A.animationComplete});
              A.card.stop().delay(500).animate({opacity: 1}, {duration: 300, start: A.animationStart, complete: A.animationComplete});
              A.chatItems.each(function (i) {
                A.animationStart();
                $(this).stop().delay(i * 100).animate({top: -50, opacity: 0}, 200, A.animationComplete);
              });
              A.stage = 1;
            }
          }
        }
        else {
          if (A.stage != 0) {
            A.photo.stop().animate({stage: 0}, {step: A.photoAnimateStep, duration: 600, start: A.animationStart, complete: A.animationComplete});
            A.card.stop().animate({opacity: 0}, {duration: 300, start: A.animationStart, complete: A.animationComplete});
            A.stage = 0;
          }
        }

        A.scrollTop = scrollTop;
      }

      A.animationStart = function () {
        A.animating++;
      }

      A.animationComplete = function () {
        A.animating--;
        if (A.animating <= 0) {
          A.animating = 0;
          A.onScroll();
        }
      }

      window.setTimeout(() => A.onScroll(), 200);

      $(window).on('scroll', function () {
        A.onScroll();
      })
      .on('resize', function () {
        A.onResize();
      });
    })();
  }

  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,

      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title');
      }
    },
  });

  $('.js-detect-grid').each((i, el) => {
     const $el = $(el);
     const $col = $el.children().length;

    $el.addClass('grid-'+$col)
  })

  $('.js-symbol-count').each((i, el) => {
    const $el = $(el);
    const $field = $el.find('textarea');
    const $current = $el.find('.js-symbol-current');

    $field.on('keyup', (e) => {
      $current.text($field.val().length)
    })

  })

  $('body').on('click', '.open-kabala-item', (ev) => {
      let next = $(ev.currentTarget).next('.ac').find('.ac-panel').html()

    $('.js-kabala-paste').html($.parseHTML(next))
    $('.kabala-popup').addClass('show')
  })

  $('body').on('click', '.js-kabala-close', (ev) => {
    let parent = $(ev.currentTarget).closest('.kabala-popup')

    parent.removeClass('show')
  })

  if($('.bakalavr-block').find('.bakalavr-block__img').length === 0) {
    $('.bakalavr-block').find('.bakalavr-block__content').addClass('center')
  }
})
