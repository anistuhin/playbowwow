(function($) {
    $(document).ready(function() {

    });
    $(document).on('click', '#open-nav', function(e) {
        e.preventDefault();
        $('.sidenav').css('width', '320px')
    });
    $(document).on('click', '#close-nav', function() {
        $('.sidenav').css('width', '')
    });
})(window.jQuery);