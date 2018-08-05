"use strict";
var lastScroll = 0;

//check for browser os
var isMobile = false;
var isiPhoneiPad = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    isiPhoneiPad = true;
}

function SetMegamenuPosition() {
    if ($(window).width() > 991) {
        setTimeout(function () {
            var totalHeight = $('nav.navbar').outerHeight();
            $('.mega-menu').css({
                top: totalHeight
            });
            if ($('.navbar-brand-top').length === 0)
                $('.dropdown.simple-dropdown > .dropdown-menu').css({
                    top: totalHeight
                });
        }, 200);
    } else {
        $('.mega-menu').css('top', '');
        $('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
    }
}

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number
    {
        return true;
    } else // If another browser, return 0
    {
        return false;
    }
}

//page title space
function setPageTitleSpace() {
    if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
        if ($('.top-space').length > 0) {
            var top_space_height = $('.navbar').outerHeight();
            if ($('.top-header-area').length > 0) {
                top_space_height = top_space_height + $('.top-header-area').outerHeight();
            }
            $('.top-space').css('margin-top', top_space_height + "px");
        }
    }
}

$(window).on("scroll", init_scroll_navigate);

function init_scroll_navigate() {

    /*==============================================================
     One Page Main JS - START CODE
     =============================================================*/

    var menu_links = $(".navbar-nav li a");
    var scrollPos = $(document).scrollTop();
    menu_links.each(function () {
        var currLink = $(this);
        var split = currLink.attr("href").split("#");
        var refElement = $("#" + split[1]);
        if (split[1] != null && currLink.attr("href").indexOf("#") > -1 && refElement.length > 0) {
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                menu_links.removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        }
    });

    /* ===================================
     sticky nav Start
     ====================================== */

    var headerHeight = $('nav').outerHeight();
    if (!$('header').hasClass('no-sticky')) {
        if ($(document).scrollTop() >= headerHeight) {
            $('header').addClass('sticky');

        } else if ($(document).scrollTop() <= headerHeight) {
            $('header').removeClass('sticky');
            setTimeout(function () {
                setPageTitleSpace();
            }, 500);
        }
        SetMegamenuPosition();
    }

    /* ===================================
     header appear on scroll up
     ====================================== */

    var st = $(this).scrollTop();
    if (st > lastScroll) {
        $('.sticky').removeClass('header-appear');
        //        $('.dropdown.on').removeClass('on').removeClass('open').find('.dropdown-menu').fadeOut(100);
    } else
        $('.sticky').addClass('header-appear');
    lastScroll = st;
    if (lastScroll <= headerHeight)
        $('header').removeClass('header-appear');
}

/*==============================================================
 equalize - START CODE
 ==============================================================*/

function equalizeHeight() {
    $(document).imagesLoaded(function () {
        if ($(window).width() < 768) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            $('.equalize.xs-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 992) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            $('.equalize.sm-equalize-auto').children().css("height", "");
            return false;
        } else if ($(window).width() < 1199) {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            $('.equalize.md-equalize-auto').children().css("height", "");
            return false;
        } else {
            $('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
        }
    });
}

/*==============================================================
 dynamic font size START CODE
 ==============================================================*/

function feature_dynamic_font_line_height() {
    if ($('.dynamic-font-size').length > 0) {
        var site_width = 1100;
        var window_width = $(window).width();
        if (window_width < site_width) {
            var window_site_width_ratio = window_width / site_width;
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size != '' && font_size != undefined) {
                    var new_font_size = Math.round(font_size * window_site_width_ratio * 1000) / 1000;
                    $(this).css('font-size', new_font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    var new_line_height = Math.round(line_height * window_site_width_ratio * 1000) / 1000;
                    $(this).css('line-height', new_line_height + 'px');
                }
            });
        } else {
            $('.dynamic-font-size').each(function () {
                var font_size = $(this).attr('data-fontsize');
                var line_height = $(this).attr('data-lineheight');
                if (font_size !== '' && font_size !== undefined) {
                    $(this).css('font-size', font_size + 'px');
                }
                if (line_height !== '' && line_height !== undefined) {
                    $(this).css('line-height', line_height + 'px');
                }
            });
        }
    }
}

/*==============================================================
 full screen START CODE
 ==============================================================*/

function fullScreenHeight() {
    var element = $(".full-screen");
    var $minheight = $(window).height();
    element.parents('section').imagesLoaded(function () {
        if ($(".top-space .full-screen").length > 0) {
            var $headerheight = $("header nav.navbar").outerHeight();
            $(".top-space .full-screen").css('min-height', $minheight - $headerheight);
        } else {
            element.css('min-height', $minheight);
        }
    });

    var minwidth = $(window).width();
    $(".full-screen-width").css('min-width', minwidth);

    var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
    $(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
    var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
    $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));
}

/* ===================================
 START RESIZE
 ====================================== */
$(window).resize(function (event) {
    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function (e) {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({
                    equalize: 'outerHeight',
                    reset: true
                });
                return false;
            }
        });
    });

    // setTimeout(function () {
    //     SetResizeContent();
    // }, 500);

    event.preventDefault();
});

/* ===================================
 START READY
 ====================================== */

$(document).ready(function () {
    "use strict";

    // Bootsnav menu work with eualize height
    $("nav.navbar.bootsnav ul.nav").each(function () {
        $("li.dropdown", this).on("mouseenter", function () {
            if ($(window).width() > 991) {
                $(this).find('.equalize').equalize({
                    equalize: 'outerHeight',
                    reset: true
                });
                return false;
            }
        });
    });
    // Bootsnav tab work with eualize height
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href");
        if ($(window).width() > 991) {
            $(target).find('.equalize').equalize({
                equalize: 'outerHeight',
                reset: true
            });
            return false;
        }
    });

    // Active class to current menu for only html
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    var $hash = window.location.hash.substring(1);

    if ($hash) {
        $hash = "#" + $hash;
        pgurl = pgurl.replace($hash, "");
    } else {
        pgurl = pgurl.replace("#", "");
    }

    $(".nav li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
            $(this).parent().addClass("active");
            $(this).parents('li.dropdown').addClass("active");
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150)
            $('.scroll-top-arrow').fadeIn('slow');
        else
            $('.scroll-top-arrow').fadeOut('slow');
    });
    //Click event to scroll to top
    $(document).on('click', '.scroll-top-arrow', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    /*==============================================================
     smooth scroll
     ==============================================================*/

    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';
    $(document).on('click.smoothscroll', 'a.scrollto', function (event) {
        event.preventDefault();
        var target = this.hash;
        if ($(target).length != 0) {
            $('html, body').stop()
                .animate({
                    'scrollTop': $(target)
                        .offset()
                        .top
                }, scrollAnimationTime, scrollAnimation, function () {
                    window.location.hash = target;
                });
        }
    });

    /*==============================================================
     humburger menu one page navigation
     ==============================================================*/

    if ($('.full-width-pull-menu').length > 0) {
        $(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
            //$('body').removeClass('overflow-hidden position-fixed');
            $(".full-width-pull-menu .close-button-menu").trigger("click");
            var _this = $(this);
            setTimeout(function () {
                var target = _this.attr("href");
                if ($(target).length > 0) {
                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        });
                }
            }, 500);
        });
    }

    // Inner links
    if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.nav-top-scroll').length > 0) {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: 0
        });
    } else {
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: -59
        });
    }

    $('.section-link').smoothScroll({
        speed: 900,
        offset: 1
    });

    /*==============================================================
     portfolio filter
     ==============================================================*/

    var $portfolio_filter = $('.portfolio-grid');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        $portfolio_filter.isotope();
    });
    var $grid_selectors = $('.portfolio-filter > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
        $portfolio_filter.find('.grid-item').each(function () {
            /* remove perticular element from WOW array when you don't want animation on element after DOM lead */
            wow.removeBox(this);
            $(this).css("-webkit-animation", "none");
            $(this).css("-moz-animation", "none");
            $(this).css("-ms-animation", "none");
            $(this).css("animation", "none");
        });
        $portfolio_filter.isotope({
            filter: selector
        });
        return false;
    });
    $(window).resize(function () {
        if (!isMobile && !isiPhoneiPad) {
            $portfolio_filter.imagesLoaded(function () {
                setTimeout(function () {
                    $portfolio_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
                    $portfolio_filter.isotope('layout');
                }, 300);
            });
        }
    });
    var $blog_filter = $('.blog-grid');
    $blog_filter.imagesLoaded(function () {
        $blog_filter.isotope({
            layoutMode: 'masonry',
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
    $(window).resize(function () {
        setTimeout(function () {
            $blog_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
            $blog_filter.isotope('layout');
        }, 300);
    });

    /* ===================================
         contact form
         ====================================== */

    var formPop = document.querySelector('#success-form');
    var userName = document.querySelector('#name');
    var email = document.querySelector('#email');
    var subject = document.querySelector('#subject');
    var message = document.querySelector('#message');

    document.querySelector('#contact-form-2').addEventListener('submit', function () {
        formPop.textContent = "Thank you " + userName.value + ". You message has been sent successfully, I'll reply shortly!";
        formPop.classList.add('alert-success');
        setTimeout(function () {
            formPop.remove();
            userName.value = "";
            email.value = "";
            subject.value = "";
            message.value = "";
        }, 10000)
    })

    /*==============================================================
     wow animation - on scroll
     ==============================================================*/

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    });
    $(window).imagesLoaded(function () {
        wow.init();
    });

    /*==============================================================*/
    //    hamburger menu 
    /*==============================================================*/

    $(document).on('click', '.btn-hamburger', function () {
        $('.hamburger-menu').toggleClass('show-menu');
        $('body').removeClass('show-menu');
    });


    $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-toggle="tab"], a.shopping-cart', function (e) {
        e.preventDefault();
    });

    $(document).on('touchstart click', 'body', function (e) {
        if ($(window).width() < 992) {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('in') && !$(e.target).hasClass('navbar-toggle')) {
                $('.navbar-collapse').collapse('hide');
            }
        } else {
            if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse ul').hasClass('in')) {
                $('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
                $('.navbar-collapse').find('ul.dropdown-menu').removeClass('in');
                $('.navbar-collapse a.dropdown-toggle').removeClass('active');
            }
        }
    });

    $('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
        $('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');
    });

    $('button.navbar-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $('a.dropdown-toggle').on("click", function (e) {
        if (isMobile) {
            $(".cart-content").css('opacity', '0');
            $(".cart-content").css('visibility', 'hidden');
        }
    });

    $(document).on('touchstart click', '.navbar-collapse [data-toggle="dropdown"]', function (event) {

        var $innerLinkLI = $(this).parents('ul.navbar-nav').find('li.dropdown a.inner-link').parent('li.dropdown');
        if (!$(this).hasClass('inner-link') && !$(this).hasClass('dropdown-toggle') && $innerLinkLI.hasClass('open')) {
            $innerLinkLI.removeClass('open');
        }
        var target = $(this).attr('target');
        if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').indexOf("#") <= -1 && !$(event.target).is('i')) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() > 991 && $(this).attr('href').indexOf("#") <= -1) {
            if (event.ctrlKey || event.metaKey) {
                window.open($(this).attr('href'), "_blank");
                return false;
            } else if (!target)
                window.location = $(this).attr('href');
            else
                window.open($(this).attr('href'), target);

        } else if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').length > 1 && $(this).attr('href').indexOf("#") >= 0 && $(this).hasClass('inner-link')) {
            $(this).parents('ul.navbar-nav').find('li.dropdown').not($(this).parent('.dropdown')).removeClass('open');
            if ($(this).parent('.dropdown').hasClass('open')) {
                $(this).parent('.dropdown').removeClass('open');
            } else {
                $(this).parent('.dropdown').addClass('open');
            }
            $(this).toggleClass('active');
        }
    });

    /* ===================================
     touchstart click
     ====================================== */

    $('body').on('touchstart click', function (e) {
        if ($(window).width() < 992) {}
    });

    /*==============================================================*/
    //Set Resize Header Menu - START CODE
    /*==============================================================*/

    $('nav.full-width-pull-menu ul.panel-group li.dropdown a.dropdown-toggle').on("click", function (e) {
        if ($(this).parent('li').find('ul.dropdown-menu').length > 0) {
            if ($(this).parent('li').hasClass('open')) {
                $(this).parent('li').removeClass('open');
            } else {
                $(this).parent('li').addClass('open');
            }
        }
    });

});

/* ===================================
 END READY
 ====================================== */


/* ===================================
 START Page Load
 ====================================== */

$(window).load(function () {
    var hash = window.location.hash.substr(1);
    if (hash != "") {
        setTimeout(function () {
            $(window).imagesLoaded(function () {
                var scrollAnimationTime = 1200,
                    scrollAnimation = 'easeInOutExpo';
                var target = '#' + hash;
                if ($(target).length > 0) {

                    $('html, body').stop()
                        .animate({
                            'scrollTop': $(target).offset().top
                        }, scrollAnimationTime, scrollAnimation, function () {
                            window.location.hash = target;
                        });
                }
            });
        }, 500);
    }

    fullScreenHeight();
});

/* ===================================
 END Page Load
 ====================================== */