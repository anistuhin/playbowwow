(function($) {
    $(document).ready(function() {
        if($("#age").length && $("#distance").length){ 
            $("#age").slider({ 'tooltip': 'always' });
            $("#distance").slider({ 'tooltip': 'always' });
        }
        if($('#datetimepicker').length){
            $( "#datetimepicker" ).datepicker();
        }
    });
    $(document).on('click', '#open-nav', function(e) {
        e.preventDefault();
        $('.sidenav').css('width', '320px')
    });
    $(document).on('click', '#close-nav', function() {
        $('.sidenav').css('width', '')
    });
})(window.jQuery);