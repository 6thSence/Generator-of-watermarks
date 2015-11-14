# Documentation


# JS

## Main.js

``` js
// ������ ����� ������ ��� �������� �� ������
;var dataParams = (function(){

   var params = {
       originX        : 0,
       originY        : 0,
       transparency      : 1,
       isPattern      : false,
       x                 : 0,
       y                 : 0,
       originalImage  : "",
       watermarkImage : "",
       zzz            : 0,
       markMin        : 1
   };
   var _addmarkMin = function(x){
       params.markMin = x;
   };
   var _addZZZ = function(x){
       params.zzz = x;
   };
   var _addOriginX = function(){
       params.originX = parseInt($('#moveX').val())*params.zzz;
   };
   var _addOriginY  = function(){
       params.originY =  parseInt($('#moveY').val())*params.zzz;
   };
   var _addTransparency = function(x){
       params.transparency= x;                                            // ��� ������� ��� ���������� �������
   };
   var _addOriginalImage = function(x){
       params.originalImage= x;
   };
   var _addWatermarkImage = function(x){
       params.watermarkImage= x;
   };
   var _addIsPattern = function(x){
       var radios = $("input[type=radio]");
       for (var i= 0; i< radios.length; i++) {
           if (radios[i].checked && radios[i].name === "tiling") {
               params.isPattern=radios[i].value;
           }
       }
   };

   var _addX = function(x){
       params.x= x*params.zzz;
   };
   var _addY = function(x){
       params.y= x*params.zzz;
   };

   var _getData = function(){
       _addOriginX();
       _addOriginY();
       _addIsPattern();
       return params;
   }

   return {
       getData            : _getData,
       addOriginX          : _addOriginX,
       addOriginY          : _addOriginY,
       addTransparency     : _addTransparency,
       addOriginalImage    : _addOriginalImage,
       addWatermarkImage   : _addWatermarkImage,
       addIsPattern        : _addIsPattern,
       addX                : _addX,
       addY                : _addY,
       addZZZ              : _addZZZ,
       addmarkMin          :_addmarkMin
   }

})();

//������ �������� ������ �� ������ ��� ���������� �������� �����������
var submitForm = (function(){
   var init = function () {
       _setUpListners();
   };
   var _setUpListners = function() {
       $('#submit').on('click', function(e) {
           e.preventDefault();
           dataParams.addX(parseInt($('.flagHolder').css('left')));
           dataParams.addY(parseInt($('.flagHolder').css('top')));
           dataParams.addTransparency($( ".mainMark,.flagHolder" ).css('opacity'));
            var url ='server/php/download.php',
           defObj = _ajax(dataParams.getData(), url);
           if(defObj) {
               defObj.done(function(ans){
                   if (ans.status === 'OK') {
                       window.location= ("server/php/downloadImg.php?file=" + ans.link);
                   };
            })
           }
       });
   };
   var _ajax = function (data, url) {
       return  $.ajax({
           url: url,
           type: 'POST',
           dataType: 'JSON',
           data: data
       });
   };
   return {
       init: init
   }
})();
if ($('#submit')) { submitForm.init(); };


//������ ������ ��������, ����������� �� ������������ �������� �����
var OpacitySlider = (function(){
   var _setUpListners = function() {
       $( "#slider" ).slider({disabled: true,'value':100, 'range': 'min'}).on( "slide", function( event, ui ) {
           var opacity = ui.value/100;
           $('.mainMark,.flagHolder').css('opacity', opacity);
       });
   };
   var init = function () {
       _setUpListners();
   };
   return {
       init: init
   };
})();
if ($('#slider')) { OpacitySlider.init(); };

//�������� ����������� � ������
var FileUploadJQ = (function(){
   // �������� � ��������� ��������� �����������
   var _setUpListners = function() {
       $('#fileuploadImage').fileupload({
           dataType    : 'json',
           progressall : function (e, data) {
                           var progress = '<div id="progress"></div>';
                           $('.main-bl').css('position', 'relative').prepend(progress)
                           var progress = parseInt(data.loaded / data.total * 100, 10);
                           $('#progress').css({
                               'height': '17px',
                               'background-image':'url(img/progressbar.gif)',
                               'position':'absolute',
                               'top':'75px',
                               'left':'26px',
                               'max-width':'648px',
                               'border-radius': '7px'
                           }).css('width', progress + '%');
                       },
           add         :   function (e,data) {
                               data.submit();
                           },
           done        : function (e, data) {
               var nameFile = data.result.files[0].name,
               urlFile = data.result.files[0].url;
               dataParams.addOriginalImage(urlFile);
               $('#fileuploadImage').attr('disabled', 'disabled');
               $('input[name="aim-img"]').val(nameFile)
               $('.mainImg').text(nameFile);
               $('#watermark').removeAttr('disabled');
               $('body').append('<img src="'+ urlFile +'" class="mainIMG">');
               $(".mainIMG").hide().on('load', function(event) {
                   var width = $(this).width();
                   var height = $(this).height();
                   $('.aim-img').append('<div class="mainIMGHolder"></div>').css('position', 'relative');
                   if(width > 648 || height > 533){
                       if(width > height){
                           var finalSize = (width/height);
                           $('.mainIMGHolder').css({
                               'width': '648px',
                               'height': 648/finalSize+'px',
                               'background': 'url('+ urlFile +')',
                               'background-size':'contain',
                               'overflow':'hidden',
                               'position':'absolute',
                               'top':'0',
                               'bottom':'0',
                               'left':'0',
                               'right':'0',
                               'margin':'auto'
                           });
                           var zzz = width/parseInt($('.mainIMGHolder').css('width'));
                           dataParams.addZZZ(zzz);
                           } else {
                               var finalSize = (height/width);
                               $('.mainIMGHolder').css({
                                   'height': '533px',
                                   'width': 533/finalSize+'px',
                                   'background': 'url('+ urlFile +')',
                                   'background-size':'contain',
                                   'overflow':'hidden',
                                   'position':'absolute',
                                   'top':'0',
                                   'bottom':'0',
                                   'left':'0',
                                   'right':'0',
                                   'margin':'auto'
                                   });
                                   var zzz = width/parseInt($('.mainIMGHolder').css('width'));
                                   dataParams.addZZZ(zzz);
                                   _setUpListners2(zzz,width);
                               };
                   } else {
                       dataParams.addZZZ(1);
                       _setUpListners2(1,width);
                       $('.mainIMGHolder').css({
                           'height': height,
                           'width': width,
                           'background': 'url('+ urlFile +')',
                           'background-size':'contain',
                           'overflow':'hidden',
                           'position':'absolute',
                           'top':'0',
                           'bottom':'0',
                           'left':'0',
                           'right':'0',
                           'margin':'auto'
                       });
                   };
               });
           }
       });
   };
   // �������� � ��������� �������� �����
   var _setUpListners2 = function(zzz, mainWidth) {
       $('#watermark').fileupload({
           dataType    :   'json',
           progressall :   function (e, data) {
               var progress = '<div id="progress"></div>';
               $('.main-bl').css('position', 'relative').prepend(progress)
               var progress = parseInt(data.loaded / data.total * 100, 10);
               $('#progress').css({
                   'height': '17px',
                   'background-image':'url(img/progressbar.gif)',
                   'position':'absolute',
                   'top':'75px',
                   'left':'26px',
                   'max-width':'648px',
                   'border-radius': '7px'
               }).css('width', progress + '%');
           },
           add     :   function (e,data) {
           data.submit();
            },
           done    : function (e, data) {
                   $('#progress').remove();
                   var nameFile = data.result.files[0].name,
                   urlFile = data.result.files[0].url;
                   dataParams.addWatermarkImage(urlFile);
                   $('#submit').removeAttr('disabled');
                   $('#reset').removeAttr('disabled');
                   $('#false').removeAttr('disabled');
                   $('#true').removeAttr('disabled');
                   $('.choose-position__item-lock').removeClass('choose-position__item-lock').attr('class', 'choose-position__item');
                   $('#progress').remove();
                   $('.mainWatermark').text(nameFile);
                   $('input[name="watermark"]').val(nameFile);
                   $('#moveX').val(0);
                   $('#moveY').val(0);
                   var buff = 0;
                   var buffModul = 0;
                   if( ($('.mainMark').length) || ($('.flag').length)){
                      buffModul = 1;
                       $('.flagHolder, #vertical, #horizontal').remove();
                       $('.mainMark').remove();
                       $('.flag').remove();
                   };
                   if(!($('.mainMark').length)){
                       buff = 1;
                   };
                   $('.mainIMGHolder').append('<img src="'+ urlFile +'" class="mainMark">');
                   $('.mainMark').css({left : '0', top : '0'});
                   Coordin.drag($('.mainMark'));
                   $('#moveX').val('0');
                   $('#moveY').val('0');
                   $( "#slider" ).slider({'value':100})
                   $(".mainMark").hide().css({
                       'position': 'absolute',
                       'cursor':'move'
                   }).on('load', function(event) {
                       var width = $(this).width();
                       var height = $(this).height();
                       var realWidth = width/zzz+'px';
                       var realHeight = height/zzz+'px';
                       if(mainWidth < width){
                        dataParams.addmarkMin(parseInt(width)/parseInt(mainWidth));
                       } else {
                        dataParams.addmarkMin(1);
                       }
                       if(width > 648 || height > 648){
                           if(width > height){
                               $(this).css('width', '100%').show('fast').draggable({containment:'parent'});
                           }
                       } else {
                           if(parseInt(mainWidth) < width){
                               $(this).show('fast').attr('width','100%').draggable({containment:false});
                       } else {
                           $(this).show('fast').attr('width', realWidth).draggable({containment:'parent'});
                       }
                       }
                       $('#false').prop('checked', 'checked');
                       toggelModule.first();
                       if (buffModul === 0){
                            toggelModule.init();
                       }
                       $('#moveX').removeAttr('disabled');
                       $('#moveY').removeAttr('disabled');
                       $( "#slider" ).slider({disabled:false});
                       $('#moveX,#moveY').removeAttr('disabled').spinner({disabled: false});
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
if ($('#fileuploadImage')) { FileUploadJQ.init(); };

//������ ��������� �������� �����
var ZAMOS = (function(){
   var init = function (file, flagAreaOut) {
       var mainIMGHolderWidth = screen.width;
       var mainIMGHolderHeight = screen.height;
       var mainIMGHolderArea = mainIMGHolderWidth * mainIMGHolderHeight;
       var flagArea = flagAreaOut;
       var integer = (mainIMGHolderArea/flagArea);
       var kooficientSjatia = $('.mainMark').width();
       $('#moveX').val(0);
       $('#moveY').val(0);
       $( "#slider" ).slider({'value':100});
       $('.mainMark').remove();
       $('.mainIMGHolder').append('<div class="flagHolder"></div>');
       $('.flagHolder').css({
           'position': 'absolute',
           'width': mainIMGHolderWidth+'px',
           'height': mainIMGHolderHeight+'px',             
           'top': -1*mainIMGHolderHeight/3+'px',
           'left':-1*mainIMGHolderWidth/3+'px',
           'cursor':'move',
           'font-size':'0'
        }).draggable({containment: [0,0,$('.mainIMGHolder').offset().left,$('.mainIMGHolder').offset().top]});
       for(var i = 0;i<=integer;i++){
           $('.flagHolder').append('<img  class="flag">');
       }
       $('.flag').attr({
           'src': file,
           'width': kooficientSjatia
       });
       $('#moveX').on('keyup', function(event) {
           if (parseInt($(this).val()) > 100){
               var coordin = 100;
           }else if(parseInt($(this).val())){
               var coordin = parseInt($(this).val())
           } else {
               coordin = 0;
           }
            $('.flag').css('border-bottom', coordin+'px solid transparent');
            $(this).val(coordin);
            if (coordin===0){
               $('#vertical').css({
                       'margin-top': (-1*coordin)/2+'px',
                       'height':'1px'
                   });
            } else if (coordin>100) {
               $('#vertical').css({
                       'margin-top': (-1*100)/2+'px',
                       'height':'100px'
                   });
              $('#moveX').val(100)
            } else {
             $('#vertical').css({
                       'margin-top': (-1*coordin)/2+'px',
                       'height': coordin+'px'
                   });
            }
       });
       $('#moveY').on('keyup', function(event) {
           if (parseInt($(this).val()) > 100){
               var coordin = 100;
           }else if(parseInt($(this).val())){
               var coordin = parseInt($(this).val())
           } else {
               coordin = 0;
           }
            $('.flag').css('border-right', coordin+'px solid transparent');
            $(this).val(coordin);
            if(coordin===0){
                $('#horizontal').css({
                       'margin-left': (-1*coordin)/2+'px',
                       'width': '1px'
                   });
            } else {
             $('#horizontal').css({
                       'margin-left': (-1*coordin)/2+'px',
                       'width': coordin+'px'
                   });
            }
       });
   };
   return {
       init: init
   };
})();

//���������������� �����
var Coordin = (function () {
   var init = function(){
       _setupListener();
   };
   var _setupListener = function(){
       $('#moveY').on('keyup', _setCoordinY);
       $('#moveX').on('keyup', _setCoordinX);
       $('.choose-position__item').on('click', _positionRadio);
   };
   var _positionRadio = function(){
     var item = $(this).attr('data-item'),
         img = $('.mainMark'),
         layer=$('.mainIMGHolder'),
         img_width= parseInt(img.css('width')),
         layer_width=parseInt(layer.css('width')),
         img_height= parseInt(img.css('height')),
         layer_height=parseInt(layer.css('height')),
         center_width = (layer_width - img_width)/2,
         center_hight =(layer_height - img_height)/2,
         inp_x = $('#moveX'),
         inp_y = $('#moveY');
     switch (parseInt(item)){
       case 0:
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
       }

       };
     var _setCoordinY = function () {
       var $this = $(this);
       if (parseInt($(this).val())){
           var coordin = parseInt($(this).val());
       }else{
           coordin = 0;
       }
       var coordin = parseInt($(this).val())
       var position = coordin +'px',
           img=$('.mainMark'),
           layer=$('.mainIMGHolder'),
           img_height= parseInt(img.css('height')),
           layer_height=parseInt(layer.css('height'));
       $this.val(coordin);
       if(coordin <= (layer_height - img_height) || coordin >= 0){
           $('.mainMark').css('top' , position);
       }
       if(coordin >= (layer_height - img_height)){
           $('.mainMark').css('top' , layer_height - img_height);
           $this.val(layer_height - img_height);
       }
       if(coordin <= 0){
           $('.mainMark').css('top' , '0');
           $this.val('0');
       }
   };
   var _setCoordinX = function () {
       var $this = $(this);
       if (parseInt($(this).val())){
           var coordin = parseInt($(this).val());
       }else{
           coordin = 0;
       }
       var img=$('.mainMark'),
           layer=$('.mainIMGHolder'),
           position = coordin +'px',
           img_width= parseInt(img.css('width')),
           layer_width=parseInt(layer.css('width'));
       $this.val(coordin);
       if(coordin <= (layer_width - img_width) || coordin >= 0){
           $('.mainMark').css('left' , position);
       }
       if(coordin >= (layer_width - img_width)){
           $('.mainMark').css('left' , layer_width - img_width);
           $this.val(layer_width - img_width);
       }
       if(coordin <= 0){
           $('.mainMark').css('left' , '0');
           $this.val('0');
       }
   };
   //������������ ������� �����
   var drag = function(){
       $('.mainMark').on('drag', _drag);
   };
   var _drag = function() {
       var moveX = $('#moveX'),
       moveY = $('#moveY');
       $(this).draggable({
           drag: function (event, ui) {
               moveX.val(ui.position.left);
               moveY.val(ui.position.top);       
           }
       });
   };
   //���������� ������, ������� ������������
   var destroy = function(){
       $('#moveY').off();
       $('#moveX').off();
       $('.position__choose-increase').off();
       $('.position__choose-reduce').off();
       $('.choose-position__item').off();
   };
   //���������� ������������
   var positionOff = function(){
       $('.choose-position__item').unbind('mouseenter mouseleave');
       $('.choose-position__item').css('cursor', 'default');
       $('.choose-position__item').on('mouseenter mouseleave', function(){
           $(this).css({border: '1px solid #c1cfd9' , 'background-color' : '#dbe1e8'});
       });
   };
   //�������� ������������
   var positionOn = function(){
       $('.choose-position__item').unbind('mouseenter mouseleave');
       $('.choose-position__item').css('cursor', 'pointer');
       $('.choose-position__item').on('mouseenter', function(){
           $(this).css({border: '1px solid #c1cfd9' , 'background-color' : '#f97e76'});
       });
       $('.choose-position__item').on('mouseleave', function(){
           $(this).css({border: '1px solid #c1cfd9' , 'background-color' : '#dbe1e8'});
       });
   };
   return{
       init : init,
       drag: drag,
       destroy : destroy,
       positionOn : positionOn,
       positionOff : positionOff
   }
})();

//���������� data ��������� ��������� ����������������
if ($('.choose-position')) {
   $(function () {
       var child = $('.choose-position').children().each(function (key, val) {
           $(this).attr('data-item', key);
       });
   });
};

// ������ ������ � ������������
var main2 = (function(){
   //��������� ���������
   var _increas2 = function(){
       var inp = $(this).closest('.input-group_count').find('input');
       if (inp.attr('id') === 'moveX'){
           var coordin = $('.flag').css('border-bottom-width');
           var coordin_inc = parseInt(coordin) + 1,
           pos = coordin_inc;
           $('.flag').css('border-bottom' , pos+'px solid transparent');
           inp.val(pos);
           $('#vertical').css({
               'margin-top': (-1*pos)/2+'px',
               'height': pos+'px'
           });
       }
       if (inp.attr('id') === 'moveY'){
           var coordin = $('.flag').css('border-right-width'),
           coordin_inc = parseInt(coordin) + 1,
           pos = coordin_inc;
           $('.flag').css('border-right' , pos+'px solid transparent');
           inp.val(pos);
           $('#horizontal').css({
               'margin-left': (-1*pos)/2+'px',
               'width': pos+'px'
           });
       }

   };
   //���������� ����������
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
           $('#vertical').css({
               'margin-top': (-1*pos)/2+'px',
               'height': pos+'px'
           });
       }
       if (inp.attr('id') === 'moveY'){
           var coordin = $('.flag').css('border-right-width'),
           coordin_inc = parseInt(coordin) - 1;
           var pos = coordin_inc;
           $('.flag').css('border-right' , pos+'px solid transparent');
           if(pos <= 0){
               inp.val(0);
           } else {
               inp.val(pos);
           }
           $('#horizontal').css({
               'margin-left': (-1*pos)/2+'px',
               'width': pos+'px'
           });
       }
   };
   //��������� ������
   var _redCross = function() {
           $('.choose-position').css('position', 'relative').css('overflow', 'hidden').append('<div id="vertical"></div> <div id="horizontal"></div>');
           $('#vertical').css({
               'position': 'absolute',
               'top':'50%',
               'left': '1px',
               'width':'100px',
               'height':'1px',
               'background-color':'#e3736c'
           });
           $('#horizontal').css({
               'position': 'absolute',
               'top':'0',
               'left': '50%',
               'height':'100%',
               'width':'1px',
               'background-color':'#e3736c'
           });
       };
   var redCrossDestroy =function(){
     $('#vartical').remove();
     $('#horizontal').remove();
   };
   var init = function () {
    _redCross();
   $('.position__choose-increase').on('click', _increas2);
   $('.position__choose-reduce').on('click', _reduce2);
   };
   var destroy = function(){
       $('.radio__tiling_true').off();
       $('.position__choose-increase').off();
       $('.position__choose-reduce').off();
   };
   return {
       init: init,
       destroy: destroy,
       redCrossDestroy : redCrossDestroy
   };
})();

//������ ������������ ����� ��������
var toggelModule = (function(){
   var init = function(){
       _setupListener();
   };
   //������������� ������ �� �������
   var first = function () {
       Coordin.destroy();
       main2.destroy;
       Coordin.init();
       Coordin.positionOn();
       $('.count-position__item_yyy').removeClass('count-position__item_yyy').addClass('count-position__item_y');
       $('.count-position__item_xxx').removeClass('count-position__item_xxx').addClass('count-position__item_x');
   };
   var _setupListener = function(){
       $('input[name=tiling]:radio').on('change', _initSomth);
   };
   //������������� ������� (���������/��������� ������� ����)
   var _initSomth = function(){
       if ($('#true').prop('checked')){
           _initZamos();
       }
       if ($('#false').prop('checked')){
           _initSingle();
       }

   };
   //������������� �������� ������
   var _initSingle = function(){
       main2.destroy();
       var urlFile =($('.flag').attr('src')),
           width = $('.flag').width(),
           height = $('.flag').height();
       $('.flagHolder, #vertical, #horizontal, .flag').remove();
       $('.mainIMGHolder').append('<img src="'+ urlFile +'" class="mainMark">');
       $('.mainMark').css({left : '0', top : '0', cursor :'move','width':width,'height':height}).draggable({containment:'parent'});
       $('#moveX').val(0);
       $('#moveY').val(0);
       $('.count-position__item_yyy').removeClass('count-position__item_yyy').addClass('count-position__item_y');
       $('.count-position__item_xxx').removeClass('count-position__item_xxx').addClass('count-position__item_x');
       Coordin.init();
       Coordin.drag();
       Coordin.positionOn();
       $( "#slider" ).slider({'value':100});   };
   //�������������  ������ ���������
   var _initZamos = function () {
       Coordin.destroy();
       Coordin.positionOff();
       $('.count-position__item_y').removeClass('count-position__item_y').addClass('count-position__item_yyy');
       $('.count-position__item_x').removeClass('count-position__item_x').addClass('count-position__item_xxx');
       var width = $('.mainMark').width();
       var height = $('.mainMark').height();
       var area = width*height;
       var urlFile = $('.mainMark').attr('src');
       ZAMOS.init(urlFile, area);
       main2.init();
   };
   return{
       init : init,
       first : first
   };
})();
//Fadeloader
$('body').fadeloader({
   mode: 'children',
   fadeSpeed : 1500,
   displayType : 'block',
   easeLoad : 'easeInOutBack',
   onComplete : ''
});

//����� �����
var ReSeT = (function(){
   var _setUpListners = function() {
       $('.btn__clear').on('click', function(event) {
           event.preventDefault();
           if($('.mainIMGHolder').length){$('.mainIMGHolder').remove();}
           if($('.flagHolder').length){$('.flagHolder').remove();}
           if($('#horizontal').length){$('#horizontal').remove();}
           if($('#vertical').length){$('#vertical').remove();}
           $('#fileuploadImage').removeAttr('disabled');
           $('#watermark').attr('disabled', 'disabled');
           $('#moveX').val(0);
           $('#moveY').val(0);
           $('input[name="opacity"]').val(0);
           $( "#slider" ).slider({'value':100});
           $('.mainImg').text('Image.jpg');
           $('.mainWatermark').text('Image.jpg');
           $('.count-position__item_yyy').removeClass('count-position__item_yyy').addClass('count-position__item_y');
           $('.count-position__item_xxx').removeClass('count-position__item_xxx').addClass('count-position__item_x');  // ����� ���� ����������
           $('#true').prop('checked', 'none');
           $('#false').prop('checked', 'checked');// =======
           $('.aim-img').append('<img src="" class="mainMark">');
           $('#submit').attr('disabled', 'disabled');
           $('#reset').attr('disabled', 'disabled');
           $('#false').attr('disabled', 'disabled');
           $('#true').attr('disabled', 'disabled');
           $('#moveX').attr('disabled', 'disabled');
           $('#moveY').attr('disabled', 'disabled');
           $( "#slider" ).slider({disabled:true});
           $('#moveX,#moveY').spinner({disabled: true});
           main2.redCrossDestroy();
           Coordin.positionOff();
           $('.position__choose').off();
           $('.choose-position__item').off();
           dataParams.addWatermarkImage('');
           dataParams.addOriginalImage('');
           dataParams.addTransparency(1);
           dataParams.addX('');
           dataParams.addY('');
       });
   };
   var init = function () {
       _setUpListners();
   };
   return {
       init: init
   };
})();
if($('#reset')) { ReSeT.init(); };

//�������� ���������� �����
var ShareShow = (function(){
   var init = function () {
       _setUpListners();
   };
   var _setUpListners = function() {
       $('.share__btn_like').on('mouseenter', function(){
           $(this).stop(true,true);
           $('.share').addClass('open').animate({left: '0px' });   // ���������� ������
       });
       $('.share').on('mouseleave', function(){
           $(this).stop(true,true);
           $(this).removeClass('open').animate({left: '-43px' });
       });
   };
   return {
       init: init
   };
})();
if($('#share')) { ShareShow.init();};

//������� ��� �������
var Spiners = (function(){
   var _setUpListners = function() {
       $('#moveX,#moveY').attr('disabled', 'disabled').spinner({
           disabled: true,
           icons: { down: "custom-down-icon", up: "custom-up-icon" },
           min:0,
           spin: function( event, ui ) {
               if(event.target.id === 'moveX'){
                   if($('.mainMark')){
                        $('.mainMark').css('left',ui.value+'px');
                        $('#moveX').val(ui.value).spinner( "option", "max", $('.mainIMGHolder').width()-$('.mainMark').width());
                    }
                   if($('.flag').length){
                       $('#moveX').spinner( "option", "max", 100);
                       $('.flag').css('border-bottom', ui.value+'px solid transparent');
                       $('#vertical').css({
                           'margin-top': (-1*ui.value)/2+'px',
                           'height': ui.value+'px'
                       });
                       if(ui.value === 0){
                           $('#vertical').css('height', '1px');
                       }
                   }
               }
               if(event.target.id === 'moveY'){
                   if($('.mainMark')){
                        $('.mainMark').css('top', ui.value);
                        $('#moveY').val(ui.value).spinner( "option", "max", $('.mainIMGHolder').height()-$('.mainMark').height());
                    }
                   if($('.flag').length){
                       $('#moveY').spinner( "option", "max", 100);
                       $('.flag').css('border-right', ui.value+'px solid transparent');
                       $('#horizontal').css({
                           'margin-left': (-1*ui.value)/2+'px',
                           'width': ui.value+'px'
                       });
                       if(ui.value === 0){
                           $('#horizontal').css('width', '0.5px');
                       }
                   }
               }
           },
       });
   };
   //�������� ������� �� �����
   var _onlyNumber = function () {
       $('#moveX,#moveY').on('keyup', function() {
            var $this = $(this);
            if(parseInt($this.val())){
               var number = parseInt($this.val())
            } else {
               var number = 0;
            }
       $this.val(number)
       });
   }
   var init = function () {
       _setUpListners();
       _onlyNumber();
   };
   return {
       init: init
   };
})();
if ($('#moveX') && $('#moveY')) { Spiners.init(); };


```


# PHP

## Download.php

``` php

session_start();
include_once 'config.php';
include_once 'functions.php';

if(isPost()) {
   // Get post parameters
   $originX = post('originX');
   $originY = post('originY');
   $transparency = post('transparency');
   $watermarkResize = post('markMin');
   $originalImagePath = post('originalImage');
   $watermarkImagePath = post('watermarkImage');

   // Open images
   $original = new Imagick($originalImagePath);
   $watermark = new Imagick($watermarkImagePath);

   // Set opacity for images with alpha channel and without
   if($watermark->getImageAlphaChannel()) {
       $watermark->evaluateImage(Imagick::EVALUATE_DIVIDE, 1.0 / $transparency, Imagick::CHANNEL_ALPHA);
   }
   else {
       $watermark->setImageOpacity($transparency);
   }

   // Resize image
   if($watermarkResize > 1) {
       $watermark->resizeImage($watermark->getImageWidth() / $watermarkResize,
                               $watermark->getImageHeight() / $watermarkResize,
                               Imagick::FILTER_LANCZOS, 1);
   }

   // Watermark block
   $isPattern = post('isPattern');
   if(bool($isPattern)) {
       // Get watermark`s offset from original image
       $initialX = (int)str_replace('px', '', post('x'));
       $initialY = (int)str_replace('px', '', post('y'));

       // Get watermark sizes
       $watermarkWidth = $watermark->getImageWidth();
       $watermarkHeight = $watermark->getImageHeight();

       // Get original image sizes
       $imageWidth = $original->getImageWidth();
       $imageHeight = $original->getImageHeight();

       // Merge watermark in tiling mode
       for($x = $initialX; ; $x += ($watermarkWidth + (int)$originY)) {
           for($y = $initialY; ; $y += ($watermarkHeight + (int)$originX)) {
               $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $x, $y);
               if ($y > $imageHeight) break;
           }
           if ($x > $imageWidth) break;
       }
   }
   else {
       // Merge watermark in normal mode
       $original->compositeImage($watermark, Imagick::COMPOSITE_DEFAULT, $originX, $originY);
   }
   // Make flat image
   $original->flattenImages();

   // Make filename and filedir
   $file_name = make_filename($originalImagePath, 'png');
   $file_dir = get_download_filedir($file_name);
   // Save image
   $original->setImageFormat('png');
   $original->writeImage($file_dir);
   // Send image name to user
   send_filename($file_name);
}

```

## DounloadImg.php

``` php

session_start();
include_once 'functions.php';

// Get image link and initiate download
$file_name = get('file');
send_file($file_name);

```

## Lang.php

``` php

// Language array
$lang = array(
   'ru' => array(
       'title' => '��������� ������� ������',
       'settings' => '���������',
       'image' => '�������� �����������',
       'watermark' => '������� ����',
       'position' => '���������',
       'transparency' => '������������',
       'reset' => '�����',
       'download' => '�������',
       'copyright' => '��� ��� ����, ����������, �� ��������� � �� ������� ���.'
   ),
   'en' => array(
       'title' => 'Watermarks generator',
       'settings' => 'Settings',
       'image' => 'Original image',
       'watermark' => 'Watermark',
       'position' => 'Position',
       'transparency' => 'Opacity',
       'reset' => 'Reset',
       'download' => 'Download',
       'copyright' => 'It`s my site, please, don`t copy or steal it.'
   )
);

```

## Functions.php 

```php

include_once 'config.php';

// Get session variable
function get_session($field_name) {
   return $_SESSION[$field_name];
}

// Set session variable
function set_session($filed_name, $value) {
   $_SESSION[$filed_name] = $value;
}

// Get post parameter
function post($field_name) {
   $data = $_POST[$field_name];

   if(!isset($data)) {
       echo json_encode(array(
           'status' => 'Error',
           'text' => 'Set '.$field_name
       ));
       exit;
   }

   return $_POST[$field_name];
}

// Get get parameter
function get($field_name) {
   return $_GET[$field_name];
}

// Check request method
function isPost() {
   return $_SERVER['REQUEST_METHOD'] == 'POST';
}


// Make filename
function make_filename($name, $ext) {
   return sha1($name).'.'.$ext;
}

// Get file path for download it
function get_download_filedir($name) {
   global $download_dir;
   return ''.$download_dir.$name;
}

// Get file path for upload it
function get_upload_filedir($name) {
   global $upload_dir;
   return ''.$upload_dir.$name;
}

// Send file name
function send_filename($file_name) {
   echo json_encode(array(
       'status' => 'OK',
       'link' => $file_name
   ));
   exit;
}

// Initiate file download
function send_file($file_name) {
   $file_dir = get_download_filedir($file_name);
   header('Content-Description: File Transfer');
   header('Content-Type: application/octet-stream');
   header('Content-Disposition: attachment; filename='.$file_name);
   header('Expires: 0');
   header('Cache-Control: must-revalidate');
   header('Pragma: public');
   header('Content-Length: '.filesize($file_dir));
   readfile($file_dir);
   exit;
}

// Convert value to bool
function bool($value) {
   return $value === "true";
}


```
