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
            var full_name = localStorage.getItem('fullname') ? localStorage.getItem('fullname') : "AIK STOCKHOLM";
            $("#card1-fullname,#card2-fullname").text(full_name);
            var personal_number = localStorage.getItem('PN') ? localStorage.getItem('PN'): "000000-1891";
            $("#card1-PN,#card2-PN").text(personal_number);
            var theRandomNumber = parseInt(personal_number) || 0;
            var firstFourDigits = 6032;
            var secondFourDigits = ('0000'+(9153+theRandomNumber)%9999).slice(-4);
            var thirdFourDigits = ('0000'+(5672+theRandomNumber)%9999).slice(-4);
            var fourthFourDigits = ('0000'+(156+theRandomNumber)%9999).slice(-4);
            $("#card1-number,#card2-number").text(firstFourDigits+" "+secondFourDigits+" "+thirdFourDigits+" "+fourthFourDigits);
            $("#open-card").show();
            var qr_info_pnr = personal_number.replace(/[^0-9]/g, "");
            var full_name_splits = full_name.split(" ");
            var qr_info_ln = full_name_splits.pop();
            var qr_info_fn = full_name_splits.join(" ");
            var qr_info = '{"pnr":"'+qr_info_pnr+'","fn":"'+qr_info_fn+'","ln":"'+qr_info_ln+'","id":"dzDSqrSKIietOXBftRDdHZ%3D%3D","o2":"STUDENTKORTET I SVERIGE","o2id":6325,"o3":"ÖVRIGA","o3id":5631,"o4":"","o4id":"","valid":"2023-02-10","dt":"2022-11-29 15:29:44","check":"cuifuhp1kyzeo2efa0ko3idbzoaoo81g"}';
            $("#qr-code-img").attr("src","https://api.qrserver.com/v1/create-qr-code/?size=512x512&data="+encodeURIComponent(qr_info));
        }
        if (!slickLoaded) {
            $(".card-carousel").slick({
                infinite: false,
                dots: true,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                touchThreshold: 20
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
    $("#open-card-refresh").click(async function() {
        $(".card-carousel").hide();
        $(".card-refresh").show();
        $(".leaf").hide();
        await delay(1000);
        $(".card-refresh").hide();
        $(".card-carousel").show();
        $(".leaf").show();
    });
});

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
