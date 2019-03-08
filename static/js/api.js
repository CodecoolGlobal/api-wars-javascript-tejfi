function generateTableHeader() {
    let planets = [];
    planets.push(["Name", "Diameter", "Climate", "Terrain",
        "Surface Water Percentage",
        "Population", "Residents", " "]);

    let table = document.createElement("TABLE");
    let thead = document.createElement('THEAD');
    let tbody = document.createElement('TBODY')
    table.appendChild(thead);
    table.appendChild(tbody);
    tbody.classList.add('grid');
    let tr = document.createElement("TR");
    thead.appendChild(tr);

    for (let i = 0; i < planets[0].length; i++) {
        let headerCell = document.createElement("TH");
        headerCell.innerHTML = planets[0][i];
        tr.appendChild(headerCell);
        // tr.appendChild(document.createElement("TH")).appendChild(document.createTextNode(planets[i]));*!/
    }
    let planetsTable = document.querySelector("#planetstable");
    planetsTable.dataset.currentPage = 1;
    let divClass =
        "table-responsive";
    planetsTable.classList.add(divClass);
    planetsTable.innerHTML = "";
    planetsTable.appendChild(table);


}

function generateTable(pageCounter) {
    $(document).ready(function () {
        let table = $('.grid');
        table.empty();
        $.getJSON('https://swapi.co/api/planets/?format=json&page=' + pageCounter, function (response) {
            let dataResults = response['results'];
            let dataNext = response['next'];
            let dataPrev = response['previous'];
            let planetsTable = document.querySelector("#planetstable")
            let nextPageCheck = planetsTable.dataset.nextPage;
            planetsTable.dataset.nextPage = dataNext;
            let prevPageCheck = planetsTable.dataset.prevPage;
            planetsTable.dataset.prevPage = dataPrev;
            console.log(response);
            let planetsData = '';
            $.each(dataResults, function (value, key) {
                planetsData += '<tr>';
                planetsData += `<td>${key.name}</td>`;
                planetsData += `<td>${key.diameter}</td>`;
                planetsData += `<td>${key.climate}</td>`;
                planetsData += `<td>${key.terrain}</td>`;
                planetsData += `<td>${key.surface_water}</td>`;
                planetsData += `<td>${key.population}</td>`;
                console.log(key.residents);
                if (key.residents.length != 0) {
                    planetsData += `<td><button class="btn btn-primary quickViewTrigger" id="${value}">${key.residents.length + ' resident(s)'}</button></td>`;

                } else {
                    planetsData += `<td>No Known residents</td>`;
                }
                planetsData += '</tr>';

            });

            $('.grid').append(planetsData);
        });

    });
}

function addPageUpHandler() {
    let counterButton = document.getElementById('next');
    let counterButtonPrev = document.querySelector('#prev');

    counterButton.addEventListener('click', function () {
        let planetsTable = document.querySelector('#planetstable');
        let pageCounter = planetsTable.dataset.currentPage;
        pageCounter++;
        planetsTable.dataset.currentPage = pageCounter;
        generateTable(pageCounter);
        buttonHider();
    });

}


function addPageDownHandler() {
    let countButtonNext = document.querySelector('#next');
    let counterButton = document.getElementById('prev');

    counterButton.addEventListener('click', function () {
        countButtonNext.classList.remove('hide-me');
        let planetsTable = document.querySelector('#planetstable');
        let pageCounter = planetsTable.dataset.currentPage;
        pageCounter--;
        planetsTable.dataset.currentPage = pageCounter;
        generateTable(pageCounter);
        buttonHider();

    });

}


function buttonHider() {
    let countButtonNext = document.querySelector('#next');
    let counterButtonPrev = document.querySelector('#prev');
    let planetsTable = document.querySelector('#planetstable');
    let pageCounter = planetsTable.dataset.currentPage;
    let prevButtonHide = pageCounter <= 1 ? counterButtonPrev.classList.add('hide-me') : counterButtonPrev.classList.remove('hide-me');
    let NextButtonHide = pageCounter >= 7 ? countButtonNext.classList.add('hide-me') : countButtonNext.classList.remove('hide-me');


}

/*    function makeButton() {
        let buttonNames = ['Prevoius', 'Next'];
        for (let i = 0; i < buttonNames.length; i++) {

            let buttonText = document.createElement("button");

            buttonText.innerHTML = buttonNames[i];
            let divContainer = document.querySelector(".btn-container");
            divContainer.appendChild(buttonText);
            let addButtonID= document.getElementsByTagName('button');
            console.log(addButtonID[0]);


        }
    }*/
function residents() {
    fetch('https://swapi.co/api/people/5/')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log(JSON.stringify(myJson));
        });
}



/*
function modal(){
    $(document).ready(function() {
	"use strict";

	// OPEN MODAL ON TRIGGER CLICK
	$(".quickViewTrigger").on('click', function () {
		var $quickview = $(this).next(".quickViewContainer");
		$quickview.dequeue().stop().slideToggle(500, "easeInOutQuart");
		$(".quickViewContainer").not($quickview).slideUp(200, "easeInOutQuart");
	});

	// CLOSE MODAL WITH MODAL CLOSE BUTTON
	$(".close").click(function() {
		$(".quickViewContainer").fadeOut("slow");
	});

});

// CLOSE MODAL ON ESC KEY PRESS
$(document).on('keyup', function(e) {
	"use strict";
	if (e.keyCode === 27) {
		$(".quickViewContainer").fadeOut("slow");
	}
});

// CLOSE MODAL ON CLICK OUTSIDE MODAL
$(document).mouseup(function (e) {
	"use strict";
    var container = $(".quickViewContainer");
    if (!container.is(e.target) && container.has(e.target).length === 0)
    {
        $('.quickViewContainer').fadeOut("slow");
    }
});
}
*/






$(document).ready(function(){
  $("#myBtn").click(function(){
    $("#myModal").modal();
  });
});



function init() {
    let pageCounter = 1;

    /*
        makeButton();
    */
    generateTableHeader();
    generateTable(pageCounter);
    addPageUpHandler(pageCounter);
    addPageDownHandler(pageCounter);
    buttonHider();
    residents();
}

init();