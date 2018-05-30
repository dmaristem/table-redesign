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
return selArr; //outside the each() TO GET JUST ONE FINAL ARRAY
}

//get id of second select forms
function getCompArr(){
  var cid;
  var cArr = [];
  $(".comparison-class").each(function(m){
    cid = $(this).attr("id").toString();
    cArr.push(cid);
  });
  return cArr;
}

// Dynamically change comparison filter drop-down options based on the selected column filter drop-down option
  function changeCompFilter(){
    var selArr = getSelArr();
    var cArr = getCompArr();
    var i, opLen;

    // console.log('selArr Length',getSelArr());
    for(i = 0; i < selArr.length; i++){
      //change of selection on the same select form will empty the comparison select options
      $("#" + cArr[i]).empty();

      //length of comparison select form (number of option elements)
      opLen = document.getElementById(cArr[i]).length;
      if(selArr[i] == "Date Submitted"){
       $("#" + cArr[i]).append('<option value="on">On</option>');
       $("#" + cArr[i]).append('<option value="after">After</option>');
       $("#" + cArr[i]).append('<option value="before">Before</option>');
       $("#" + cArr[i]).append('<option value="between">Between</option>');
     }
     else if(selArr[i] == "Team Name" || selArr[i] == "Problem Statement"){
       $("#" + cArr[i]).append('<option value="matches">Matches</option>');
       $("#" + cArr[i]).append('<option value="contains">Contains</option>');
       $("#" + cArr[i]).append('<option value="starts-with">Starts with</option>');
     } else if(selArr[i] == "Status"){
       $("#" + cArr[i]).append('<option value="pending">Pending</option>');
       $("#" + cArr[i]).append('<option value="accepted">Accepted</option>');
       $("#" + cArr[i]).append('<option value="rejected">Rejected</option>');
     } else if(selArr[i] == "Size"){
       $("#" + cArr[i]).append('<option value="equals">Equals</option>');
       $("#" + cArr[i]).append('<option value="greater-than">Greater than</option>');
       $("#" + cArr[i]).append('<option value="less-than">Less than</option>');
     }
   } //end of for loop
  }

  function filter(){
    alert('filter is firing');
    var table, input, firstRow, header, i, j, k, numCells, numRows, tr, td;

   //Select the table
   table = document.getElementById("team-apps");

   //Select the first row of the table
   // firstRow = table.getElementsByTagName("tr")[0]; //use next line instead
   firstRow = table.rows[0];

   //Count the number of cells in the first row
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

   //Loop through the header cells of the header row
    for(i=0; i<numCells; i++){
      // console.log(header[i].innerHTML); //log the text in cell

       //If the selected option matches the header name
       if(getSel()[i] == header[i].textContent){
       alert('getSel matches a header data');
        //numRows - 1 because we're not counting the footer row
         for(j=1; j<=numRows-1; j++){
             tr = table.rows[j];

             //col number stays fixed --> i is fixed
             td = tr.cells[i];


             //Comparison options
             if(getComp() == "equals" || getComp() == "matches" || getComp() == "on"){
               if (td.textContent == input){
               tr.style.display = "";
              } else{
                tr.style.display = "none";
              }
            }else if(getComp() == "greater-than"){
              if (td.textContent > input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getComp() == "less-than"){
              if (td.textContent < input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getComp() == "Not equal to"){
              if (td.textContent !== input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getComp() == "pending"){
             if(td.textContent == "Pending"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getComp() == "accepted"){
             if(td.textContent == "Accepted"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getComp() == "rejected"){
             if(td.textContent == "Rejected"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getComp() == "contains"){
             if(td.textContent.includes(input)){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getComp() == "starts-with"){
             if(td.textContent.startsWith(input[0])){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }

         }//end of second for loop

     } //end of first if statement
       else{
         // alert("no match!");
       }
   } //end of first for loop
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
  // $('#submit-filter').on("click", filter);
  // filter();

});
