;var share = (function(){
    'use strict';

    var _options = {
        'url': 'http://www.filimonow.ru',
        'title': document.title,
        'description': $('meta[name="description"]').attr('content'),
        'image': 'http://www.filimonow.ru/img/site.jpg',
        'noparse': true,
        'display': 'page',
        'fb_id': '964296000282885'

    };

    var _encode = function () {
        for(var key in _options) {
            _options[key] = encodeURIComponent(_options[key]);
        }
    };

    var _setUpListeners = function () {
        $('#vk-share').on('click', _vkShare);
        $('#fb-share').on('click', _fbShare);
        $('#tw-share').on('click', _twShare);
    };

    var _vkShare = function (event) {
        event.preventDefault();

        var url = 'http://vk.com/share.php?';
        url += ('url=' + _options['url']);
        url += ('&title=' + _options['title']);
        url += ('&description=' + _options['description']);
        url += ('&image=' + _options['image']);
        url += ('&noparse=' + _options['noparse']);
        _openWindow(url);
    };

    var _fbShare = function (event) {
        event.preventDefault();

        var url = 'https://www.facebook.com/dialog/feed?';
        url += ('app_id=' + _options['fb_id']);
        url += ('&display=' + _options['display']);
        url += ('&link=' + _options['url']);
        url += ('&name=' + _options['title']);
        url += ('&description=' + _options['description']);
        url += ('&picture=' + _options['image']);
        url += ('&redirect_uri=' + _options['url']);
        _openWindow(url);
    };

    var _twShare = function (event) {
        event.preventDefault();

        var url = 'https://twitter.com/share?';
        url += ('url=' + _options['url']);
        url += ('&text=' + _options['description']);
        _openWindow(url);
    };

    var _openWindow = function (url) {
        window.open(url, '_blank');
    };

    return {
        init: function(options) {
            _options = options || _options;
            _setUpListeners();
            _encode();
        }
    }
})();

if ($('a[id^="share"]')) {
    share.init();
}


