const FPS = 10;

var score = 0;
var health = 50;
var redirected = false;

var event;
var eventChance = 75;
var badEvents = [fireErupt, heatWave, drought, hurricane, polarVortex];
var goodEvents = [goodCrop, seaLevel, forestGrow, airQuality];
var choiceEvents = [coalMining, oilFracking, electricCars, geothermal, plasticBags, parisAccord, windTurbine];
var choiceIncrease = 50;

var removeEvents = true;

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var currentMonth = 0;
var year = 2020;

var healthBar = document.getElementById('boxInverse');
var monthText = document.getElementById('monthText');


var ffMarker = null;
var heatMarker = null;
var dMarker = null;
var hMarker = null;
var pVortex = null;
var gCrop = null;
var sLevel = null;
var fGrow = null;
var aQuality = null;
var cMining = null;
var oFracking = null;
var eCars = null;
var gTherm = null;
var pBags = null;
var pAccord = null;
var wTurbine = null;

setInterval(update, 1000 / FPS);

function update() {

	checkGameOver();

    healthBar.style.width = (100 - health).toString() + "%";
    if (currentMonth > 11) {
        currentMonth -= 12;
        year++;
    }
    monthText.innerHTML = months[currentMonth] + " " + year.toString();
    if (health > 100) {
        health = 100;
    }
    if (health < 0) {
        health = 0;
    }

}

function checkGameOver() {
	score += health;
	if (health >= 100 && !redirected) {
		window.location.href = "win.html";
		redirected = true;
	}

	if (year == 2030 && !redirected) {
		window.location.href = "https://hackathon.crung.repl.co/slow.html";
		redirected = true;
	}

	if (health <= 0 && !redirected) {
		window.location.href = "https://hackathon.crung.repl.co/lose.html";
		redirected = true;
	}
}

function fastForward() {
    console.log(health);
    clearOverlays();
    currentMonth += Math.floor((Math.random() * 3) + 6);

	var a = Math.random() * 100;
	if (a < eventChance) {
    	random();
	} else {
		console.log('Nothing happened');
	}
}

function random() {
	var t = Math.random() * (100 + choiceIncrease);
	console.log(t);
	if (t < health && goodEvents.length) {
		goodEvent();
	} else if (t > health && t < 100 && badEvents.length) {
		badEvent();
	} else if (t > 100 && choiceEvents.length) {
		choiceEvent();
	} else if (!goodEvents.length && !badEvents.length && !choiceEvents.length) {
		console.log('All events used! Reverting to alien invasion in 3... 2... 1...');
	}
}

function badEvent() {
    var t = badEvents[Math.floor(Math.random() * badEvents.length)];
    //event = t.name;
    console.log(t);
    t();
    badEvents.splice(badEvents.indexOf(t), 1);
	score += -10;
}

function goodEvent() {
    var t = goodEvents[Math.floor(Math.random() * goodEvents.length)];
    //event = t.name;
    console.log(t);
    t();
    goodEvents.splice(goodEvents.indexOf(t), 1);
	score += 30;
}

function choiceEvent() {
    var t = choiceEvents[Math.floor(Math.random() * choiceEvents.length)];
    //event = t.name;
    console.log(t);
    t();
    choiceEvents.splice(choiceEvents.indexOf(t), 1);
}






function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.7128, lng: -78.0060 },
        zoom: 3.5,
    });
}

function fireErupt() {
    var forestFire = {
        url: "https://webstockreview.net/images/flame-clipart-3.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Forest Fire in California!</h1>' +
        '<p>Due to your ineptitude to handle climate change, a forest fire has erupted in North Carolina. 4,000 people have died.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    ffMarker = new google.maps.Marker({
        position: { lat: 35.7128, lng: -118.0060 },
        map: map,
        icon: forestFire,
    });

    ffMarker.addListener("click", () => {
        infowindow.open(map, ffMarker);
    });

}

function heatWave() {
    var heatWave = {
        url: "https://static.thenounproject.com/png/68571-200.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Heat Wave in Arizona!</h1>' +
        '<p>Global warming has caused a heatwave in Arizona. The high temperatures have caused schools to close down sports due to the risk of heat stroke.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    heatMarker = new google.maps.Marker({
        position: { lat: 32.7128, lng: -110.0060 },
        map: map,
        icon: heatWave,
    });

    heatMarker.addListener("click", () => {
        infowindow.open(map, heatMarker);
    });

}

function drought() {
    var drought = {
        url: "https://i.imgur.com/GC0gZMJ.png", // url
        scaledSize: new google.maps.Size(70, 70), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Drought in Kansas!</h1>' +
        '<p>High temperatures have caused a huge drought in Kansas. Due to the shortage of food, over a hundred people have died.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    dMarker = new google.maps.Marker({
        position: { lat: 37.7128, lng: -95.0060 },
        map: map,
        icon: drought,
    });


    dMarker.addListener("click", () => {
        infowindow.open(map, dMarker);
    });

}

function hurricane() {
    var hurricane = {
        url: "https://i.imgur.com/2ayTSXM.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Hurricane hits Florida!</h1>' +
        '<p>High sea levels have resulted in a deadly hurricane. A Category 3 hurricane ravaged Florida and destroyed the land.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    hMarker = new google.maps.Marker({
        position: { lat: 25.7128, lng: -78.0060 },
        map: map,
        icon: hurricane,
    });


    hMarker.addListener("click", () => {
        infowindow.open(map, hMarker);
    });

}


function polarVortex() {
    var polarVortex = {
        url: "https://i.imgur.com/bA3nbDz.png",// url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Brrrr! Polar Vortex in South Dakota!</h1>' +
        '<p>The snow from the polar vortex storm has caused schools to close for a week.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    pVortex = new google.maps.Marker({
        position: { lat: 43.7128, lng: -98.0060 },
        map: map,
        icon: polarVortex,
    });


    pVortex.addListener("click", () => {
        infowindow.open(map, pVortex);
    });

}

function goodCrop() {
    var goodCrop = {
        url: "https://i.imgur.com/BRzflk9.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>High Crop Yield in Utah!</h1>' +
        '<p>Thanks to your efforts to curb climate change, the farmers in Utah had a great year. Your approval ratings have increased.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    gCrop = new google.maps.Marker({
        position: { lat: 40.7128, lng: -111.0060 },
        map: map,
        icon: goodCrop,
    });


    gCrop.addListener("click", () => {
        infowindow.open(map, gCrop);
    });

}

function seaLevel() {
    var seaLevel = {
        url: "https://i.imgur.com/C7sFooO.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Record Low For Sea Levels!</h1>' +
        '<p>Your work has been splendid! Sea levels have risen only 0.05 inches this year. Great work.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    sLevel = new google.maps.Marker({
        position: { lat: 40.7128, lng: -125.0060 },
        map: map,
        icon: seaLevel,
    });


    sLevel.addListener("click", () => {
        infowindow.open(map, sLevel);
    });

}

function forestGrow() {
    var forestGrow = {
        url: "https://i.imgur.com/PNtYqm7.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Thriving trees!</h1>' +
        '<p>Thanks to your anti-deforestation laws, forests are getting cut down at much lower rates. What fresh air!</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    fGrow = new google.maps.Marker({
        position: { lat: 40.7128, lng: -73.0060 },
        map: map,
        icon: forestGrow,
    });


    fGrow.addListener("click", () => {
        infowindow.open(map, fGrow);
    });

}

function airQuality() {
    var airQuality = {
        url: "https://cdn.discordapp.com/attachments/779854046080270337/780175094198042664/Set_nature_color-33-512.png", // url
        scaledSize: new google.maps.Size(70, 70), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Crisp Air Quality!</h1>' +
        '<p>Since pollution has been cut down, the air quality in New York is the best it has been in a decade.</p>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    aQuality = new google.maps.Marker({
        position: { lat: 40.7128, lng: -75.0060 },
        map: map,
        icon: airQuality,
    });


    aQuality.addListener("click", () => {
        infowindow.open(map, aQuality);
    });

}

function coalMining() {
    var coalMining = {
        url: "https://i.imgur.com/B49P2Ak.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Coal Mining Laws in West Virginia</h1>' +
        '<p>Your experts have determined that coal is releasing a lot of carbon emissions. To end this, they recommend making laws restricting coal mining. Will you follow their advice?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Absolutely!</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">No, keep them the same.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    cMining = new google.maps.Marker({
        position: { lat: 37.7128, lng: -83.0060 },
        map: map,
        icon: coalMining,
    });


    cMining.addListener("click", () => {
        infowindow.open(map, cMining);
    });

}

function oilFracking() {
    var oilFracking = {
        url: "https://i.imgur.com/ea2s3dj.png", // url
        scaledSize: new google.maps.Size(70, 70), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Oil Fracking Offshore</h1>' +
        '<p>Fracking is causing major oil spills, which are ruining the ecosystems, and releasing methane into the atmosphere. Will you ban fracking, or let it slide?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Ban it!</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Let it slide.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    oFracking = new google.maps.Marker({
        position: { lat: 40.7128, lng: -125.0060 },
        map: map,
        icon: oilFracking,
    });


    oFracking.addListener("click", () => {
        infowindow.open(map, oFracking);
    });

}

function electricCars() {
    var electricCars = {
        url: "https://i.imgur.com/CTk7QzR.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Electric/Hybrid Cars</h1>' +
        '<p>Gasoline-fueled cars release immense amounts of CO2 into the atmosphere. Rather, hybrid and electric cars are much better alternatives. How will you make this happen? </p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Use government funding to help car companies create more hybrids.</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Do nothing.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    eCars = new google.maps.Marker({
        position: { lat: 43.7128, lng: -115.0060 },
        map: map,
        icon: electricCars,
    });


    eCars.addListener("click", () => {
        infowindow.open(map, eCars);
    });

}

function geothermal() {
    var geothermal = {
        url: "https://cdn.discordapp.com/attachments/779854046080270337/780190881265090560/104-1046174_power-plants-geothermal-power-plant-cartoon-clipart-removebg-preview.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Geothermal Crisis</h1>' +
        '<p>The geothermal plant in Iowa is requiring a lot of funding. Your financial advisors advise you to shut it down. Will you listen to them?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">No, keep the plant running.</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Shut it down.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    gTherm = new google.maps.Marker({
        position: { lat: 40.7128, lng: -95.0060 },
        map: map,
        icon: geothermal,
    });


    gTherm.addListener("click", () => {
        infowindow.open(map, gTherm);
    });

}

function plasticBags() {
    var plasticBags = {
        url: "https://cdn.discordapp.com/attachments/779854046080270337/780190598929055765/image-removebg-preview.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Plastic Bags</h1>' +
        '<p>Currently, it costs 10 cents to use plastic bags in grocery stores. People are protesting against this law. What will you do?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Keep the law.</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Remove the law.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    pBags = new google.maps.Marker({
        position: { lat: 32.7128, lng: -90.0060 },
        map: map,
        icon: plasticBags,
    });


    pBags.addListener("click", () => {
        infowindow.open(map, pBags);
    });

}

function parisAccord() {
    var parisAccord = {
        url: "https://cdn.discordapp.com/attachments/779854046080270337/780192403306315786/image-removebg-preview.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Paris Accord</h1>' +
        '<p>The Paris Agreement is an agreement within the United Nations to mitigate climate change. Currently, the US is not a part of it. Will you join it?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Yes!</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Nah.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    pAccord = new google.maps.Marker({
        position: { lat: 40.7128, lng: -75.0060 },
        map: map,
        icon: parisAccord,
    });


    pAccord.addListener("click", () => {
        infowindow.open(map, pAccord);
    });

}

function windTurbine() {
    var windTurbine = {
        url: "https://cdn.discordapp.com/attachments/779854046080270337/780194447085404190/image-removebg-preview.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(25, 50) // anchor
    };

    const contentString =
        '<h1>Wind Turbine</h1>' +
        '<p>You want to set up more wind turbines, but your financial advisors say it will cost too much. What will you do?</p>' +
        '<button class="button button1" onclick="score += 40;health += 10;clearOverlays();">Follow through with your plan.</button>' + '<button class="button button2" onclick="score += -20;health -= 10;clearOverlays();">Listen to them.</button>';
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    wTurbine = new google.maps.Marker({
        position: { lat: 32.7128, lng: -98.0060 },
        map: map,
        icon: windTurbine,
    });


    wTurbine.addListener("click", () => {
        infowindow.open(map, wTurbine);
    });

}

function clearOverlays() {
    if (ffMarker != null) {
        ffMarker.setMap(null);
        ffMarker = null;
    } else if (heatMarker != null) {
        heatMarker.setMap(null);
        heatMarker = null;
    } else if (dMarker != null) {
        dMarker.setMap(null);
        dMarker = null;
    } else if (hMarker != null) {
        hMarker.setMap(null);
        hMarker = null;
    } else if (pVortex != null) {
        pVortex.setMap(null);
        pVortex = null;
    } else if (gCrop != null) {
        gCrop.setMap(null);
        gCrop = null;
    } else if (sLevel != null) {
        sLevel.setMap(null);
        sLevel = null;
    } else if (fGrow != null) {
        fGrow.setMap(null);
        fGrow = null;
    } else if (aQuality != null) {
        aQuality.setMap(null);
        aQuality = null;
    } else if (cMining != null) {
        cMining.setMap(null);
        cMining = null;
    } else if (oFracking != null) {
        oFracking.setMap(null);
        oFracking = null;
    } else if (eCars != null) {
        eCars.setMap(null);
        eCars = null;
    } else if (gTherm != null) {
        gTherm.setMap(null);
        gTherm = null;
    } else if (pBags != null) {
        pBags.setMap(null);
        pBags = null;
    } else if (pAccord != null) {
        pAccord.setMap(null);
        pAccord = null;
    } else if (wTurbine != null) {
        wTurbine.setMap(null);
        wTurbine = null;
    }
}