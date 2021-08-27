
function loadTable() {
    var body = document.getElementById("tableBody");
    body.innerHTML = '';
	$.ajax({
		url: "http://wt.ops.labs.vu.nl/api20/bb2feb7b",
		type: "GET",
		dataType: 'json',
		success: function (response) {
			for (var n = 0; n < response.length; n++) {
				addRow(response[n].image, response[n].brand, response[n].os, response[n].model, response[n].screensize);
				}
			}
	})
}

function addRow(image, brand, os, model, screensize) {
    var table = document.getElementById("tableBody");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = "<img src=" + image + " alt='image of phone'/>";
    cell2.innerHTML = brand;
    cell3.innerHTML = os;
    cell4.innerHTML = model;
    cell5.innerHTML = screensize;
}

$(document).ready(function(e) {
    $.get("http://wt.ops.labs.vu.nl/api20/bb2feb7b", function(data, status){
	loadTable();
	});

	var form = $('#form');
    form.submit(function (e) {

        e.preventDefault();
        JSON.stringify(form)
        $.ajax({
            type: form.attr('method'),
            url: form.attr('action'),
            data: form.serialize(),
            success: function (data) {
                console.log('Submission was successful.');
                console.log(data);
                loadTable();
            },
            error: function (data) {
                console.log('An error occurred.');
                console.log(data);
                loadTable();
            },
        });
    });
});

function reset() {
    $.get("https://wt.ops.labs.vu.nl/api20/bb2feb7b/reset", function(data, status){
        console.log("Reset: " + status);
        success: loadTable();
    });
}

function sortTable(n) { 
	var table; 
	table = document.getElementById("tableBody");
	var rows, i, x, y, count = 0; 
	var switching = true; 

	// Order is set as ascending 
	var direction = "ascending"; 

	// Run loop until no switching is needed 
	while (switching) { 
		switching = false; 
		var rows = table.rows;

		//Loop to go through all rows 
		for (i = 0; i < (rows.length - 1); i++) {
			var Switch = false; 

			// Fetch 2 elements that need to be compared 
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			// Check the direction of order 
			if (direction == "ascending") { 

				// Check if 2 rows need to be switched 
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
					{ 
					// If yes, mark Switch as needed and break loop 
					Switch = true; 
					break; 
				} 
			} else if (direction == "descending") { 

				// Check direction 
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
					{ 
					// If yes, mark Switch as needed and break loop 
					Switch = true; 
					break; 
				} 
			} 
		} 
		if (Switch) { 
			// Function to switch rows and mark switch as completed 
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
			switching = true; 

			// Increase count for each switch 
			count++; 
		} else { 
			// Run while loop again for descending order 
			if (count == 0 && direction == "ascending") { 
				direction = "descending"; 
				switching = true; 
			} 
		} 
	} 
}
