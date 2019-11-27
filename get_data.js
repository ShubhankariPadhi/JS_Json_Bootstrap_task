var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var jsonArrayLength = Object.keys(myObj.Employee_details).length;
        if(jsonArrayLength>0){
            var col = [];
            for (var i = 0; i < jsonArrayLength; i++) {
                for (var key in myObj.Employee_details[i]) {
                    // alert(col.indexOf(key));
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
            //getting table from html
            var table = document.getElementById("tableID");
            table.setAttribute('border', '1');
            table.setAttribute('class', 'table table-striped');
            //getting table header from html
            var tHead = document.getElementById("theadID");
            tHead.setAttribute('class', 'border bg-primary text-white text-center');
            //creating row for table header
            var hRow = document.createElement("tr");
            //adding column header to row of table head
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");
                th.innerHTML = col[i];
                hRow.appendChild(th);
            }
            tHead.appendChild(hRow);
            table.appendChild(tHead);
            //getting table body from html
            var tBody = document.getElementById("tbodyID");
            //tBody.setAttribute('class', 'border border-primary');
            // adding column header to row of table header
            for (var i = 0; i < jsonArrayLength; i++) {
                //creating row for each record
                var bRow = document.createElement("tr");
                bRow.setAttribute('onclick', 'getEmployees()');
                bRow.setAttribute('class', 'text-center text-primary border border-primary');
                for (var j = 0; j < col.length; j++) {
                    var td = document.createElement("td");
                    td.setAttribute('class', 'border border-primary');
                    td.innerHTML = myObj.Employee_details[i][col[j]];
                    bRow.appendChild(td);
                }
                tBody.appendChild(bRow);
            }
            table.appendChild(tBody);
            var divTable = document.getElementById("employeesTable");
            divTable.innerHTML = "";
            divTable.appendChild(table);
        }
        var res = JSON.parse(this.responseText);
    }
};

xmlhttp.open("GET", "employees.json", true);
xmlhttp.send();

function getEmployees(){
    var tableData = document.getElementById("tableID");
    for(var m = 0; m < tableData.rows.length; m++){
        tableData.rows[m].onclick = function(){
            /*var value = this.cells[0].innerHTML;
             console.log(value);*/
            var id = this.cells[0].innerHTML;
            var name = this.cells[1].innerHTML;
            var type = this.cells[2].innerHTML;
            var dob = this.cells[3].innerHTML;
            var exp = this.cells[4].innerHTML;
            var doj = this.cells[5].innerHTML;

            var getDisplay = "<table class='text-success' align='center'>";
            getDisplay += "<tr><td>Id : </td><td id='id'>"+id+"</td></tr>";
            getDisplay += "<tr><td>Name : </td><td id='name'>"+name+"</td></tr>";
            getDisplay += "<tr><td>Type : </td><td id='type'>"+type+"</td></tr>";
            getDisplay += "<tr><td>DOB : </td><td id='dob'>"+dob+"</td></tr>";
            getDisplay += "<tr><td>Experience : </td><td id='exp'>"+exp+"</td></tr>";
            getDisplay += "<tr><td>DOJ : </td><td id='doj'>"+doj+"</td></tr>";
            getDisplay += "</table>";
            document.getElementById("rowData").innerHTML = getDisplay;
        };
    }
}

