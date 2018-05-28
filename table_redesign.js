
window.addEventListener('load', function(){
  //Filter Modal
    //Get the modal
    var fModal = document.getElementById("f-modal");

    //Get the button that opens the modal
    var fBtn = document.getElementById("filter");

    //Get the <span> element that closes the modal
    var fClose = document.getElementsByClassName("f-close");

    //When the user clicks the button, open the modal
    fBtn.onclick = function() {
      fModal.style.display = "block";
    }

    //When the user clicks on <span> (x), close the modal
    fClose[0].onclick=function(){
      fModal.style.display = "none";
    }
    //When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event){
      if (event.target === fModal){
        fModal.style.display = "none";
      }
    }
}, false);


 // window.onload = function() {
 //   var selectAll = getElementById("select-all").checked;
 //   if(selectAll == true){
 //     for(var i=0; i <)
 //     getElementsByClassName("checkbox")[0].checked = true;
 //   }

 // }

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------
//Global variables to be used in multiple functions

   function filter(){
     var f, selectedInp, table, input, firstRow, header, i, j, k, numCells, numRows, tr, td, c, comp;
     // alert('firing');
     // var f, selectedInp, table, input, firstRow, header, i, j, k, numCells, numRows, tr, td, c, comp;

     //Select the select drop-down menu
     f = document.getElementById("select-filter");
      //Get the option that was selected in the drop-down menu
     selectedInp = f.options[f.selectedIndex].value;
     // console.log(selectedInp);

     //Select the comparison drop-down menu
     c = document.getElementById("comparison");
     //Get the option that was selected in the comparison drop-down menu
    comp = c.options[c.selectedIndex].value;


     //Select the table
     table = document.getElementById("team-apps");

     //Select the first row of the table
     // firstRow = table.getElementsByTagName("tr")[0]; //use line 54 instead
     firstRow = table.rows[0];

     //Count the number of cells in the first row
     numCells = firstRow.cells.length;
     // console.log(numCells);

     //Select the table header cells
     header = firstRow.getElementsByTagName("th");
     // header = firstRow;

     //Get the value of the user input
     input = document.getElementById("user-input").value;
     // console.log(input);

     //Count the number of rows in the table
     numRows = table.rows.length - 1;
     // rows = table.getElementsByTagName('tbody')[0].rows.length;    also works in lieu of line 69
     // console.log(numRows);

     //Loop through the header cells of the header row
      for(i=0; i<numCells; i++){
        // alert("for loop is running");
        // console.log(header[i].innerHTML); //log the text in cell
         //If the selected option matches the header name
         if(selectedInp == header[i].textContent){
           alert("match");

          //numRows - 1 because we're not counting the footer row
           for(j=1; j<=numRows-1; j++){
             console.log("2nd for loop is working");
               tr = table.rows[j];
               console.log(tr);
               //col number stays fixed --> i is fixed
               td = tr.cells[i];
               console.log(td);

               //Comparison options
               if(comp == "equals" || comp == "matches"){
                 alert(td);
                 // alert('equals or matches');
                 if (td.textContent == input){
                 tr.style.display = "";
                } else{
                  tr.style.display = "none";
                }
              }else if(comp == "greater-than"){
                if (td.textContent > input) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(comp == "less-than"){
                if (td.textContent < input) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(comp == "Not equal to"){
                if (td.textContent !== input) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(comp == "pending"){
               if(td.textContent == "Pending"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(comp == "accepted"){
               if(td.textContent == "Accepted"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(comp == "rejected"){
               if(td.textContent == "Rejected"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(comp == "contains"){
               if(td.textContent.includes(input)){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(comp == "starts-with"){
               if(td.textContent.startsWith(input[0])){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }


           }




       } //end of first if statement
         else{
           // alert("no match!");
         }





     } //end of first for loop


   } //end of function filter()

   //ignore this for now

   function sizeFilter() {
// Declare variables
var input, filter, table, tr, td, i, e, j;
e = document.getElementById("user-input");
// input = e.options[e.selectedIndex].value;
input = e.value;

table = document.getElementById("team-apps");
tr = table.getElementsByTagName("tr");
td = tr.getElementsByTagName("td");

// Loop through all table rows, and hide those who don't match the search query
for (i = 0; i < tr.length; i++) {
  for(j= 0; i < tr.length; j++ ){
    td = tr[i].getElementsByTagName("td")[j];
  if (td) {
    if (td.textContent.indexOf(input) > -1) {
      tr[i].style.display = ""; //show row
    } else {
      tr[i].style.display = "none";
    }
  }
}
}
}

// function addFilter(){
//
// }
//
// $(document).ready(function rowPerPage(){
//   var r, numTrShown;
//   r = document.getElementById("showNumRows");
//   numTrShown = r.options[r.selectedIndex].value;
//   if(numTrShown == 10){
//
//
//   }
// });

// Dynamically change comparison filter drop-down options based on the selected column filter drop-down option
function getColFilterOp(){
  var col = document.getElementById("select-filter");
  var colSelected = col.options[col.selectedIndex].value;
  return colSelected;
  // alert(colSelected) --works;
}

function getCompFilterOp(){
  var comp = document.getElementById("comparison");
  var compSelected = comp.options[comp.selectedIndex].value;
  return compSelected;
}

//Not working
// function hideInputTextbox(){
//   if(getCompFilterOp() == "Status"){
//     // $("input#user-input").remove();
//     document.getElementById("#user-inpupt").style.display = "none";
//   }else{
//     // $("input#user-input").append();
//     document.getElementById("#user-input").style.display = "block";
//   }
// }

var $ = jQuery;
$(document).ready(function(){
  function changeCompFilter(){
    var i;
    var col = document.getElementById("select-filter");
    // for(var i=0; i < col.length; i++){
      if(getColFilterOp() == "Date Submitted"){
        // alert('Date Submitted was selected');
       // col.options[col.options.length]=new Option("On", "on");
       $("#comparison").append('<option value="on">On</option>');
       $("#comparison").append('<option value="after">After</option>');
       $("#comparison").append('<option value="before">Before</option>');
       $("#comparison").append('<option value="between">Between</option>');
     }else{
       // alert("Date Submitted was not selected");
       $("#comparison option[value='on']").remove();
       $("#comparison option[value='after']").remove();
       $("#comparison option[value='before']").remove();
       $("#comparison option[value='between']").remove();
       // $("#comparison").remove('<option value="on">On</option>');
       // $("#comparison").remove('<option value="after">After</option>');
       // $("#comparison").remove('<option value="before">Before</option>');
       // $("#comparison").remove('<option value="between">Between</option>');
     }
     if(getColFilterOp() == "Team Name" || getColFilterOp() == "Problem Statement"){
       $("#comparison").append('<option value="matches">Matches</option>');
       $("#comparison").append('<option value="contains">Contains</option>');
       $("#comparison").append('<option value="starts-with">Starts with</option>');
     } else{
       $("#comparison option[value='matches']").remove();
       $("#comparison option[value='contains']").remove();
       $("#comparison option[value='starts-with']").remove();
     }
     if(getColFilterOp() == "Status"){
       $("#comparison").append('<option value="pending">Pending</option>');
       $("#comparison").append('<option value="accepted">Accepted</option>');
       $("#comparison").append('<option value="rejected">Rejected</option>');
     } else{
       $("#comparison option[value='pending']").remove();
       $("#comparison option[value='accepted']").remove();
       $("#comparison option[value='rejected']").remove();
     }
     if(getColFilterOp() == "Size"){
       $("#comparison").append('<option value="equals">Equals</option>');
       $("#comparison").append('<option value="greater-than">Greater than</option>');
       $("#comparison").append('<option value="less-than">Less than</option>');
     } else{
       $("#comparison option[value='equals']").remove();
       $("#comparison option[value='greater-than']").remove();
       $("#comparison option[value='less-than']").remove();
     }
    // }
  }
  $("#select-filter").on("change", changeCompFilter);
  changeCompFilter();
  $('#submit-filter').on("click", filter);
  filter();
  // $("#select-filter").on("change", hideInputTextbox);
  // hideInputTextbox();

});
