/* ====================================================
================== GLOBALS VARIABLES ==================
==================================================== */ 
var $windowWidth = $(window).width();


/* ====================================================
==================== BOOT SCRIPT ======================
==================================================== */
$(document).ready(function(){
    /* ====================================================
    ================== RESIZING FUNCTIONS =================
    ==================================================== */
    /* Launch resizing function at start & when window resizing (for mobile) */
    $(".parallax-0").height($(window).height()-$("body > nav").height()+$(".triangle-separator > img").height());
    $(".parallax-0 > h1").css("line-height", $(window).height()-$("body > nav").height()+$(".triangle-separator > img").height()+"px");

    if($windowWidth <= 430){ $("body > nav > .menu-mobile a").text(""); $("body > nav > .menu-mobile a").css("width", "70px"); }
        else { $("body > nav > .menu-mobile a").text("MANON LAY"); $("body > nav > .menu-mobile a").css("width", "220px"); }

    $(window).resize(function(){
        $windowWidth = $(window).width();
        $(".parallax-0").height($(window).height()-$("body > nav").height()+$(".triangle-separator > img").height());
        $(".parallax-0 > h1").css("line-height", $(window).height()-$("body > nav").height()+$(".triangle-separator > img").height()+"px");
        if($windowWidth <= 430){ $("body > nav > .menu-mobile a").text(""); $("body > nav > .menu-mobile a").css("width", "70px"); }
            else { $("body > nav > .menu-mobile a").text("MANON LAY"); $("body > nav > .menu-mobile a").css("width", "220px"); }
    });


    /* ====================================================
    ================= GOOGLE MAP LAUNCHER =================
    ==================================================== */
    initGoogleMap(43.604652, 1.444209); // lat & lng on http://universimmedia.pagesperso-orange.fr/geo/nievre.htm


    /* ====================================================
    ================== LOCAL VARIABLES ==================
    ==================================================== */
    var navbarHeight = $("body > nav").height();
    var sectionArray = new Array("#about-me + section", "#skills + section", "#realisations + section", "#download + section", "#contact + section");


    /* ====================================================
    ================ SCROLLING FUNCTIONS ==================
    ==================================================== */
    $(window).scroll(function(event) {

        $.each(sectionArray, function(key, val){
//                  console.warn($(window).scrollTop(), $(val).position().top-navbarHeight*2);
            if($(window).scrollTop()+$(window).height() >= ($(val).position().top+$(val).height()*0.25) && $(val).attr("class").indexOf("load") < 0)
                $(val).attr("class", $(val).attr("class")+" load");

            if($(window).scrollTop() >= $(val).position().top-navbarHeight*2){
//                        console.log($("body > nav > nav:last-child > div").children()[key]);
                $("body > nav > nav:last-child > div").children().eq(key).css("color", "#fbfbfb");
            } else {
                $("body > nav > nav:last-child > div").children().eq(key).css("color", "#aaa");
            }
        });

//                console.warn($(window).scrollTop(), $("header").position().top+$("header").height());
        if ($(window).scrollTop() >= $("header").position().top+($("header").height()-navbarHeight*2)) {
//                    console.warn("nav collapsed");
            $("body > nav > nav:first-child").css('height', '0');
            $("body > nav").css('height', '85px');
            $("body > nav > nav:first-child").css('overflow', 'hidden');
        } else {
//                    console.warn("nav uncollapsed");
            $("body > nav > nav:first-child").css('height', '35px');
            $("body > nav").css('height', '120px');
        }
    });

    // Launch modal box
    $("footer p:first-child a").leanModal();
    
    /* ====================================================
    =================== VALIDATION FORM ===================
    ==================================================== */
    // Méthode d'expression régulière
    $.validator.addMethod("regex", function(value, element, regexpr) {          
        return regexpr.test(value);
    }, "L'adresse email ou le numéro de passe n'est pas valide.");

    $("#contactForm").validate({
        submitHandler: function() {
            send();
        },
        rules: {
            mail: { regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/ }
        },
        messages: {
            nom: "Le nom est obligatoire.<br>",
            mail: "L'adresse mail est obligatoire ou n'est pas valide.<br>",
            objet: "L'objet du message est obligatoire.<br>",
            message: "Le message est obligatoire et accepte au moins 5 caractères.<br>"
        },
        errorLabelContainer: "#messageBox"
    });
});


/* ====================================================
================== LAUNCH FUNCTIONS ===================
==================================================== */
/**
 * Applique une animation fadeOut sur l'élément HTML passer en paramètre
 * @param  {[String]} id [ID de l'élément que l'on veut cacher]
 * @return /
 */
function closeModal(selector){
    $(selector).fadeOut();
}

/**
 * Descend vers l'id de la page que l'on veut rejoindre avec une animation scroll
 * @param  {[String]} id [ID de l'élément que l'on veut atteindre à l'aide de la navigation]
 * @return /
 */
function nav(id){
    var divPosition = (id != "download" ? $("#"+id).offset().top - ($windowWidth <= 680 ? 0 : 123) : $("#"+id).offset().top - ($windowWidth <= 680 ? 0 : 38));
    $('html, body').animate({scrollTop: divPosition}, "slow");
}

/**
 * Initialise l'élément HTML contenant la google map
 * @param1  {[float]} lat [lattitude d'une adresse sur la terre]
 * @param2  {[float]} lng [longitude d'une adresse sur la terre]
 * @return /
 */
function initGoogleMap(lat, lng){
    var map;
    var toulouse = new google.maps.LatLng(lat, lng);

    var style = [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { weight: 0.1 },
          { lightness: 1 },
          { gamma: 1},
          { saturation: -75 },
          { hue: "#666999" },
          { visibility: "on" }
        ]
      }
    ];

    var mapOptions = {
        zoom: 12,
        center: toulouse,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: false,
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var mapType = new google.maps.StyledMapType(style, { name:"Grayscale" });    
    map.mapTypes.set('map_toulouse', mapType);
    map.setMapTypeId('map_toulouse');
}

/**
 * Descend vers l'id de la page que l'on veut rejoindre avec une animation scroll
 * @param  {[String]} id [ID de l'élément que l'on veut atteindre à l'aide de la navigation]
 * @return /
 */
function send(){
    console.info("sending");
    $.ajax({
        url: "php/mail.php",
        type: "post",
        dataType: 'json',
        data: {
            nom: $("#nom").val(),
            mail: $("#mail").val(),
            objet: $("#objet").val(),
            message: $("#message").val()
        },
        success: function(text) {
            console.info(text);
            $("#messageBox").html(text);
        }
    });
}