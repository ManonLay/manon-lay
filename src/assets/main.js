'use strict';

import 'font-awesome-sass-loader';
import './scss/style.scss';

import Vue from 'vue';
import MailgunFactory from "mailgun.js";

// Mail conf
var api_key = "key-68f3360e46d449ef97b28e9dc41ed74b";
var domain = "sandboxa2430e1ec0cc4ab0b0dc56c133140adf.mailgun.org";
var email_to = "sylvain.martyg@gmail.com";
var mailgun = MailgunFactory.client({
    username: 'api',
    key: api_key,
});

window.App = new Vue({
    el: '#app',
    data: {
        contact: {
            name: "Michel Test",
            email: "test@test.fr",
            subject: "Test envoi email",
            message: "super test tralala"
        }
    },
    methods: {
        sendEmail : debounce(function () {
            var data = {
                from: this.contact.name+" <"+this.contact.email+">",
                to: email_to,
                subject: "[manonlay.com] "+this.contact.subject,
                text: this.contact.message
            };
            console.info("sending email", data);
            // use https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
            // to test in localhost
            mailgun.messages.create(domain, data)
            .then(msg => console.log(msg)) // logs response data
            .catch(err => console.log(err)); // logs any error
        }, 500)
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