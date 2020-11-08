(function($) {
    $(document).ready(function() {
        $("#age").slider({ 'tooltip': 'always' });
        $("#distance").slider({ 'tooltip': 'always' });
    });
    $(document).on('click', '#open-nav', function(e) {
        e.preventDefault();
        $('.sidenav').css('width', '320px')
    });
    $(document).on('click', '#close-nav', function() {
        $('.sidenav').css('width', '')
    });
})(window.jQuery);