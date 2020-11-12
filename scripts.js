(function($) {
    $(document).ready(function() {
        if ($("#age").length && $("#distance").length) {
            $("#age").slider({ 'tooltip': 'always' });
            $("#distance").slider({ 'tooltip': 'always' });
        }
        if ($('#datetimepicker').length) {
            $("#datetimepicker").datepicker();
        }
        if (true) {
            var places = [
                "ActionScript",
                "AppleScript",
                "Asp",
                "BASIC",
                "C",
                "C++",
                "Clojure",
                "COBOL",
                "ColdFusion",
                "Erlang",
                "Fortran",
                "Groovy",
                "Haskell",
                "Java",
                "JavaScript",
                "Lisp",
                "Perl",
                "PHP",
                "Python",
                "Ruby",
                "Scala",
                "Scheme"
            ];
            $("#places").autocomplete({
                source: places
            });
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