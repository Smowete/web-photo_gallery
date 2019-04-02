"use strict";
var width = -1;

$(document).ready(function() {
	load();
	var resize_timer = setInterval(resize, 1000);
	
	$(window).resize(function() {
		resize();
	});
});

function load() {
	var ajaxGetPromise = AjaxGetPromise("photoStream.php");
	ajaxGetPromise
		.then(JSON.parse)
		.then(addPhotos)
		.catch(havingError);
}

function addPhotos(response) {
	for (var i = 0; i < response.length; i++) {
		var item = document.createElement("div");
		item.classList.add("img__wrap");

		var photo = document.createElement("a");
		photo.classList.add("lightbox");
		photo.href = "photos/" + response[i].no + ".jpg";

		var image = document.createElement("img");
		image.classList.add("img__img");
		image.src = "photos/" + response[i].no + ".jpg";

		photo.appendChild(image);
		item.appendChild(photo);

		var description = document.createElement("p");
		description.classList.add("img__description");
		description.innerText = response[i].city + ", " + response[i].country + ", " + response[i].date;

		item.appendChild(description);
		document.getElementById("width").appendChild(item);
	}    
	baguetteBox.run('.tz-gallery');
	console.log("1");
}

function havingError(errorMessage) {
	alert("Ohhh... There is something wrong: " + errorMessage);
}

function resize() {
	console.log("resize");
	var nowWidth = $("#width").width();
	// if (nowWidth !== width) {
	if (1) {
		width = nowWidth;
		var images = $(".img__wrap");
		for (var i = 0; i < images.length; i++) {
			var image = images[i].children[0].children[0];
			
			if (width < 350) {
				images[i].style.width = width + "px";
				images[i].style.height = null;
				continue;
			}/*
			if (image.naturalHeight <= image.naturalWidth / 2) {
				images[i].style.width = width + "px";
				images[i].style.height = null;
				continue;
			}*/
			if (i + 1 === images.length) {
				images[i].style.width = width + "px";
				images[i].style.height = null;
				continue;
			}
			// height control to be under 300
			var sum = 0;
			var count = 0;
			for (var j = i; j < images.length; j++) {
				var nextImage = images[j].children[0].children[0];
				count++;
				sum += nextImage.naturalWidth / nextImage.naturalHeight;
					
				var calculatedHeight = width / sum;
				if (calculatedHeight < 300 || j + 1 === images.length) {
					setHeight(images, i, count, calculatedHeight);
					i = j;
					break;
				}
			}
		}
	}
	
}

function setHeight(images, start, count, calculatedHeight) {
	for (var i = start; i < start + count; i++) {
		var image = images[i].children[0].children[0];
		images[i].style.height = calculatedHeight + "px";
		images[i].style.width = calculatedHeight / image.naturalHeight * image.naturalWidth + "px";
	}
}
