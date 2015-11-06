var main = (function(){

    var init = function () {
        _setUpListners();

    };

    var _setUpListners = function() {

    };

    return {
        init: init
    };

})();

main.init();


var OpacitySlider = (function(){

    var _setUpListners = function() {
    	$( "#slider" ).slider({
        'value':100,
        range: "min"}).on( "slide", function( event, ui ) {
	  	var opacity = ui.value/100;
	  	$('.mainMark').css('opacity', opacity);
	  	//console.log($( "#slider" ).slider('value'));
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
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('.mainImg').text(file.name);
                $('#watermark').removeAttr('disabled');
                $('.aim-img').append('<img src="server/php/files/'+ file.name +'" class="mainIMG">').css('position', 'relative');
                
                $(".mainIMG").hide().on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    if(width > 648 || height > 648){
                    if(width > height){
                        $(this).css('width', '100%').show('fast');
                    } else {
                         $(this).css('height', '100%').show('fast');
                    }
                    } else {
                        $(this).show('fast');
                    }

                        
                });

                
            });
        }
    });
    };

     var _setUpListners2 = function() {
        $('#watermark').fileupload({
        dataType: 'json',
        done: function (e, data) {
            $.each(data.result.files, function (index, file) {
                $('.mainWatermark').text(file.name);
                $('.aim-img').append('<img src="server/php/files/'+ file.name +'" class="mainMark">');

                $(".mainMark").hide().on('load', function(event) {
                    var width = $(this).width();
                    var height = $(this).height();
                    if(width > 648 || height > 648){
                    if(width > height){
                        $(this).css('width', '100%').show('fast');
                    } else {
                         $(this).css('height', '100%').show('fast');
                    }
                    } else {
                        $(this).show('fast');
                    }

                        
                });
            });
        }
    });
    };
    


    var init = function () {
        _setUpListners();
        _setUpListners2();

    };


    return {
        init: init
    };

})();

FileUploadJQ.init();

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
