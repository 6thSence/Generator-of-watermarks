
var submitForm = (function(){

    var init = function () {
        _setUpListners();

    };

    var _setUpListners = function() {
        $('#form').on('submit', function(e) {
            e.preventDefault();
            var
                $this = $(this);
            validateThis($this);
            //if (validateThis($this);
        });
    };


//Валидация формы
    function validateThis(form) {
        var
            textType = form.find("[data-validation='text']"),
            textType2 = form.find("[data-validation='text2']");

        textType.each(function(){
            var
                $this = $(this),
                emptyField = $this.val() == '';
            console.log($this.val());
            if (emptyField) {
                $this.tooltip({
                    content     : 'Зазрузите изоражение (JPG)',
                    position    : 'left'
                });

                $this.addClass('error');
            } else {
                $this.removeClass('error');
            }
        });
        textType2.each(function(){
            var
                $this = $(this),
                emptyField = $this.val() == '';
            console.log($this.val());
            if (emptyField) {
                $this.tooltip({
                    content     : 'Зазрузите изоражение (PNG)',
                    position    : 'left'
                });

                $this.addClass('error');
            } else {
                $this.removeClass('error');
            }
        });
        return form.find('.error').length == 0;
    }
//Плагин tooltipster
    $.fn.tooltip = function(options){

        options = {
            position: options.position || 'right',
            content : options.content || "i'am tooltip"
        };

        var
            markup = '<div class="tooltip tooltip_' + options.position + '">' +
                '<div class="tooltip__inner">' + options.content + '</div>' +
                '</div>';

        var
            $this = this,
            body = $('body');

        $this
            .addClass('tooltipstered')
            .attr('data-tooltip-position', options.position);

        body.append(markup);

        _positionIt($this, body.find('.tooltip').last(), options.position);

        $(document).on('click', function(){
            $('.tooltip').remove();
        });

        $(window).resize(function(){
            var
                tooltips = $('.tooltip');

            var
                tooltipsArray = [];

            tooltips.each(function(){
                tooltipsArray.push($(this));
            });

            $('.tooltipstered').each(function(index){
                var
                    position = $(this).data('tooltip-position');

                _positionIt($(this), tooltipsArray[index], position);
            });
        });


        function _positionIt(elem, tooltip, position) {

            // измеряем элемент

            var
                elemWidth = elem.outerWidth(true),
                elemHeight = elem.outerHeight(true),
                topEdge = elem.offset().top,
                bottomEdge = topEdge + elemHeight,
                leftEdge = elem.offset().left,
                rigthEdge = leftEdge + elemWidth;

            // измеряем тултип

            var
                tooltipWidth = tooltip.outerWidth(true),
                tooltipHeight = elem.outerHeight(true),
                leftCentered = (elemWidth / 2) - (tooltipWidth / 2),
                topCentered = (elemHeight / 2) - (tooltipHeight / 2);

            var
                positions = {};

            switch(position) {
                case 'right' :
                    positions = {
                        left: rigthEdge,
                        top : topEdge + topCentered
                    };
                    break;
                case 'top' :
                    positions = {
                        left: leftEdge + leftCentered,
                        top : topEdge - tooltipHeight
                    };
                    break;
                case 'bottom' :
                    positions = {
                        left : leftEdge + leftCentered,
                        top : bottomEdge
                    };
                    break;
                case 'left' :
                    positions = {
                        left : leftEdge - tooltipWidth,
                        top : topEdge + topCentered
                    };
                    break;
            }

            tooltip
                .offset(positions)
                .css('opacity', '1');
        }
    };

    return {
        init: init
    };

})();

submitForm.init();



var OpacitySlider = (function(){

    var _setUpListners = function() {
    	$( "#slider" ).slider({'value':100,
            range: "min"
        }).on( "slide", function( event, ui ) {
	  	var opacity = ui.value/100;
	  	$('.mainMark,.flagHolder').css('opacity', opacity);
	  	// console.log($( "#slider" ).slider('value'));
	  });
    };
    


    var init = function () {
        _setUpListners();

    };




    return {
        init: init
    };

})();

OpacitySlider.init();


var FileUploadJQ = (function(){

    var _setUpListners = function() {
    	$('#fileuploadImage').fileupload({
        dataType: 'json',
        progressall: function (e, data) {
        $('.aim-img').css('position', 'relative').append('<div class="mainIMG css_animation spiner"></div>');
    },
        done: function (e, data) {
            $('#fileuploadImage').attr('disabled', 'disabled');
            $.each(data.result.files, function (index, file) {
                $('.mainImg').text(file.name);
                $('#watermark').removeAttr('disabled');
                $('body').append('<img src="server/php/files/'+ file.name +'" class="mainIMG">');
                $(".mainIMG").hide().on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    $('.aim-img').append('<div class="mainIMGHolder"></div>')
                    if(width > 648 || height > 648){
                    if(width > height){
                        var finalSize = (width/height);
                        _setUpListners2();
                        $('.mainIMGHolder').css({
                            'width': '648px',
                            'height': 648/finalSize+'px',
                            'background': 'url(../server/php/files/'+ file.name +')',
                            'background-size':'contain',
                            'overflow':'hidden'
                        });
                    } else {
                         var finalSize = (height/width);
                         _setUpListners2();
                         $('.mainIMGHolder').css({
                            'height': '533px',
                            'width': 533/finalSize+'px',
                            'background': 'url(../server/php/files/'+ file.name +')',
                            'background-size':'contain',
                            'overflow':'hidden'
                        });
                    }
                    } else {
                        _setUpListners2();
                       $('.mainIMGHolder').css({
                            'height': height,
                            'width': width,
                            'background': 'url(../server/php/files/'+ file.name +')',
                            'background-size':'contain',
                            'overflow':'hidden'
                        });
                    }

                        
                });

                
            });
        }
    });
    };

     var _setUpListners2 = function() {
        $('#watermark').fileupload({
        dataType: 'json',
         progressall: function (e, data) {
        $('.aim-img').append('<div class="mainIMG css_animation spiner"></div>');
        },
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('.mainWatermark').text(file.name);
                $('.mainIMGHolder').append('<img src="server/php/files/'+ file.name +'" class="mainMark">');
                $('.spiner').remove();
                $(".mainMark").hide().on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    if(width > 648 || height > 648){
                    if(width > height){
                        $(this).css('width', '100%').show('fast').draggable();
                        ZAMOS.init(width,height,file.name);
                    } else {
                         $(this).css('height', '100%').show('fast').draggable();
                         ZAMOS.init(width,height,file.name);
                    }
                    } else {
                        $(this).show('fast').draggable();
                        ZAMOS.init(width,height,file.name);                        
                    }
                    
                });
            });
        }
    });
    };


    var init = function () {
        _setUpListners();

    };


    return {
        init: init
    };

})();

FileUploadJQ.init();



var ZAMOS = (function(){
    


    var init = function (width,height,file) {
        var mainIMGHolderWidth = $('.mainIMGHolder').width();
        var mainIMGHolderHeight = $('.mainIMGHolder').height();
        var flagWidth = width;
        var flagHeight = height;
        var mainIMGHolderArea = mainIMGHolderWidth * mainIMGHolderHeight;
        var flagArea = flagWidth * flagHeight;
        var integer = (mainIMGHolderArea/flagArea)*4;
        $('.btn__clear').on('click', function() {
            $('.mainMark').hide().removeClass('mainMark').addClass('flag');
        console.log(mainIMGHolderArea);
        console.log(flagArea);
        console.log(mainIMGHolderArea/flagArea);
            $('.mainIMGHolder').append('<div class="flagHolder"></div>');
            $('.flagHolder').css({
                'position': 'absolute',
                'width': mainIMGHolderWidth*2+'px',
                'height': mainIMGHolderHeight*2+'px',
                'border':'1px solid green',
                'top':'-50%',
                'bottom':'0',
                'left':'-50%',
                'right':'0',
                'margin':'auto'
            }).draggable();
            main2.init();

            for(var i = 0;i<=integer;i++){
            $('.flagHolder').append('<img src="server/php/files/'+ file +'" class="flag">');                
            }

            $('#moveX').on('keyup', function() {
                var z = $('#moveX').val();
                console.log(z);
                $('.flag').css('border-bottom', z+'px solid transparent');
                
            });

            $('#moveY').on('keyup', function() {
                var z = $('#moveY').val();
                console.log(z);
                $('.flag').css('border-left', z+'px solid transparent');
                
            });
            
        });


    };


    return {
        init: init
    };


    

})();


var main2 = (function(){

    
    var _setUpListners = function() {
        $('.flagHolder').on(' mouseup', function() {
            console.log($(this).css('left'))
            console.log($(this).css('top'))
            
        });
    };



    var init = function () {
        _setUpListners();

    };


    return {
        init: init
    };

})();

//Fadeloader (красивишная загрузка страницы)
$('body').fadeloader({
    mode: 'children',
    fadeSpeed : 1500,
    displayType : 'block',
    easeLoad : 'easeInOutBack',
    onComplete : ''
});