'use strict';

import 'font-awesome-sass-loader';
import './scss/style.scss';

import Vue from "vue";
import xhr from "xhr";
import GoogleMapsLoader from "google-maps";

// Mail conf
var api_url = "https://formspree.io/";
var email_to = "sylvain.martyg@gmail.com";
// GMaps conf
GoogleMapsLoader.KEY = "AIzaSyB_AXIy2p4zUl3PXIqpyJ54lIT6usyYtYQ";
var coordonnees = {
    lat: 43.604652,
    lng: 1.444209
}

window.App = new Vue({
    el: '#app',

    data: function() {
        var vm = this;
        GoogleMapsLoader.load(initGoogleMap);

        this.getWindowHeight();
        window.addEventListener('resize', function() {
            vm.getWindowHeight();
        });

        return {
            galleryFiltered: false,
            contact: {
                name: "Michel Test",
                email: "test@test.fr",
                subject: "Test envoi email",
                message: "super test tralala"
            }
        };
    },

    methods: {

        galleryFilter: function(id) {
            var vm = this,
                items = $("[data-filter]");
            console.debug("galleryFilter", vm.galleryFiltered)
            items.each(function() {
                var item = $(this);
                if(id == "reset") {
                    item.fadeIn();
                } else if(item.data("filter") != id) {
                    item.fadeOut();
                } else {
                    item.fadeIn();
                }
            });
            if(id != "reset") {
                vm.galleryFiltered = true;
            } else {
                vm.galleryFiltered = false;
            }
        },

        sendEmail: debounce(function () {
            var data = {
                "email": this.contact.name+" <"+this.contact.email+">",
                "_subject": "[manonlay.com] "+this.contact.subject,
                "message": this.contact.message
            };
            console.debug("sending email", data);
            xhr({
                body: data,
                url: api_url+email_to,
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }, function (err, resp, body) {
                console.debug("FORMSPREE", err, body);
            });
        }, 500),
        
        getWindowHeight: function(event) {
            var windowHeight = $( window ).height();
            $(".view-height").css("height", windowHeight);
        }
    }
});

// found here https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function initGoogleMap(google) {
    console.debug("INIT GOOGLE MAP");
    var map;
    var toulouse = new google.maps.LatLng(coordonnees.lat, coordonnees.lng);

    var style = [
      {
        featureType: "all",
        elementType: "all",
        stylers: [
          { weight: 0.1 },
          { lightness: 1 },
          { gamma: 1},
          { saturation: -75 },
          { hue: "#e56d6e" },
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
        streetViewControl: false,
        draggable: false,
    };

    map = new google.maps.Map(document.getElementById("gmap"), mapOptions);

    var mapType = new google.maps.StyledMapType(style, { name:"Grayscale" });    
    map.mapTypes.set('map_toulouse', mapType);
    map.setMapTypeId('map_toulouse');
 }