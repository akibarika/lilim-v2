$(document).ready(function(){
	jQuery(function() {
		$('.search-text .text').focus(function() {
			if ($(this).val() == '找东西？') {
				$(this).val('')
			}
		}).blur(function() {
			if ($(this).val() == '') {
				$(this).val('找东西？')
			}
		})
	});
/*
    Initial whole wrap
    Stop article arsing
    Adjust column heights
*/
    function stop(items){
        items.addClass('stop');
    }
    // Algorithm credit to thethemefoundry.com
    function adjustColumnHeights(items) {
        var leftColumnHeight = 0;
        var rightColumnHeight = 0;

        for (var i = 0; i < items.length; i++) {
            if (leftColumnHeight > rightColumnHeight) {
                rightColumnHeight += items.eq(i).addClass('right').outerHeight(true);
            } else {
                leftColumnHeight += items.eq(i).removeClass('right').outerHeight(true);
            }
        }
    };
    function initial (items) {
        stop(items);
        tag();
        adjustColumnHeights(items);
        adjustMenu('ul#menu-cat-menu li');
    }

    initial($('#post .item'));
    placeToolbar(960,60,20);

    function turnpage(pageurl){
        $('.pageload-overlay').addClass('show');
        $('html,body').animate({scrollTop: 0}, 300);
        $('.item').addClass('fading');
        $.ajax({
            url:pageurl
        }).done(function(data){
            var html = $.parseHTML(data);
            $("#post").html($("#post",html).html());
            $(".navigation").html($(".navigation",html).html());
            var imgload = imagesLoaded( $('#post') );
            imgload.on('done', function(){
                initial($('#post .item'));
            });
        });
    }
    //Article tag
    function tag() {
        $('.tag ul > li:first-child').mouseenter(function(event) {
            event.stopPropagation();
            $(this).parents('ul').addClass('show');
        });
        $('.tag ul > li').click(function(event) {
            event.stopPropagation();
        });
        $('.tag ul').mouseleave(function(event) {
            event.stopPropagation();
            $(this).removeClass('show');
        });
    }
    //add post img class v0.1
    $(".post-detail p a[href]").filter("[href$='png'], [href$='jpg']").addClass("img");
    //Adjust menu width
    function adjustMenu(menuList) {
        var count = $(menuList).size();
        var hentai = 100 / count;
        $(menuList).css('width', hentai +'%');

        $('.wrapper-menu').css('height', $(window).height() + 'px');
    }
    //Place the right tool-bar
    function placeToolbar(wrap,a,b) {
        var loli = parseInt((jQuery(window).width() - wrap +1) / 2 - a - b);
        if (loli<20){
            loli = 20;
        }
        $(".right-toolbar").css({
            right:loli,
            opacity:1
        });
    }

    var currentState = window.location.href;
    window.addEventListener('popstate',function(event){
        var _currentUrl = window.location.href;
        if(currentState != _currentUrl){
            turnpage(_currentUrl);
            currentState = _currentUrl;
        }
    });

    jQuery(document).on("click",".navigation a",function(event){
        event.preventDefault();
        var currentLink = $(this).attr("href");
        turnpage(currentLink);
        history.pushState(null,document.title,currentLink);
        currentState = window.location.href;
    });

    jQuery(document).on("click","nav.search .dropdown",function(){
        var type = $(this).data('filter');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.filters').removeClass('open');
            $('.filters').slideToggle('slow');
            setTimeout(function() {
                $('.filters .filter').hide();
            }, 500);
        } else {
            $('nav.search .dropdown').removeClass('active');
            $(this).addClass('active');
            if ($('.filters').hasClass('open')) {
                $('.filters .filter').hide();
                $('.filters .filter.' + type).fadeIn();
            } else {
                $('.filters').addClass('open');
                $('.filters .filter.' + type).fadeIn();
                $('.filters').slideToggle('slow');
            }
        }
    });
    jQuery(document).on("click",".bt-search",function(event){
        event.stopPropagation();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('nav.search').removeClass('open');
            $('nav.search .dropdown').removeClass('active');
            $('nav.search, .filters').removeClass('open');
            $('.filters, .filters .filter').hide();
        } else {
            $(this).addClass('active');
            $('nav.search').addClass('open');
            $('nav .search-text input[type="text"]').focus();
        }
    });
    $(window).scroll(function(event) {
        event.stopPropagation();
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 48) {
            $('nav.search').removeClass('open');
            $('.bt-search').removeClass('active');
            $('body').addClass('header-fixed');
            $('.main').addClass('white-bg');
            $('nav.search .dropdown').removeClass('active');
            $('nav.search, .filters').removeClass('open');
            $('.filters, .filters .filter').hide();
        } else {
            if ($('nav.search').hasClass('visible')) {
                $('nav.search').addClass('open');
                $('.bt-search').addClass('active');
            }
            $('body').removeClass('header-fixed');
            $('.main').removeClass('white-bg');
        }
    });
    //Display the moblie menu
    jQuery(document).on("click","#menu-mobile .bt-menu",function(event){
        event.stopPropagation();
        if ($("#menu-mobile").hasClass('open')) {
            $("#menu-mobile").removeClass('open');
        } else {
            $("#menu-mobile").addClass('open');
        }
	});

    // Go down and up change
    var arrivedAtBottom = false;
    $(window).scroll(function(event){
        event.stopPropagation();
        arrivedAtBottom = $(window).scrollTop() >= $(document).height() - $(window).height();
        if(arrivedAtBottom){
            $('.tool-goto').removeClass("tool-down icon-angle-down");
            $('.tool-goto').addClass("tool-up icon-angle-up");
        }else{
            $('.tool-goto').removeClass("tool-up icon-angle-up");
            $('.tool-goto').addClass("tool-down icon-angle-down");
        }
    });
    jQuery(document).on("click",".right-toolbar .tool-up",function(){
        $('html, body').animate({scrollTop: 0}, 500);
    });
    jQuery(document).on("click",".right-toolbar .tool-down",function(){
        $('html, body').animate({scrollTop: $('#page-wrap').height()},500);
    });
    jQuery(document).on("click",".right-toolbar .icon-bubbles",function(){
        $('html, body').animate({scrollTop:$('#respond').position().top}, 500);
    });
    jQuery(document).on("click",".right-toolbar .icon-share",function(){
        $('html, body').animate({scrollTop:$('.WPSNS_main').position().top}, 500);
    });


})
function grin(tag){var myField;tag=' '+tag+' ';if(document.getElementById('comment')&&document.getElementById('comment').type=='textarea'){myField=document.getElementById('comment')}else{return false}if(document.selection){myField.focus();sel=document.selection.createRange();sel.text=tag;myField.focus()}else if(myField.selectionStart||myField.selectionStart=='0'){var startPos=myField.selectionStart;var endPos=myField.selectionEnd;var cursorPos=endPos;myField.value=myField.value.substring(0,startPos)+tag+myField.value.substring(endPos,myField.value.length);cursorPos+=tag.length;myField.focus();myField.selectionStart=cursorPos;myField.selectionEnd=cursorPos}else{myField.value+=tag;myField.focus()}}
