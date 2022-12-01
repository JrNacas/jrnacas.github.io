var editProfileWindowShow = false;
var openCardWindowShow = false;
var qrCodeWindowShow = false;
var slickLoaded = false;

$(document).ready(function () {
    $("#edit-profile-overlay").click(function() {
        editProfileWindowShow = !editProfileWindowShow;
        if (editProfileWindowShow) {
            $("#edit-profile").show();
        } else {
            $("#edit-profile").hide();
        }
    });
    $("#open-card-overlay").click(function() {
        openCardWindowShow = !openCardWindowShow;
        if (openCardWindowShow) {
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#222');
            $("#card1-fullname,#card2-fullname").text(localStorage.getItem('fullname') ? localStorage.getItem('fullname') : "Peter Parker");
            $("#card1-PN,#card2-PN").text(localStorage.getItem('PN') ? localStorage.getItem('PN'): "990101-1234");
            var theRandomNumber = parseInt(localStorage.getItem('PN')) || 0;
            var firstFourDigits = 6032;
            var secondFourDigits = ('0000'+(9153+theRandomNumber)%9999).slice(-4);
            var thirdFourDigits = ('0000'+(5672+theRandomNumber)%9999).slice(-4);
            var fourthFourDigits = ('0000'+(156+theRandomNumber)%9999).slice(-4);
            $("#card1-number,#card2-number").text(firstFourDigits+" "+secondFourDigits+" "+thirdFourDigits+" "+fourthFourDigits);
            $("#open-card").show();
        }
        if (!slickLoaded) {
            $(".card-carousel").slick({
                infinite: false,
                dots: true,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1
            });
            slickLoaded = true;
        }
    });
    $("#open-card-close").click(function() {
        openCardWindowShow = !openCardWindowShow;
        if (!openCardWindowShow) {
            $("#open-card").hide();
            document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#fff');
        }
    });
    $("#fullname").val(localStorage.getItem('fullname'));
    $("#PN").val(localStorage.getItem('PN'));
    $("#fullname").change(function() {
        localStorage.setItem('fullname', $("#fullname").val());
    });
    $("#PN").change(function() {
        localStorage.setItem('PN', $("#PN").val());
    });
    $(".card-wrapper").click(function() {
        if ($(this).css("transform")=="none"||$(this).css("transform")=="") {
            $(this).css("-webkit-transform","rotateY(180deg)");
            $(this).css("transform","rotateY(180deg)");
        } else {
            $(this).css("-webkit-transform","");
            $(this).css("transform","");
        }
    });
    $("#qr-code-open").click(function() {
        qrCodeWindowShow = !qrCodeWindowShow;
        if (qrCodeWindowShow) {
            $("#qr-code").show();
        }
    });
    $("#qr-code").click(function() {
        qrCodeWindowShow = !qrCodeWindowShow;
        if (!qrCodeWindowShow) {
            $("#qr-code").hide();
        }
    });
});
