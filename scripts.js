(function($) {
    $(document).ready(function() {
        if ($("#age").length && $("#distance").length) {
            $("#age").slider({ 'tooltip': 'always' });
            $("#distance").slider({ 'tooltip': 'always' });
        }
        if ($('#datetimepicker').length) {
            var dateToday = new Date();
            $("#datetimepicker").datepicker({
                minDate: dateToday
            });
        }
        if ($("#places").length) {
            var places = [
                "16th Street Dog Park",
                "Fred Anderson Dog Park",
                "Grant Park",
                "Humboldt Park",
                "Lake Shore East Dog Park",
                "Larrabee Dog Park",
                "Lincoln Park",
                "Logan Square Dog Park",
                "Millennium Park",
                "McKinley Dog Park",
                "Montrose Dog Park",
                "River Park",
                "University Village Dog Park",
                "Wicker Dog Park"
            ];
            $("#places").autocomplete({
                source: places
            });
        }
        if ($('[data-toggle="tooltip"]').length) {
            $('[data-toggle="tooltip"]').tooltip();
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

/*// MDB Lightbox Init
        $(function () {
        $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
        });  */