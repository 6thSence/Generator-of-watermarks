
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
                    content     : 'Зазрузите изоражение',
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
                var URL = data.result.files[0].url;
                $('.mainIMGHolder').append('<img src="'+ URL +'" class="mainMark">');
                    $( "#slider" ).slider({'value':100});

                $('.spiner').remove();
                $(".mainMark").hide().css({
                    'position': 'absolute',
                    'cursor':'move'
                }).on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    if(width > 648 || height > 648){
                        ZAMOS.init(width,height,URL);
                    if(width > height){
                        $(this).css('width', '100%').show('fast').draggable({containment:'parent'});
                    } else {
                         $(this).css('height', '100%').show('fast').draggable({containment:'parent'});
                         // ZAMOS.init(width,height,file.name);
                    }
                    } else {
                        $(this).show('fast').draggable({containment:'parent'});
                        ZAMOS.init(width,height,URL);                        
                    }
                    //___________I_____________//

                    Coordin.init();
                    //___________I____________//
                    
                });
            // });
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
                'margin':'auto',
                'cursor':'move'
            }).draggable();
            main2.init();
               
            console.log(file)
            $('.flagHolder').hide();
            $('.flagHolder:last-child').show('500');
            for(var i = 0;i<=integer;i++){
            $('.flagHolder').append('<img src="'+ file+'" class="flag">');
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
        $('#moveY').on('keydown', _setCoordinY);
        $('#moveX').on('keydown', _setCoordinX);
        $('.position__choose-increase').on('click', _increas);
        $('.position__choose-reduce').on('click', _reduce);


    };

    var _increas = function(){
        console.log('increas');
        var inp = $(this).closest('.input-group_count').find('input');
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.mainMark').css('left'),
                coordin_inc = parseInt(coordin) + 10,
                pos = coordin_inc +'px';
            $('.mainMark').css('left' , pos);
            inp.val(pos);
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.mainMark').css('top'),
                coordin_inc = parseInt(coordin) + 10,
                pos = coordin_inc +'px'
            $('.mainMark').css('top' , pos);
            inp.val(pos);
        }

    };
    var _reduce = function(){
        var inp = $(this).closest('.input-group_count').find('input');
        if (inp.attr('id') === 'moveX'){
            var coordin = $('.mainMark').css('left'),
                coordin_inc = parseInt(coordin) - 10,
                pos = coordin_inc +'px';
            $('.mainMark').css('left' , pos);
            inp.val(pos);
        }
        if (inp.attr('id') === 'moveY'){
            var coordin = $('.mainMark').css('top'),
                coordin_inc = parseInt(coordin) - 10,
                pos = coordin_inc +'px'
            $('.mainMark').css('top' , pos);
            inp.val(pos);
        }

    };

    var _setCoordinY = function () {

        var coordin = $(this).val(),
            position = coordin +'px';
        $('.mainMark').css('top' , position);
    };
    var _setCoordinX = function () {

        var coordin = $(this).val(),
            position = coordin +'px';
        $('.mainMark').css('left' , position);
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
    //if($('.mainMark').length){
    //    Coordin.init();
    //}
});

//_________________________________I_________________________//

var main2 = (function(){
        

        var _increas = function(){
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
    var _reduce = function(){
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
        $('.position__choose-increase').on('click', _increas);
        $('.position__choose-reduce').on('click', _reduce);
    };


    return {
        init: init
    };

})();
