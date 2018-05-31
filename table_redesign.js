var $ = jQuery;
$(document).ready(function(){

  //Filter Modal
    function getModal(){
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
  }

//get selected values array of first select forms
function getSelArr(){
  var selArr = [];
  var id, f, selVal;
  $(".select-class").each(function(n){
  id = $(this).attr("id").toString();
    f = document.getElementById(id);
    selVal = f.options[f.selectedIndex].value;
    selArr.push(selVal);
});
// console.log(selArr);
return selArr; //outside the each() TO GET JUST ONE FINAL ARRAY
}

//get an array of all the IDs of the second select forms
function getIdArr(){
  var cid;
  var cArr = [];
  $(".comparison-class").each(function(m){
    cid = $(this).attr("id").toString();
    cArr.push(cid);
  });
  return cArr;
}

//get selected comparison values array of second select forms
function getCompArr(){
  alert('getCompArr is firing');
  var cId, c, cVal;
  var cArray = [];
  $(".comparison-class").each(function(m){
    cId = $(this).attr("id").toString();
    c = document.getElementById(cId);
    cVal = c.options[c.selectedIndex].value;
    // console.log(cVal); //logs
    cArray.push(cVal);
    // console.log(cArray);
  });
  console.log(cArray);
  return cArray;
}

//get input values in the form of an array (3rd column in filter modal content)
function getInputArr(){
  alert("getInputId is firing");
  var inpId, iVal;
  var iArray = [];
  $(".input-class").each(function(p){
    inpId = $(this).attr("id").toString();
    // console.log("inpId is: " + inpId);
    iVal = document.getElementById(inpId).value;
    // console.log("iVal is: " + iVal);
    iArray.push(iVal);
    // console.log(iArray);
  });
  console.log(iArray);
  return iArray;
}


// Dynamically change comparison filter drop-down options based on the selected column filter drop-down option
  function changeCompFilter(){
    var selArr = getSelArr();
    var cArr = getIdArr();
    var i,j,k, size, secondSel;
    var filter = {
      "Date Submitted": ["On", "After", "Before", "Between"],
      "Team Name": ["Matches", "Contains", "Starts with"],
      "Status": ["Pending", "Accepted", "Rejected"],
      "Cohort": ["Cohort 2017", "Cohort 2018", "Cohort 2019"],
      "Problem Statement": ["Matches", "Contains", "Starts with"],
      "Size": ["Equals", "Greater than", "Less than"]
    }
    var filterArr = Object.keys(filter); //["Date Submitted", "Team Name", "Status", ...]
    var filterArrVal = Object.values(filter);//[["On", "After", ...], ["Matches", "Contains", ...]...]
    size = Object.keys(filter).length;

    //loop through the selected values in the first select forms
    for(i = 0; i < selArr.length; i++){
      secondSel = $("#" + cArr[i]);
      //change of selection on the same select form will empty the comparison select options
      $("#" + cArr[i]).empty();

      //loop through the object
      for(j=0; j<size;j++){
       if(selArr[i] == filterArr[j] ){
         for(k=0;k<filterArrVal[j].length;k++){ //filterArrVal[j] gets an array;length of array
         secondSel.append('<option>' +filterArrVal[j][k] + '</option>'); //[j][k] gets the values of an array in filterArrVal
         }
       }else{
         // console.log("second for loop didn't run");
        }
     }
   }
 }

  function filter(){
    alert('filter is firing');
    var table, input, firstRow, header, i, j, k, numCells, numRows, tr, td;
    // var compArr = ["On", "After", "Before", "Between", "Matches", "Contains", "Starts with",
    // "Pending", "Accepted", "Rejected", "Cohort 2017", "Cohort 2018", "Cohort 2019",
    // "Equals", "Greater than", "Less than"];
    var compVal = getCompArr();
    console.log("compVal is: " + compVal);
    var selVal = getSelArr();
    console.log("selVal is: " + selVal);
    var inputArr = getInputArr();
   //Select the table
   table = document.getElementById("team-apps");

   //Select the first row of the table
   // firstRow = table.getElementsByTagName("tr")[0]; //use next line instead
   firstRow = table.rows[0];

   //Count the number of cells in the first row (length of header row)
   numCells = firstRow.cells.length;

   //Select the table header cells
   header = firstRow.getElementsByTagName("th");
   // header = firstRow;

   //Get the value of the user input
   input = document.getElementById("user-input").value;
   // console.log(input);

   //Count the number of rows in the table
   numRows = table.rows.length - 1;
   // rows = table.getElementsByTagName('tbody')[0].rows.length;    also works in lieu of previous line

   //loop through the header row
    for(i=0;i<numCells;i++){
      //Loop through the selected values of the first selected forms
       for(j=0; j<selVal.length; j++){ //selArr not defined
       //If the selected value matches the header name
       if(header[i].textContent == selVal[j]){
       alert('getSel matches a header data');
        //numRows - 1 because we're not counting the footer row
        //go into the specific data cell
         for(k=1; k<=numRows-1; k++){
             tr = table.rows[k];
             // console.log("tr is: " + tr.textContent);
             td = tr.cells[i]; //rows of that column
             // console.log("td is: " + td.textContent);

             //loop through the length of the array with selected comparison values
             for(n=0;n<compVal.length;n++){
               console.log("this is is n: " + n);
               //Comparison options
               if(compVal[n] == "Equals" || compVal[n] == "Matches" || compVal[n] == "On"){
                 if (td.textContent == inputArr[n]){
                   console.log("inputArr[n] is: " + inputArr[n] + " n is: " + n);
                 tr.style.display = "";
                } else{
                  tr.style.display = "none";
                }
              }else if(compVal[n] == "Greater than"){
                console.log("inputArr[n] is: " + inputArr[n] + " n is: " + n);
                if (td.textContent > inputArr[n]) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Less than"){
                if (td.textContent < inputArr[n]) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Not equal to"){
                if (td.textContent !== inputArr[n]) {
                tr.style.display = "";
               } else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Pending"){
               if(td.textContent == "Pending"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Accepted"){
               if(td.textContent == "Accepted"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Rejected"){
               if(td.textContent == "Rejected"){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Contains"){
               if(td.textContent.includes(inputArr[n])){
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }else if(compVal[n] == "Starts with"){
               if(td.textContent.startsWith(inputArr[n][0])){
                 // alert(inputArr[n][0]);
                 console.log("inputArr[n] is: " + inputArr[n] + " n is: " + n);
                 tr.style.display = "";
               }else{
                 tr.style.display = "none";
               }
             }


           }//end of fourth for loop
         } //end of third for loop

     } //end of first if statement
       else{
         // alert("no match!");
       }

  }//end of second for loop
 }//end of first for loop
 } //end of function filter()

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

 $("#filter").on("load", getModal);
 getModal();
  $(".select-class").change(changeCompFilter);
  $('#submit-filter').click(filter);
  // $('#submit-filter').click(getCompArr);
  // $('#submit-filter').click(getInputArr);

});
