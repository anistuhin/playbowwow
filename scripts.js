(function($) {
    $(document).ready(function() {
        if ($("#age").length) {
            $("#age").slider({
                tooltip: 'always'
            });
        }
        if ($("#distance").length) {
            $("#distance").slider({
                tooltip: 'always'
            });
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

        if ($('.filters-page').length && sessionStorage.getItem("searchedData") !== null) {
            var data = JSON.parse(sessionStorage.getItem("searchedData"));
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    switch (key) {
                        case 'male':
                            $('#' + key).prop('checked', data[key]);
                            break;
                        case 'female':
                            $('#' + key).prop('checked', data[key]);
                            break;
                        case 'age':
                            $('#' + key).slider('setValue', data[key]);
                            break;
                        case 'distance':
                            $('#' + key).slider('setValue', data[key]);
                            break;
                        case 'breed':
                            $('#' + key).val(data[key]);
                            break;
                        case 'size':
                            $('#' + key).val(data[key]);
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        if (sessionStorage.getItem("currentNotifications") == null) {
            sessionStorage.setItem("currentNotifications", 3);
            $('.notifications').attr('data-id', 3);
        } else if ($('.notifications').length) {
            $('.notifications').attr('data-id', sessionStorage.getItem("currentNotifications"));
        }

        if (sessionStorage.getItem('card1') == null) {
            $('[data-card-id="1"]').attr('data-interacted', 'no');
            $('[data-card-id="1"]').attr('data-status', 'na');
        } else {
            $('[data-card-id="1"]').attr('data-interacted', 'yes');
            $('[data-card-id="1"]').attr('data-status', sessionStorage.getItem('card1'));
        }

        if (sessionStorage.getItem('card2') == null) {
            $('[data-card-id="2"]').attr('data-interacted', 'no');
        } else {
            $('[data-card-id="2"]').attr('data-interacted', 'yes');
        }

        if (sessionStorage.getItem('card3') == null) {
            $('[data-card-id="3"]').attr('data-interacted', 'no');
            $('[data-card-id="3"]').attr('data-status', 'na');
        } else {
            $('[data-card-id="3"]').attr('data-interacted', 'yes');
            $('[data-card-id="3"]').attr('data-status', sessionStorage.getItem('card3'));
        }

        $(document).on('click', '.btn-accept', function() {
            $(this).closest('.card').attr('data-status', 'accepted');
            $(this).closest('.card').attr('data-interacted', 'yes');
            sessionStorage.setItem('card' + $(this).closest('.card').attr('data-card-id'), 'accepted');
        });

        $(document).on('click', '.btn-reject', function() {
            $(this).closest('.card').attr('data-status', 'rejected');
            $(this).closest('.card').attr('data-interacted', 'yes');
            sessionStorage.setItem('card' + $(this).closest('.card').attr('data-card-id'), 'rejected');
        });

        $(document).on('click', '.btn-chat', function() {
            $(this).closest('.card').attr('data-interacted', 'yes');
            sessionStorage.setItem('card' + $(this).closest('.card').attr('data-card-id'), 'yes');
        });

        $(document).on('click', '.undo-status', function() {
            $(this).closest('.card').attr('data-status', 'na');
            sessionStorage.setItem('card' + $(this).closest('.card').attr('data-card-id'), 'na');
        });

        $(document).on('click', '[data-interacted="no"] .btn-accept, [data-interacted="no"] .btn-reject, [data-interacted="no"] .btn-chat', function() {
            if (Number(sessionStorage.getItem("currentNotifications")) > 0) {
                sessionStorage.setItem("currentNotifications", Number(sessionStorage.getItem("currentNotifications")) - 1);
            }
            $('.notifications').attr('data-id', sessionStorage.getItem("currentNotifications"));
        });

        $(document).on('click', '#cancel-schedule', function() {
            $('.undo-playdate-alert').remove();
            $('main').after('<div class="undo-playdate-alert alert alert-primary alert-dismissible fade show mb-0" role="alert">The request has been unsent successfully.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
        });

        $(document).on('click', '#search-btn', function() {
            var data = {
                male: $('#male').prop('checked'),
                female: $('#female').prop('checked'),
                age: $("#age").slider('getValue'),
                distance: $("#distance").slider('getValue'),
                breed: $("#breed").val(),
                size: $("#size").val()
            };
            sessionStorage.setItem("searchedData", JSON.stringify(data));
        });
        $(document).on('click', '#clear-profile-data', function() {
            sessionStorage.clear();
            location.reload();
        });

        $(document).on('click', '#send-message', function() {
            if ($('#chat-input').val().trim() != '') {
                var text = $('#chat-input').val().trim();
                $('#chat-input').val('');
                $('.msg-page').append(textMsg(text));
                $('#chat-input').focus();
                scrollToBottom();
            }
        });

        $(document).on('submit', '#msg-form', function(){
            if ($('#chat-input').val().trim() != '') {
                var text = $('#chat-input').val().trim();
                $('#chat-input').val('');
                $('.msg-page').append(textMsg(text));
                $('#chat-input').focus();
                scrollToBottom();
            }
            return false;
        })

        $(document).on('click', '#send-image', function() {
            if ($('.chat-gallery figure.selected-item').length) {
                var img = $('.chat-gallery figure.selected-item img').attr('src').trim();
                $('.msg-page').append(imageMsg(img));
                scrollToBottom();
            }            
        });

        $(document).on('click', '.chat-gallery figure', function() {
            $('.chat-gallery figure.selected-item').removeClass('selected-item');
            $(this).addClass('selected-item');
        });
    });

    function textMsg(txt) {
        return('' +
            '<div class="outgoing-chats">' +
                '<div class="outgoing-chats-img">' +
                    '<img src="assets/img/thumbnail.jpeg">' +
                '</div>' +
                '<div class="outgoing-msg">' +
                    '<div class="outgoing-chats-msg">' +
                        '<p>' + txt + '</p>' +
                        '<span class="time">' + getDateTimeNow() + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '');
    }

    function imageMsg(img) {
        return('' +
            '<div class="outgoing-chats">' +
                '<div class="outgoing-chats-img">' +
                    '<img src="assets/img/thumbnail.jpeg">' +
                '</div>' +
                '<div class="outgoing-msg">' +
                    '<div class="outgoing-chats-msg">' +
                        '<img src="' + img + '" class="img-thumbnail msg-img">' +
                        '<span class="time">' + getDateTimeNow() + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '');
    }

    function scrollToBottom() {
        setTimeout(function() {
            $('html, body').stop(true, false).animate({
                scrollTop: document.body.scrollHeight
            }, 500);
        }, 100);
    }

    function getDateTimeNow() {
        var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var d = new Date(),
            hours = d.getHours(),
            minutes = d.getMinutes(),
            ampm = hours >= 12 ? 'pm' : 'am',
            month = '' + d.getMonth(),
            day = '' + d.getDate();
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var time = hours + ':' + minutes + ampm;
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return(time + ' | ' + monthName[month] + ' ' + day);
    }
})(window.jQuery);