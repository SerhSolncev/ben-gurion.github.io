const getElement = (context, selector) => {
  if (!context && !selector) {
    return null;
  }

  return context.querySelector(selector);
};

// main-slider
window.mainSlider = function () {
  const parentInit = document.querySelector('[data-slider="main"]');

  if(parentInit !== null) {
    const mainSlider = parentInit.querySelector('.swiper-container');

    const mainSwiper = new Swiper(mainSlider, {
      simulateTouch: false,
      loop: false,
      lazy: {
        loadOnTransitionStart: true
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 2000,
      followFinger: false,
      // autoplay: {
      //   delay: document.getElementById('delay-slider').value
      // },
      navigation: {
        nextEl: '.js-main-next',
        prevEl: '.js-main-prev',
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: '.top-swiper-pagination',
        clickable: true
      },
      on: {
        afterInit: (event) => {
          setTimeout(() => {
            event.$el[0].classList.add('show')
          }, 1000);
          setTimeout(() => {
            event.$el[0].classList.add('remove')
          }, 1200)
        },
        activeIndexChange: function () {
          parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
            bullet.setAttribute('tabindex', '10')
          })
        }
      }
    });

    parentInit.querySelector('.js-play-swiper').addEventListener('click', (event) => {
      const elem = event.currentTarget;
      if(elem.classList.contains('playing')) {
        mainSwiper.autoplay.stop()
        elem.classList.remove('playing');
      } else {
        mainSwiper.autoplay.start()
        elem.classList.add('playing');
      }
    })

    parentInit.querySelectorAll('.js-button-swiper').forEach((el, i) => {
      el.addEventListener('click', () => {
        mainSwiper.autoplay.stop()
        parentInit.querySelector('.js-play-swiper').classList.remove('playing');
      })
    })

    parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((el, i) => {
      el.addEventListener('click', () => {
        mainSwiper.autoplay.stop()
        parentInit.querySelector('.js-play-swiper').classList.remove('playing');
      })
    })

  }
}

// mini-slider
window.miniSlider = function () {
  const parentInit = document.querySelector('[data-slider="mini"]');

  if(parentInit !== null) {
    const miniSlider = parentInit.querySelector('.swiper-container');

    const miniSwiper = new Swiper(miniSlider, {
      simulateTouch: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: false,
      lazy: {
        loadOnTransitionStart: true
      },
      followFinger: false,
      navigation: {
        nextEl: '.js-mini-next',
        prevEl: '.js-mini-prev',
        disabledClass: 'swiper-lock',
      },

    });

    let navPosition = function () {
      let contentSlide = miniSwiper.wrapperEl.querySelector('.picture-block__content');
      let button = miniSwiper.wrapperEl.querySelector('.button--default');
      let buttonHeight = button.offsetHeight;
      let buttonLeft = button.offsetLeft;
      let buttonWidth = button.clientWidth;
      let posTop = contentSlide.offsetTop + contentSlide.offsetHeight;
      let posLeft = miniSwiper.wrapperEl.querySelector('.picture-block__content').offsetLeft;
      const nav = document.querySelector('.section__nav');
      nav.style.top = contentSlide.parentElement.classList.contains('reverse') ? posTop - 50 + 'px' : posTop + 15 + 'px';
      nav.style.left = posLeft + buttonLeft - buttonWidth / 2 - 30 + 'px';
    }
    navPosition();

    window.addEventListener('resize', function () {
      setTimeout(() => {
        navPosition();
      }, 300)
    });

    if(window.outerWidth > 1366) {
      miniSwiper.on('slideChangeTransitionEnd', function () {
        const image = document.getElementsByClassName('parallax');

        var p = new Parallax(image, {
          offsetYBounds: 1200,
          intensity: 40,
          center: 2.5,
          safeHeight: 0.15
        }).init()
      });
    }
  }
}

// card-slider
window.cardSlider = function () {
  const parentInit = document.querySelector('[data-slider="card"]');

  if(parentInit !== null) {
    const cardSlider = parentInit.querySelector('.swiper-container');

    const cardSwiper = new Swiper(cardSlider, {
      simulateTouch: true,
      effect: 'fade',
      loop: false,
      fadeEffect: {
        crossFade: true
      },
      lazy: {
        loadOnTransitionStart: true
      },
      followFinger: true,
      navigation: {
        nextEl: '.js-card-next',
        prevEl: '.js-card-prev',
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: '.card-swiper-pagination',
        clickable: true
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="card"]').style.display = 'none';
          }, 1000)
          parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
            bullet.setAttribute('tabindex', '11')
          })

          cardSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
            }
          })
        },
        activeIndexChange: function () {
          parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
            bullet.setAttribute('tabindex', '11')
          })
          cardSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
            }else {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '11')
            }
          })
        }
      },
    });
  }
}

// card-slider
window.smallCardsSlider = function () {
  const parentInit = document.querySelectorAll('[data-slider="small-cards"]');

  if(parentInit !== null) {
    parentInit.forEach((el) => {
      const smallCardsSlider = el.querySelector('.swiper-container');

      const smallCardsSwiper = new Swiper(smallCardsSlider, {
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true
        },
        loop: false,
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 16,
        a11y: false,
        watchSlidesProgress: true,
        followFinger: true,
        navigation: {
          nextEl: getElement(smallCardsSlider.closest('[data-slider="small-cards"]'), '.js-small-cards-next'),
          prevEl: getElement(smallCardsSlider.closest('[data-slider="small-cards"]'), '.js-small-cards-prev'),
          disabledClass: 'swiper-lock'
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2
          },
          640: {
            slidesPerView: 3
          },
          1024: {
            slidesPerView: smallCardsSlider.closest('.section--triple-cards') !== null ? '4' : '3'
          }
        },
        on: {
          afterInit: () => {
            setTimeout(() => {
              el.querySelector('.swiper-preloader[data-id="small-cards"]').style.display = 'none';
            }, 1000)

            smallCardsSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
              }
            })
          },
          slideChangeTransitionEnd: () => {
            console.log(16486);
            smallCardsSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelectorAll('[tabindex]').forEach((el) => {
                  el.setAttribute('tabindex', '-1')
                })
              }
            })
            setTimeout(() => {
              smallCardsSlider.querySelectorAll('.swiper-slide-visible').forEach((visible, i) => {
                visible.querySelectorAll('[tabindex]').forEach((el) => {
                  el.setAttribute('tabindex', '11')

                })
                if(i === 0) {
                  visible.querySelector('[tabindex]').focus()
                }
              })
            }, 100)
          }
        },
      });
    })
  }

}

// cards slider
window.cardsSlider = function () {
  const parentInit = document.querySelector('[data-slider="cards"]');

  if(parentInit !== null) {
    const cardsSlider = parentInit.querySelector('.swiper-container');

    const cardsSwiper = new Swiper(cardsSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 16,
      watchSlidesProgress: true,
      followFinger: false,
      navigation: {
        nextEl: '.js-cards-prev',
        prevEl: '.js-cards-next',
        disabledClass: 'swiper-lock'
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="cards"]').style.display = 'none';
          }, 1000)
          cardsSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('[tabindex]').forEach((el) => {
                el.setAttribute('tabindex', '-1')
              })
            }
          })
        },
        slideChangeTransitionEnd: () => {
          cardsSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('[tabindex]').forEach((el) => {
                el.removeAttribute('tabindex')

                el.setAttribute('tabindex', '-1')
              })
            }
          })
          setTimeout(() => {
            cardsSlider.querySelectorAll('.swiper-slide-visible').forEach((visible, i) => {
              visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                newVisible.setAttribute('tabindex', '11')
              })
              if(i === 0) {
                visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                  if(index === 0) {
                    newVisible.focus()
                  }
                })
              }
            })
          }, 100)
        }
      },
    });

    if(window.innerWidth < 640) {
      cardsSwiper.disable();
    }

    window.addEventListener('resize', function () {
      if(window.innerWidth < 640) {
        cardsSwiper.disable();
      } else {
        cardsSwiper.enable();
      }
    });
  }
}

// study slider
window.studySlider = function () {
  const parentInit = document.querySelector('[data-slider="study"]');

  if(parentInit !== null) {
    const studySlider = parentInit.querySelector('.swiper-container');

    const studySwiper = new Swiper(studySlider, {
      simulateTouch: true,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 40,
      followFinger: false,
      navigation: {
        nextEl: '.js-study-next',
        prevEl: '.js-study-prev',
        disabledClass: 'swiper-lock'
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        }
      }
    });

    if(window.innerWidth < 640) {
      studySwiper.disable();
    }

    window.addEventListener('resize', function () {
      if(window.innerWidth < 640) {
        studySwiper.disable();
      } else {
        studySwiper.enable();
      }
    });

  }
}

// article slider
window.articleSlider = function () {
  const parentInit = document.querySelector('[data-slider="article"]');

  if(parentInit !== null) {
    const articleSlider = parentInit.querySelector('.swiper-container');

    const articleeSwiper = new Swiper(articleSlider, {
      simulateTouch: false,
      speed: 900,
      lazy: {
        loadOnTransitionStart: true
      },
      followFinger: true,
      navigation: {
        nextEl: getElement(articleSlider.closest('[data-slider="article"]'), '.js-prev'),
        prevEl: getElement(articleSlider.closest('[data-slider="article"]'), '.js-next'),
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: getElement(articleSlider.closest('[data-slider="article"]'), '.swiper-pagination'),
        clickable: false
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            parentInit.querySelector('.swiper-preloader[data-id="article"]').style.display = 'none';
          }, 1000)
        }
      },
    });
  }
}

// gallerySlider
window.gallerySlider = function () {
  const parentInit = document.querySelector('[data-slider="gallery"]');

  if(parentInit !== null) {
    const gallerySlider = parentInit.querySelector('.swiper-container');

    const gallerySwiper = new Swiper(gallerySlider, {
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 40,
      loop: true,
      watchSlidesProgress: true,
      speed: 900,
      lazy: {
        loadOnTransitionStart: true
      },
      followFinger: true,
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="gallery"]').style.display = 'none';
          }, 1000)
          gallerySlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('.slider-link').forEach((el) => {
                el.setAttribute('tabindex', '-1')
              })
            }
          })
        }
      },
    });

    if(window.innerWidth < 767) {
      gallerySwiper.destroy(true, true);
    }

    window.addEventListener('resize', () => {
      if(window.innerWidth < 767) {
        gallerySwiper.destroy(true, true);
      }
    })
  }
}

// interests
window.interestsSlider = function () {
  const parentInit = document.querySelectorAll('[data-slider="interests"]');
  if(parentInit !== null) {
    parentInit.forEach((el) => {
      const interestsSlider = el.querySelector('.swiper-container');
      const interestsSwiper = new Swiper(interestsSlider, {
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true
        },
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 16,
        edgeSwipeThreshold: 50,
        watchSlidesProgress: true,
        followFinger: true,
        navigation: {
          nextEl: getElement(interestsSlider.closest('[data-slider="interests"]'), '.js-interest-prev'),
          prevEl: getElement(interestsSlider.closest('[data-slider="interests"]'), '.js-interest-next'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: getElement(interestsSlider.closest('[data-slider="interests"]'), '.int-swiper-pagination'),
          clickable: true
        },
        on: {
          afterInit: () => {
            setTimeout(() => {
              el.querySelector('.swiper-preloader[data-id="interests"]').style.display = 'none';
            }, 1000)
            el.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelector('.service-item').querySelectorAll('[tabindex]').forEach((el) => {
                  el.removeAttribute('tabindex')

                  setTimeout(() => {
                    el.setAttribute('tabindex', '-1')
                  }, 100)
                })
              }
            })
          },
          slideChangeTransitionEnd: () => {
            el.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelector('.service-item').querySelectorAll('[tabindex]').forEach((el) => {
                  el.removeAttribute('tabindex')

                  el.setAttribute('tabindex', '-1')
                })
              }
            })
            setTimeout(() => {
              el.querySelectorAll('.swiper-slide-visible').forEach((visible, i) => {
                visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                  newVisible.setAttribute('tabindex', '9')
                })
                if(i === 0) {
                  visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                    if(index === 0) {
                      newVisible.focus()
                    }
                  })
                }
              })
            }, 100)
          }
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          561: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          1300: {
            slidesPerGroup: 2,
            slidesPerView: interestsSlider.closest('.section--triple-int') !== null ? '3' : '4'
          }
        }
      });
    })

  }
}

// programSlider
window.programSlider = function () {
  const parentInit = document.querySelector('[data-slider="program"]');

  if(parentInit !== null) {
    const programSlider = parentInit.querySelector('.swiper-container');

    const programSwiper = new Swiper(programSlider, {
      simulateTouch: false,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      loop: false,
      speed: 900,
      lazy: {
        loadOnTransitionStart: true
      },
      followFinger: true,
      watchSlidesProgress: true,
      on: {
        afterInit: () => {
          programSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('[tabindex]').forEach((el) => {
                el.setAttribute('aria-disabled', 'true')
              })
            }
          })
        },
        activeIndexChange: function () {

          programSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
            }else {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '9')
            }
          })
        }
      },
      // navigation: {
      // 	nextEl: '.js-card-next',
      // 	prevEl: '.js-card-prev',
      // 	disabledClass: 'swiper-lock'
      // },
      // pagination: {
      //   el: '.card-swiper-pagination',
      //   clickable: true
      // }
    });
    const cubeControl = document.querySelectorAll('.js-cube-control');

    let removeClass = function () {
      cubeControl.forEach((el) => {
        el.classList.remove('active')
      })
    }

    cubeControl.forEach((el, i) => {
      const id = Number(el.getAttribute('data-id'));
      el.addEventListener('click', () => {
        programSwiper.slideTo(id, 900, false);
        removeClass();
        el.classList.add('active');
      })
    })
  }
}

// programSecondSlider
window.programSecondSlider = function () {
  const parentInit = document.querySelectorAll('[data-slider="program-second"]');

  if(parentInit !== null) {
    parentInit.forEach((slider) => {
      const programSecondSlider = slider.querySelector('.swiper-container');
      const programSecondSwiper = new Swiper(programSecondSlider, {
        simulateTouch: false,
        loop: true,
        speed: 900,
        lazy: {
          loadOnTransitionStart: true
        },
        followFinger: true,
        navigation: {
          nextEl: getElement(programSecondSlider.closest('[data-slider="program-second"]'), '.js-next'),
          prevEl: getElement(programSecondSlider.closest('[data-slider="program-second"]'), '.js-prev'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: getElement(programSecondSlider.closest('[data-slider="program-second"]'), '.swiper-pagination'),
          clickable: true
        },
        on: {
          afterInit: () => {
            setTimeout(() => {
              slider.querySelector('.swiper-preloader[data-id="program-second"]').style.display = 'none';
            }, 1000)
            slider.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
              bullet.setAttribute('tabindex', '9')
            })
          }
        }
      });
    })

  }
}

// science Slider
window.scienceSlider = function () {
  const parentInit = document.querySelector('[data-slider="science"]');

  if(parentInit !== null) {
    const scienceSlider = parentInit.querySelector('.swiper-container');

    const scienceSwiper = new Swiper(scienceSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      loop: false,
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 16,
      watchSlidesProgress: true,
      followFinger: true,
      navigation: {
        nextEl: getElement(scienceSlider.closest('[data-slider="science"]'), '.js-science-prev'),
        prevEl: getElement(scienceSlider.closest('[data-slider="science"]'), '.js-science-next'),
        disabledClass: 'swiper-lock'
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="science"]').style.display = 'none';
          }, 1000)
          scienceSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('[tabindex]').forEach((el) => {
                el.setAttribute('tabindex', '-1')
              })
            }
          })
        },
        activeIndexChange: function () {
          scienceSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
            }else {
              visible.querySelector('[tabindex]').setAttribute('tabindex', '9')
            }
          })
        }
      },
    });
  }
}

// science Slider
window.scienceBigSlider = function () {
  const parentInit = document.querySelector('[data-slider="science-big"]');

  if(parentInit !== null) {
    const scienceBigSlider = parentInit.querySelector('.swiper-container');

    const scienceBigSwiper = new Swiper(scienceBigSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      loop: false,
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 16,
      followFinger: true,
      navigation: {
        nextEl: getElement(scienceBigSlider.closest('[data-slider="science-big"]'), '.js-science-prev'),
        prevEl: getElement(scienceBigSlider.closest('[data-slider="science-big"]'), '.js-science-next'),
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: getElement(scienceBigSlider.closest('[data-slider="science-big"]'), '.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });

    if(!document.body.classList.contains('ios-detect') && !document.body.classList.contains('android')) {
      console.log(9999999999999999);
      scienceBigSwiper.on('progress', function () {
        if(scienceBigSwiper.$el[0].closest('.computer-science--full') !== null) {
          scienceBigSwiper.$el[0].querySelector('.swiper-slide-next').nextElementSibling.classList.add('my-next-slide')
        }
      });

      scienceBigSwiper.on('slideChange', function () {
        scienceBigSwiper.$el[0].querySelector('.my-next-slide').classList.remove('my-next-slide')
      });

      scienceBigSwiper.on('slideChangeTransitionEnd', function () {
        scienceBigSwiper.$el[0].querySelector('.swiper-slide-next').nextElementSibling.classList.add('my-next-slide')
      });
    }


  }
}

// department Slider
window.departmentSlider = function () {
  const parentInitNav = document.querySelector('[data-slider="nav-department"]');
  const parentInit = document.querySelector('[data-slider="department"]');

  if(parentInit !== null && parentInitNav !== null) {
    const navDepartmentSlider = parentInitNav.querySelector('.swiper-container');

    const navDepartmentSwiper = new Swiper(navDepartmentSlider, {
      spaceBetween: 16,
      slidesPerView: 4,
      slidesPerGroup: 1,
      freeMode: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      preloadImages: false,
      navigation: {
        nextEl: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.js-department-next'),
        prevEl: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.js-department-prev'),
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.swiper-pagination')
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        560: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="nav-department"]').style.display = 'none';
            navDepartmentSlider.querySelectorAll('.slide-min').forEach((el) => {
              el.addEventListener('click', () => {
                departmentSwiper.slideNext()
              })
            })
          }, 1000)
        }
      },
    });


    const departmentSlider = parentInit.querySelector('.swiper-container');

    const departmentSwiper = new Swiper(departmentSlider, {
    simulateTouch: false,
    preloadImages: false,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    speed: 300,
    lazy: {
      loadOnTransitionStart: true
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: getElement(departmentSlider.closest('[data-slider="department"]'), '.js-department-next'),
      prevEl: getElement(departmentSlider.closest('[data-slider="department"]'), '.js-department-prev'),
      disabledClass: 'swiper-lock'
    },
    thumbs: {
      swiper: navDepartmentSwiper,
      thumbsContainerClass: 'swiper-thumbs'
    },
      on: {
        afterInit: () => {
          departmentSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelectorAll('[tabindex ]').forEach((el) => {
                el.setAttribute('tabindex', '-1')
              })
            }
          })
        }
      },
  });
  }

  if(parentInit === null && parentInitNav !== null) {
    const navDepartmentSlider = parentInitNav.querySelector('.swiper-container');

    const navDepartmentSwiper = new Swiper(navDepartmentSlider, {
      spaceBetween: 16,
      slidesPerView: 4,
      slidesPerGroup: 1,
      freeMode: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      preloadImages: false,
      navigation: {
        nextEl: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.js-department-next'),
        prevEl: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.js-department-prev'),
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: getElement(navDepartmentSlider.closest('[data-slider="nav-department"]'), '.swiper-pagination')
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        560: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="nav-department"]').style.display = 'none';
          }, 1000)
          navDepartmentSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('.slide-min').setAttribute('tabindex', '-1')
            }
          })
          if(parentInitNav.querySelectorAll('.swiper-slide').length < 4) {
            parentInitNav.querySelector('.swiper-wrapper').classList.add('center')
          }
          if(parentInitNav.querySelectorAll('.swiper-slide').length === 1) {
            parentInitNav.querySelector('.swiper-wrapper').classList.add('single')
          }
        }
      },
    });
  }
}

window.fitSlider = function () {
  const parentWrap = document.querySelectorAll('.fit-block__slides');

  if(parentWrap !== null) {
    parentWrap.forEach((wrao) => {
      const parentInitNav = wrao.querySelector('[data-slider="fit-nav"]');
      const parentInit = wrao.querySelector('[data-slider="fit-main"]');

      const fitNav = parentInitNav.querySelector('.swiper-container');
      const fitNavSwiper = new Swiper(fitNav, {
        spaceBetween: 11,
        slidesPerView: 3,
        slidesPerGroup: 1,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        preloadImages: false,
        navigation: {
          nextEl: getElement(fitNav.closest('[data-slider="fit-nav"]'), '.js-next-nav'),
          prevEl: getElement(fitNav.closest('[data-slider="fit-nav"]'), '.js-prev-nav'),
          disabledClass: 'swiper-lock'
        },
        on: {
          afterInit: () => {
            setTimeout(() => {
              parentInitNav.querySelector('.swiper-preloader[data-id="fit-nav"]').style.display = 'none';
              if(parentInitNav.querySelectorAll('.swiper-slide').length < 4) {
                parentInitNav.querySelectorAll('.swiper-slide').forEach((slide) => {
                  slide.classList.add('wild')
                })
              }
            }, 1000)

          }
        }
      });

      const fitMain = parentInit.querySelector('.swiper-container');
      const fitMainSwiper = new Swiper(fitMain, {
        simulateTouch: false,
        preloadImages: false,
        watchOverflow: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        speed: 300,
        lazy: {
          loadOnTransitionStart: true
        },
        // effect: 'fade',
        // fadeEffect: {
        //   crossFade: true
        // },
        navigation: {
          nextEl: getElement(fitMain.closest('[data-slider="fit-main"]'), '.js-next'),
          prevEl: getElement(fitMain.closest('[data-slider="fit-main"]'), '.js-prev'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: parentInit.querySelector('.swiper-pagination'),
          clickable: true
        },
        thumbs: {
          swiper: fitNavSwiper,
          autoScrollOffset: true,
          thumbsContainerClass: 'swiper-thumbs'
        },
        on: {
          afterInit: () => {
            setTimeout(() => {
              parentInit.querySelector('.swiper-preloader[data-id="fit-main"]').style.display = 'none';
            }, 1000)
            fitMain.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
              bullet.setAttribute('tabindex', '9')
            })
          }
        }
      });
    })
  }

}


// specialization
window.specializationSlider = function () {
  const parentInit = document.querySelector('[data-slider="specialization"]');

  if(parentInit !== null) {
    const specializationSlider = parentInit.querySelector('.swiper-container');
    const specializationSwiper = new Swiper(specializationSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      slidesPerView: 3,
      slidesPerGroup: 2,
      spaceBetween: 16,
      followFinger: true,
      navigation: {
        nextEl: '.js-spec-prev',
        prevEl: '.js-spec-next',
        disabledClass: 'swiper-lock'
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="specialization"]').style.display = 'none';
          }, 1000)
        }
      },
    });

    if(window.innerWidth < 640) {
      specializationSwiper.disable();
    }

    window.addEventListener('resize', function () {
      if(window.innerWidth < 640) {
        specializationSwiper.disable();
      } else {
        specializationSwiper.enable();
      }
    });
  }
}

// faculties
window.facultiesSlider = function () {
  const parentInit = document.querySelector('[data-slider="faculties"]');

  if(parentInit !== null) {
    const facultiesSlider = parentInit.querySelector('.swiper-container');
    const facultiesSwiper = new Swiper(facultiesSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      slidesPerView: 4,
      slidesPerGroup: 2,
      spaceBetween: 15,
      followFinger: true,
      navigation: {
        nextEl: getElement(facultiesSlider.closest('[data-slider="faculties"]'), '.js-prev'),
        prevEl: getElement(facultiesSlider.closest('[data-slider="faculties"]'), '.js-next'),
        disabledClass: 'swiper-lock'
      },
      // pagination: {
      //   el: getElement(facultiesSlider.closest('[data-slider="faculties"]'), '.swiper-pagination'),
      //   clickable: true
      // },
      breakpoints: {
        320: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 28
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="faculties"]').style.display = 'none';
          }, 1000)
        }
      },
    });

    if(window.innerWidth > 640 && parentInit.classList.contains('js-short-slider')) {
      facultiesSwiper.disable();
    }
    if(window.innerWidth < 640 && parentInit.classList.contains('housing-block__list')) {
      facultiesSwiper.disable();
    }
  }
}

// filter
window.filterSlider = function () {
  const parentInit = document.querySelector('[data-slider="filter"]');

  if(parentInit !== null) {
    const filterSlider = parentInit.querySelector('.swiper-container');
    const filterSwiper = new Swiper(filterSlider, {
      simulateTouch: true,
      loop: false,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      loopedSlides: null,
      edgeSwipeThreshold: 50,
      freeMode: false,
      navigation: {
        nextEl: getElement(filterSlider.closest('[data-slider="filter"]'), '.js-next'),
        prevEl: getElement(filterSlider.closest('[data-slider="filter"]'), '.js-prev'),
        disabledClass: 'swiper-lock'
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            filterSlider.querySelectorAll('.swiper-slide').forEach((el, i) => {
              if(el.querySelector('.active')) {
                filterSwiper.slideTo(i, 900, false);
              }
            })
          }, 0)
          setTimeout(() => {
            parentInit.querySelectorAll('.swiper-button').forEach((button) => {
              button.classList.add('loaded')
            }, 500)
          })
        }
      },
      breakpoints: {
        320: {
          spaceBetween: parentInit.classList.contains('js-lobby-slider') ? 20 : 28,
          centeredSlides: false,
        },
        1024: {
          spaceBetween: parentInit.classList.contains('js-lobby-slider') ? 40 : 55,
          centeredSlides: false,

        }
      },
    });
  }
}

// sidebar
window.sidebarSlider = function () {
  const parentInit = document.querySelector('[data-slider="sidebar"]');

  if(parentInit !== null) {
    const sidebarSlider = parentInit.querySelector('.swiper-container');
    const sidebarSwiper = new Swiper(sidebarSlider, {
      spaceBetween: 16,
      slidesPerView: 4,
      freeMode: false,
      slidesPerGroup: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      preloadImages: false,
      pagination: {
        el: getElement(sidebarSlider.closest('[data-slider="sidebar"]'), '.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        560: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 3
        },
        1200: {
          slidesPerView: 4
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="sidebar"]').style.display = 'none';
          }, 1000)
        }
      },
    });

    if(window.innerWidth > 767) {
      sidebarSwiper.destroy(true, true);
    }

    window.addEventListener('resize', () => {
      if(window.innerWidth > 767) {
        sidebarSwiper.destroy(true, true);
      }
    })
  }
}

// lobby

window.lobbySlider = function () {
  const parentInit = document.querySelector('[data-slider="lobby"]');

  if(parentInit !== null) {
    const lobbySlider = parentInit.querySelector('.swiper-container');
    const lobbySwiper = new Swiper(lobbySlider, {
      spaceBetween: 16,
      slidesPerView: 1,
      freeMode: false,
      slidesPerGroup: 1,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      preloadImages: false,
      pagination: {
        el: getElement(lobbySlider.closest('[data-slider="lobby"]'), '.swiper-pagination'),
        clickable: true
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="lobby"]').style.display = 'none';
          }, 1000)
        }
      },
    });
  }
}


// include
window.includeSlider = function () {
  const parentInit = document.querySelector('[data-slider="include"]');

  if(parentInit !== null) {
    const includeSlider = parentInit.querySelector('.swiper-container');
    const includeSwiper = new Swiper(includeSlider, {
      simulateTouch: true,
      lazy: {
        loadOnTransitionStart: true
      },
      slidesPerView: 4,
      slidesPerGroup: 1,
      spaceBetween: 15,
      followFinger: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: getElement(includeSlider.closest('[data-slider="include"]'), '.js-prev'),
        prevEl: getElement(includeSlider.closest('[data-slider="include"]'), '.js-next'),
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: getElement(includeSlider.closest('[data-slider="include"]'), '.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        561: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 3
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 14
        }
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            parentInit.querySelector('.swiper-preloader[data-id="include"]').style.display = 'none';
          }, 1000)
          if(parentInit.querySelectorAll('.swiper-slide').length < 4) {
            parentInit.querySelector('.swiper-wrapper').classList.add('center')
          }
          if(parentInit.querySelectorAll('.swiper-slide').length === 1) {
            parentInit.querySelector('.swiper-wrapper').classList.add('single')
          }
          includeSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('.include-item').querySelectorAll('[tabindex]').forEach((el) => {
                el.removeAttribute('tabindex')

                setTimeout(() => {
                  el.setAttribute('tabindex', '-1')
                }, 100)
              })
            }
          })
        },
        slideChangeTransitionEnd: () => {
          includeSlider.querySelectorAll('.swiper-slide').forEach((visible, i) => {
            if(!visible.classList.contains('swiper-slide-visible')) {
              visible.querySelector('.include-item').querySelectorAll('[tabindex]').forEach((el) => {
                el.removeAttribute('tabindex')

                el.setAttribute('tabindex', '-1')
              })
            }
          })
          setTimeout(() => {
            includeSlider.querySelectorAll('.swiper-slide-visible').forEach((visible, i) => {
              visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                newVisible.setAttribute('tabindex', '9')
              })
              if(i === 0) {
                visible.querySelectorAll('[tabindex]').forEach((newVisible, index) => {
                  if(index === 0) {
                    newVisible.focus()
                  }
                })
              }
            })
          }, 100)
        }
      },
    });
  }
}

//master-slider
window.mastersSlider = function () {
  const parentInit = document.querySelector('[data-slider="masters"]');
  const parentInitNav = document.querySelector('[data-slider="masters-nav"]');

  if(parentInit !== null && parentInitNav !== null) {

    const mastersSliderNav = parentInitNav.querySelector('.swiper-container');

    const mastersSwiperNav = new Swiper(mastersSliderNav, {
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      simulateTouch: true,
      loop: false,
      lazy: {
        loadOnTransitionStart: true
      },
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 13,
      // centeredSlides: true,
      speed: 450,
      followFinger: true,
      on: {
        afterInit: () => {

        }
        // activeIndexChange: function () {
        //   parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
        //     bullet.setAttribute('tabindex', '10')
        //   })
        // }
      },
      breakpoints: {
        320: {
          slidesPerView: 4,
          spaceBetween: 14,
        },
        640: {
          slidesPerView: 6,
          spaceBetween: 14,
        }
      },
    });

    const mastersSlider = parentInit.querySelector('.swiper-container');

    const mastersSwiper = new Swiper(mastersSlider, {
      simulateTouch: false,
      loop: false,
      lazy: {
        loadOnTransitionStart: true
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 2000,
      followFinger: false,
      navigation: {
        nextEl: '.js-master-next',
        prevEl: '.js-master-prev',
        disabledClass: 'swiper-lock'
      },
      pagination: {
        el: '.master-swiper-pagination',
        clickable: true
      },
      thumbs: {
        swiper: mastersSwiperNav,
        thumbsContainerClass: 'swiper-thumbs'
      },
      on: {
        afterInit: () => {
          setTimeout(() => {
            document.querySelector('.swiper-preloader[data-id="masters"]').style.display = 'none';
          }, 1000)
        }
        // activeIndexChange: function () {
        //   parentInit.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
        //     bullet.setAttribute('tabindex', '10')
        //   })
        // }
      }
    });
  }
}
