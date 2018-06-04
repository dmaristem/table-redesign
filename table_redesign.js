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
      "Problem Statement": ["Matches", "Contains", "Starts with"],
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

 // function findCopies(){
 //
 // }
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
        console.log(saveRow);


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

//   function filter(){
//     alert('filter is firing');
//     var table, input, firstRow, header, i, j, k, n, p,f,g, numCells, numRows, tr, td;
//     // var saveK=[];
//     var saveK;
//     // var kVal = [];
//
//     // var noRepl = [];
//     // var compArr = ["On", "After", "Before", "Between", "Matches", "Contains", "Starts with",
//     // "Pending", "Accepted", "Rejected", "Cohort 2017", "Cohort 2018", "Cohort 2019",
//     // "Equals", "Greater than", "Less than"];
//     var compVal = getCompArr();
//     console.log("compVal is: " + compVal);
//     var selVal = getSelArr();
//     console.log("selVal is: " + selVal);
//     var inputArr = getInputArr();
//    //Select the table
//    table = document.getElementById("team-apps");
//
//    //Select the first row of the table
//    // firstRow = table.getElementsByTagName("tr")[0]; //use next line instead
//    firstRow = table.rows[0];
//
//    //Count the number of cells in the first row (length of header row)
//    numCells = firstRow.cells.length;
//
//    //Select the table header cells
//    header = firstRow.getElementsByTagName("th");
//    // header = firstRow;
//
//    //Get the value of the user input
//    input = document.getElementById("user-input").value;
//    // console.log(input);
//
//    //Count the number of rows in the table
//    numRows = table.rows.length - 1;
//    // rows = table.getElementsByTagName('tbody')[0].rows.length;    also works in lieu of previous line
//
//
//    //loop through the header row
//     for(i=0;i<numCells;i++){
//       // saveK.push(saveK);
//       //Loop through the selected values of the first selected forms
//        for(j=0; j<selVal.length; j++){ //selArr not defined
//        //If the selected value matches the header name
//        if(header[i].textContent == selVal[j]){
//        alert('getSel matches a header data');
//         //numRows - 1 because we're not counting the footer row
//         //go into the specific data cell
//
//          saveK = [];
//          for(k=1; k<=numRows-1; k++){
//              tr = table.rows[k];
//              td = tr.cells[i]; //rows of that column
//
//              //loop through the length of the array with selected comparison values
//              // for(n=0;n<compVal.length;n++){
//
//                //Comparison options
//                if((compVal[j] == "Equals" || compVal[j] == "Matches" || compVal[j] == "On") && (td.textContent == inputArr[j])){
//                 saveK.push(k);
//               }else if((compVal[j] == "Greater than") && (td.textContent > inputArr[j])){
//                 saveK.push(k);
//              }else if((compVal[j] == "Less than") &&(td.textContent < inputArr[j])) {
//                 saveK.push(k);
//              }else if((compVal[j] == "Not equal to") && (td.textContent !== inputArr[j])){
//                 saveK.push(k);
//              }else if((compVal[j] == "Pending") && (td.textContent == "Pending")){
//                  saveK.push(k);
//              }else if((compVal[j] == "Accepted") && (td.textContent == "Accepted")){
//                  saveK.push(k);
//              }else if((compVal[j] == "Rejected") && (td.textContent == "Rejected")){
//                  saveK.push(k);
//              }else if((compVal[j] == "Contains") && (td.textContent.includes(inputArr[j]))){
//                  saveK.push(k);
//              }else if((compVal[j] == "Starts with") && (td.textContent.startsWith(inputArr[j][0]))){
//                  saveK.push(k);
//              }else{
//                  tr.style.display = "none";
//              }
//
//
//            // }
//            console.log(saveK);
//
//          } //end of k for loop
//
//           var kVal = [];
//          //loop through the array that holds the row numbers (k) whose values matched input values
//          for(f=0;f<saveK.length;f++){
//            var replVal = [];
//            var gVal = [];
//            // var kVal = [];
//
//            for(g=f+1;g<saveK.length-1;g++){
//              if(saveK[f] == saveK[g]){
//                replVal.push(saveK[g]); //array with all replicated values except the original
//                //get the indice of all replicates for one f loop, except the original
//                gVal.push(g);
//              }
//              if(saveK[f] == saveK[g] && g == saveK.length - 2){
//                replVal.push(saveK[f]);
//                kVal.push(saveK[f]); //k values for hiding/showing table rows
//              }
//
//            }//end of g for loop
//
//           //   if(saveK[f] == saveK[g]){ //PROBLEM - out of the g for loop
//           //   // gVal.push(f); //don't include this; gVal shouldn't have the index of the original value (that has replicates)
//           //   replVal.push(saveK[f]);
//           //   kVal.push(saveK[f]); //k values for hiding/showing table rows
//           // }
//
//            //hide or display rows
//            if(replVal.length == selVal().length){  // the +1 is an issue; if saveK[f] !== saveK[g] and getSelArr().length = 1,
//              //then this if statement would run despite not actually fulfilling the condition; WAIT NO
//              //if savek[f] !== saveK[g], then the g for loop would run again, and the if statement would run again
//              for(m=0;m<kVal.length;m++){
//                tr = table.rows[kVal[m]];
//                tr.style.display = "";
//                }
//              }
//
//            //gets rid of all the replicates (after the original) in saveK ***********************
//            for(h=0;h<gVal.length;h++){
//              saveK.splice(gVal[h], 1);
//            }
//
//            console.log("saveK spliced is: " + saveK);
//
//
//          } //end of f for loop
//
//      } //end of first if statement
//
//   }//end of j for loop
// }//end of i for loop
//  } //end of function filter()

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
  $('#submit-filter').click(filterSearch);
  // $('#submit-filter').click(getCompArr);
  // $('#submit-filter').click(getInputArr);

});
