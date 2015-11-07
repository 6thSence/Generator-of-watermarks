
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
            textType = form.find("[data-validation='text']");

        textType.each(function(){
            var
                $this = $(this),
                emptyField = $this.val() == '';

            if (emptyField) {
                $this.tooltip({
                    content     : 'Загрузите изображение',
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
    	$( "#slider" ).slider({'value':100}).on( "slide", function( event, ui ) {
	  	var opacity = ui.value/100;
	  	$('.mainMark,.flagHolder').css('opacity', opacity);
	  	$('input[name="opacity"]').val(opacity*100)
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
            $('input[name="aim-img"]').val(file.name)
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
                            'overflow':'hidden',
                            'position':'absolute',
                            'top':'0',
                            'bottom':'0',
                            'left':'0',
                            'right':'0',
                            'margin':'auto'
                        });
                    } else {
                         var finalSize = (height/width);
                         _setUpListners2();
                         $('.mainIMGHolder').css({
                            'height': '533px',
                            'width': 533/finalSize+'px',
                            'background': 'url(../server/php/files/'+ file.name +')',
                            'background-size':'contain',
                            'overflow':'hidden',
                            'position':'absolute',
                            'top':'0',
                            'bottom':'0',
                            'left':'0',
                            'right':'0',
                            'margin':'auto'
                        });
                    }
                    } else {
                        _setUpListners2();
                       $('.mainIMGHolder').css({
                            'height': height,
                            'width': width,
                            'background': 'url(../server/php/files/'+ file.name +')',
                            'background-size':'contain',
                            'overflow':'hidden',
                            'position':'absolute',
                            'top':'0',
                            'bottom':'0',
                            'left':'0',
                            'right':'0',
                            'margin':'auto'
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
                $('input[name="watermark"]').val(file.name)
                $('.mainIMGHolder').append('<img src="server/php/files/'+ file.name +'" class="mainMark">');
                if($('.flagHolder')){
                    $('.flagHolder').remove();
                }
                $( "#slider" ).slider({'value':100})
                $(".mainMark").hide().css({
                    'position': 'absolute',
                    'cursor':'move'
                }).on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    if(width > 648 || height > 648){
                    if(width > height){
                        $(this).css('width', '100%').show('fast').draggable({containment:'parent'});
                        ZAMOS.init(width,height,file.name);
                    } else {
                         $(this).css('height', '100%').show('fast').draggable({containment:'parent'});
                         ZAMOS.init(width,height,file.name);
                    }
                    } else {
                        $(this).show('fast').draggable({containment:'parent'});
                        ZAMOS.init(width,height,file.name);                        
                    }
                    //___________I_____________//

                    Coordin.init();
                    //___________I____________//
                    
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
        var mainIMGHolderWidth = screen.width*2;
        var mainIMGHolderHeight = screen.height*2;
        var flagWidth = width;
        var flagHeight = height;
        var mainIMGHolderArea = mainIMGHolderWidth * mainIMGHolderHeight;
        var flagArea = flagWidth * flagHeight;
        var integer = (mainIMGHolderArea/flagArea);
        $('.btn__clear').on('click', function() {
            $( "#slider" ).slider({'value':100});
            $('.mainMark').hide().removeClass('mainMark').addClass('flag');
        console.log(mainIMGHolderArea);
        console.log(flagArea);
        console.log(mainIMGHolderArea/flagArea);
            $('.mainIMGHolder').append('<div class="flagHolder"></div>');
            $('.flagHolder').css({
                'position': 'absolute',
                'width': mainIMGHolderWidth+'px',
                'height': mainIMGHolderHeight+'px',
                'border':'1px solid green',
                'top': -1*screen.height+'px',
                'left':-1*screen.width+'px',
                'cursor':'move'
            }).draggable();
            main2.init();


            $('.flagHolder').hide();
            $('.flagHolder:last-child').show('500');
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

//_________________________________I_________________________//

var Coordin = (function () {

    var init = function(){
        _setupListener();
    };


    var _setupListener = function(){
        console.log('ilia');

        $(".mainMark").on('drag', _drag);
        $('#moveY').on('change', _setCoordinY);
        $('#moveX').on('change', _setCoordinX);
        $('.position__choose-increase').on('click', _increas);
        $('.position__choose-reduce').on('click', _reduce);
        $('.choose-position__item').on('click', _positionRadio);


    };

    var _positionRadio = function(){
      var item = $(this).attr('data-item'),
          img = $('.mainMark:last'),//  Моя правка
          layer=$('.mainIMGHolder'),
          img_width= parseInt(img.css('width')),
          layer_width=parseInt(layer.css('width')),
          img_height= parseInt(img.css('height')),
          layer_height=parseInt(layer.css('height')),
          center_width = (layer_width - img_width)/2,
          center_hight =(layer_height - img_height)/2,
          inp_x = $('#moveX'),
          inp_y = $('#moveY');


        console.log('click');
        console.log(item);
        switch (parseInt(item)){
            case 0:
                //img.css({'left': '0' , 'top': '0'});
                img.stop(true,true).animate(
                    {
                        'left': '0',
                        'top': '0'
                    },
                    1000
                );
                inp_x.val(0);
                inp_y.val(0);
                break;
            case 1:
                //img.css({'left': center_width, 'top': '0'});
                img.stop(true,true).animate(
                    {
                        'left': center_width,
                        'top': '0'
                    },
                    1000
                );
                inp_x.val(center_width);
                inp_y.val(0);
                break;
            case 2:
                //img.css({'left': layer_width-img_width , 'top': '0'});
                img.stop(true,true).animate(
                    {
                        'left': layer_width-img_width,
                        'top': '0'
                    },
                    1000
                );
                inp_x.val(layer_width-img_width);
                inp_y.val(0);
                break;
            case 3:
                //img.css({'left': '0' , 'top': center_hight});
                img.stop(true,true).animate(
                    {
                        'left': '0',
                        'top': center_hight
                    },
                    1000
                );
                inp_x.val(0);
                inp_y.val(center_hight);
                break;
            case 4:
                //img.css({'left': center_width , 'top': center_hight});
                img.stop(true,true).animate(
                    {
                    'left': center_width,
                    'top': center_hight
                    },
                    1000
                );
                inp_x.val(center_width);
                inp_y.val(center_hight);
                break;
            case 5:
                //img.css({'left': layer_width-img_width , 'top': center_hight});
                img.stop(true,true).animate(
                    {
                        'left': layer_width-img_width,
                        'top': center_hight
                    },
                    1000
                );
                inp_x.val(layer_width-img_width);
                inp_y.val(center_hight);
                break;
            case 6:
                //img.css({'left': '0' , 'top': layer_height-img_height});
                img.stop(true,true).animate(
                    {
                        'left': '0',
                        'top': layer_height-img_height
                    },
                    1000
                );
                inp_x.val(0);
                inp_y.val(layer_height-img_height);
                break;
            case 7:
                //img.css({'left': center_width , 'top': layer_height-img_height});
                img.stop(true,true).animate(
                    {
                        'left': center_width,
                        'top': layer_height-img_height
                    },
                    1000
                );
                inp_x.val(center_width);
                inp_y.val(layer_height-img_height);
                break;
            case 8:
                //img.css({'left': layer_width-img_width , 'top': layer_height-img_height});
                img.stop(true,true).animate(
                    {
                        'left': layer_width-img_width,
                        'top': layer_height-img_height
                    },
                    1000
                );
                inp_x.val(layer_width-img_width);
                inp_y.val(layer_height-img_height);
                break;
            default :
                console.log('hz')
        }

    };

    var _increas = function(){
        console.log('increas');
        var inp = $(this).closest('.input-group_count').find('input'),
            img=$('.mainMark'),
            layer=$('.mainIMGHolder'),
            img_width= parseInt(img.css('width')),
            layer_width=parseInt(layer.css('width')),
            img_height= parseInt(img.css('height')),
            layer_height=parseInt(layer.css('height'));
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.mainMark').css('left'),
                coordin_inc = parseInt(coordin) + 10,
                pos = coordin_inc +'px';

            if ((coordin_inc)<= (layer_width - img_width)) {
                $('.mainMark').css('left', pos);
                inp.val(coordin_inc);
            }
            if ((coordin_inc)>= (layer_width - img_width)) {
                $('.mainMark').css('left', layer_width - img_width);
                inp.val(layer_width - img_width);
            }
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.mainMark').css('top'),
                coordin_inc = parseInt(coordin) + 10,
                pos = coordin_inc +'px';
            if ((coordin_inc)<= (layer_height - img_height)) {
                 $('.mainMark').css('top' , pos);
                inp.val(coordin_inc);
            }
            if ((coordin_inc)>= (layer_height - img_height)) {
                $('.mainMark').css('top' , layer_height - img_height);
                inp.val(layer_height - img_height);
            }
        }

    };
    var _reduce = function(){
        console.log('reduce');
        var inp = $(this).closest('.input-group_count').find('input');
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.mainMark').css('left'),
                coordin_red = parseInt(coordin) - 10,
                pos = coordin_red +'px';
            if(coordin_red >= 0) {
                $('.mainMark').css('left', pos);
                inp.val(coordin_red);
            }
            if(coordin_red <=0){
                $('.mainMark').css('left', '0');
                inp.val('0');
            }
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.mainMark').css('top'),
                coordin_red = parseInt(coordin) - 10,
                pos = coordin_red +'px';
            if(coordin_red >= 0) {
                $('.mainMark').css('top', pos);
                inp.val(coordin_red);
            }
            if(coordin_red <=0){
                $('.mainMark').css('top', '0');
                inp.val('0');
            }
        }

    };

    var _setCoordinY = function () {

        var $this = $(this),
            coordin = $(this).val(),
            position = coordin +'px',
            img=$('.mainMark'),
            layer=$('.mainIMGHolder'),
            img_height= parseInt(img.css('height')),
            layer_height=parseInt(layer.css('height'));
        if(coordin <= (layer_height - img_height) || coordin >= 0){
            $('.mainMark').css('top' , position);
        }
        if(coordin >= (layer_height - img_height)){
            $('.mainMark').css('top' , layer_height - img_height);
            $this.val(layer_height - img_height);
        }
        if(coordin < 0){
            $('.mainMark').css('top' , '0');
            $this.val('0');
        }
    };
    var _setCoordinX = function () {

        var $this = $(this),
            coordin = $(this).val(),
            img=$('.mainMark'),
            layer=$('.mainIMGHolder'),
            position = coordin +'px',
            img_width= parseInt(img.css('width')),
            layer_width=parseInt(layer.css('width'));

        if(coordin <= (layer_width - img_width) || coordin >= 0){
            $('.mainMark').css('left' , position);
        }
        if(coordin >= (layer_width - img_width)){
            $('.mainMark').css('left' , layer_width - img_width);
            $this.val(layer_width - img_width);
        }
        if(coordin < 0){
            $('.mainMark').css('left' , '0');
            $this.val('0');
        }
    };

    var _drag = function() {
        //console.log('sssa');
        var moveX = $('#moveX'),
            moveY = $('#moveY');

        $(this).draggable({
            drag: function (event, ui) {
                moveX.val(ui.position.left);
                moveY.val(ui.position.top);
                //console.log(ui.position.left);
                //console.log(ui.position.top);
                //ui.position.top = y;
            }
        });
    };

    return{
        init : init
    }
})();



$(function(){
    //console.log('create-radio');
    var child  = $('.choose-position').children().each(function (key,val) {
        $(this).attr('data-item', key);
    });
    //console.log(child);
});

//_________________________________I_________________________//

var main2 = (function(){
        

        var _increas2 = function(){
            
        var inp = $(this).closest('.input-group_count').find('input');
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.flag').css('border-bottom-width'),
                coordin_inc = parseInt(coordin) + 1,
                pos = coordin_inc;
            $('.flag').css('border-bottom' , pos+'px solid transparent');
            inp.val(pos);
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.flag').css('border-left-width'),
                coordin_inc = parseInt(coordin) + 1,
                pos = coordin_inc;
            $('.flag').css('border-left' , pos+'px solid transparent');
            inp.val(pos);
        }

    };

    var _reduce2 = function(){
        var inp = $(this).closest('.input-group_count').find('input');
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.flag').css('border-bottom-width'),
                coordin_inc = parseInt(coordin) - 1;
                var pos = coordin_inc;
            $('.flag').css('border-bottom' , pos+'px solid transparent');
            if(pos <= 0){
                inp.val(0);
            } else {
            inp.val(pos);
                
            }
                    
                
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.flag').css('border-left-width'),
                coordin_inc = parseInt(coordin) - 1;
                var pos = coordin_inc;
            $('.flag').css('border-left' , pos+'px solid transparent');
             if(pos <= 0){
                inp.val(0);
            } else {
            inp.val(pos);
        }
                    
                
        }

    };


    
    var _setUpListners = function() {
        $('.flagHolder').on(' mouseup', function() {
            // console.log($(this).css('left'))
            // console.log($(this).css('top'))
            
        });
    };



    var init = function () {
        _setUpListners();
        $('.position__choose-increase').on('click', _increas2);
        $('.position__choose-reduce').on('click', _reduce2);
    };


    return {
        init: init
    };

})();
