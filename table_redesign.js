var $ = jQuery;
$(document).ready(function(){

  //color rows if checkbox is checked
  function checkRows(){
    // $('tr').not('thead tr').is(":checked") ? $('tr').addClass("color") :$('tr').removeClass("color");
    var $tr = $(this).closest("tr").not('thead tr');
    // var header = document.getElementById('table-head');

    $(this).is(":checked") ? $tr.addClass("color") :$tr.removeClass("color");

  }


  // function countCheckboxes(){
  //   var $tr = $(this).closest("tr").not("thead tr");
  //   if($(this).is(':checked')){
  //     var i += 0;
  //     $('#count-checkboxes').text("Selected: " + i);
  //   }
  // }

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
  // alert('getCompArr is firing');
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
  // console.log(cArray);
  return cArray;
}

//get input values in the form of an array (3rd column in filter modal content)
function getInputArr(){
  // alert("getInputId is firing");
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
  // console.log(iArray);
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
      // "Problem Statement": ["Matches", "Contains", "Starts with"],
      "Size": ["Equals", "Greater than", "Less than"]
    }
    var filterArr = Object.keys(filter); //["Date Submitted", "Team Name", "Status", ...]
    var filterArrVal = Object.values(filter);//[["On", "After", ...], ["Matches", "Contains", ...]...]
    size = Object.keys(filter).length;
    // secondSel = $("#" + cArr[i]);

    //loop through the selected values in the first select forms
    for(i = 0; i < selArr.length; i++){
      secondSel = $("#" + cArr[i]);
      //change of selection on the same select form will empty the comparison select options
      secondSel.empty();

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


function filterSearch(){
  var compVal = getCompArr();
  var selVal = getSelArr();
  var inputArr = getInputArr();

  //Select the table
  var table = document.getElementById("team-apps");

  //Select the first row of the table
  // firstRow = table.getElementsByTagName("tr")[0]; //use next line instead
  var firstRow = table.rows[0];

  //Count the number of cells in the first row (length of header row)
  var numCells = firstRow.cells.length;

  //Select the table header cells
  var header = firstRow.getElementsByTagName("th");
  // header = firstRow;

  //Count the number of rows in the table
  var numRows = table.rows.length - 1;

  var i, j, k, td, tr, saveRow;

  // loop through each row in the table
  //start i at 1 bc we're skipping the header row
  // numRows - 1 bc we're skipping the footer row - NVM, remove the -1
  for(i=1; i<numRows; i++){
    console.log("i for loop running " + i + " times");
    tr = table.rows[i];
    //for each row, loop through each data cell (loop through column)
    //start j at 2 because we're skipping the column with checkbox and ID
    saveRow = [];
    for(j=2;j<numCells;j++){
      console.log("j for loop running " + j + " times");
      td = tr.cells[j];
      for(k=0;k<selVal.length;k++){
        console.log("k for loop running " + k + " times");
        if(header[j].textContent == selVal[k]){
        console.log("textContent == selVal[k]");
          //Comparison options
          if((compVal[k] == "Matches" || compVal[k] == "On") && (td.textContent == inputArr[k])){
           saveRow.push(i);
         }else if((compVal[k] == "Equals") && (Number(td.textContent) == Number(inputArr[k]))){
            saveRow.push(i);
          }else if((compVal[k] == "Greater than") && (Number(td.textContent) > Number(inputArr[k]))){
            saveRow.push(i);
        }else if((compVal[k] == "Less than") &&(Number(td.textContent) < Number(inputArr[k]))) {
           saveRow.push(i);
        }else if((compVal[k] == "Not equal to") && (Number(td.textContent) !== Number(inputArr[k]))){
           saveRow.push(i);
        }else if((compVal[k] == "Pending") && (td.textContent == "Pending")){
            saveRow.push(i);
        }else if((compVal[k] == "Accepted") && (td.textContent == "Accepted")){
            saveRow.push(i);
        }else if((compVal[k] == "Rejected") && (td.textContent == "Rejected")){
            saveRow.push(i);
        }else if((compVal[k] == "Contains") && (td.textContent.includes(inputArr[k]))){
            saveRow.push(i);
        }else if((compVal[k] == "Starts with") && (td.textContent.startsWith(inputArr[k][0]))){
            saveRow.push(i);
         }
        //else{
        //     tr.style.display = "none";
        // }
        // console.log(saveRow);


        }//end of if statement inside k for loop
      }//end of k for loop
     if(saveRow.length == selVal.length){
        tr.style.display = "";
     }else{
       tr.style.display = "none";
     }
    }//end of j for loop
  }// end of i for loop

}//end of function filterSearch()



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

function countChecks(){
  alert('countChecks is running');
  var table = document.getElementById("team-apps");
  //Select the first column of the table
  var checkBoxCol = table.rows[0];
  //Count the number of rows in the table
  var numRows = table.rows.length - 1;
  var i;
  var j = [];
  //Loop through the rows of the first column
  for(i=1; i<numRows; i++){
    // if($(checkBoxCol.cells[i]).is(':checked')){
    if($('.checkbox').prop("checked")){
        j.push(1);
    }
  }
  console.log(j);
  return $('#count-checkboxes').text("Selected: " + j.length);

}

//selecting and deselecting all checkboxes
 function checkBoxes(){
   var result;
   var header = $("#header-checkbox").is(':checked');
   var numVisRows = $('tr:visible').length - 1;
   if(header){
     //i starts at 1 to not count header row
     for(i=1; i<numVisRows; i++){
       $('.checkbox').prop('checked', true);
     }
   }else{
     for(i=1; i<numVisRows; i++){
       $('.checkbox').prop('checked', false);
     }
   }
 }

// function countSelChecks(){
//   alert('countSelChecks is running!');
//   var i;
//   var numChecked = 0;
//   var numVisRows = $('tr:visible').length - 1;
//   // var checkBox = document.getElementById('')
//   for(i=1; i<numVisRows; i++){
//     if($('.checkbox').prop("checked")){
//       // alert('if statement is running');
//       numChecked++;
//     }
//   //   // else{
//   //   //   numChecked--;
//   //   // }
//    }
//    return $('#count-checkboxes').text("Selected: " + numChecked);
// }

//WORKING - count the number of checked boxes
function countSelChecks(){
  alert('countSelChecks is running!');
  var i;
  var numVisRows = $('tr:visible').length - 1;
  var numChecked = $("input.checkbox:checked").length;
  var header = $("#header-checkbox").is(':checked');
   if(header){
     numChecked = $("input.checkbox:checked").length-1; 
   }
    // if($('.checkbox').prop("checked")){
    //
    // }
   return $('#count-checkboxes').text("Selected: " + numChecked);
}

function countResults(){
  // alert("countResults is firing");
  var i, result;
  //Select the table
  // var table = document.getElementById("team-apps");
  //Count the number of rows in the table; -1 bc skipping the header
  var numVisRows = $('tr:visible').length - 1;
  //i starts at 1 to not count header row
  for(i=1; i<numVisRows; i++){
    result = i;
  }
  console.log(result);
return $('#x-results').text("Showing " + result + " results.");
}

$('input[type=checkbox]').on('change', checkRows);
 $("#filter").on("load", getModal);
 getModal();
 $('#x-results').on("load", countResults);
 countResults();
  $(".select-class").change(changeCompFilter);
  $('#submit-filter').click(filterSearch);
  $('#submit-filter').click(countResults);
  $('#header-checkbox').click(checkBoxes);
  $('.checkbox').change(countSelChecks);

// $('.checkbox').change(countChecks);
  // $(".checkbox").change(function(){
  //   var numChecked = 0;
  //
  //   if(this.checked){
  //     numChecked ++;
  //   }
  //    return $('#count-checkboxes').text("Selected: " + numChecked);
  // });



});
