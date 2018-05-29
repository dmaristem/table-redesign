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

//Get the values of all the select column drop down menus
// function getSelVal(){
//   var arr;
//   arr = $('select.select-class').map(function(){
//     return this.value;
//   });
// }

// function getSelVal(){
//   var arr = [];
//    $('.select-class option:selected').each(function(){
//    return this.value;
//   });
// }

//Get the id of the select form
// function getId(){
//   var id;
//   $(".select-class").each(function(n){
//   id = $(this).attr("id");
//   return id;
// });
// }

//
// function getCompVal(){
//   var id, compVal;
//   $(".filter-row").each(function(m){
//     id = $(this).find("select")[1].attr("id");
//     compVal = $("#" + id + " :selected").val();
//     return compVal;
//   });
// }

//use getElementsByClassName to get the value of the selected option in the column drop-down
// function useClass(){
//   var c, selected;
//   c = document.getElementsByClassName("select-class");
//   console.log(c);
//   selected = c.options[selected.selectedIndex].value;
//   return selected;
// }
// useClass();


//Functioning ones
  //Get the value of the selected filter column option
  // function getSel(){
  //   var f, selectedInp;
  //   //Select the select drop-down menu
  //   f = document.getElementById("select-filter");
  //    //Get the option that was selected in the drop-down menu
  //   selectedInp = f.options[f.selectedIndex].value;
  //   return selectedInp;
  // }

  //Get the value of the comparison filter select option
  // function getComp(){
  //   var c, comp;
  //   c = document.getElementById("comparison");
  //   comp = c.options[c.selectedIndex].value;
  //   return comp;
  // }




// Dynamically change comparison filter drop-down options based on the selected column filter drop-down option
  function changeCompFilter(){
    alert('changeCompFilter firing');
    var selArr = [];
    var cArr = [];
    var i, id, f, cid, selVal, opLen;
    //get selected value of first select forms
    $(".select-class").each(function(n){
    id = $(this).attr("id").toString();
      f = document.getElementById(id);
      selVal = f.options[f.selectedIndex].value;
      selArr.push(selVal);
    });
    console.log("This is the selected array: " + selArr);

    //get id of second select forms
    $(".comparison-class").each(function(m){
      cid = $(this).attr("id").toString();
      cArr.push(cid);
    });
    console.log("This is the comparison id array: " + cArr);



    for(i = 0; i < selArr.length; i++){
      //length of comparison select form (number of option elements)
      opLen = document.getElementById(cArr[i]).length;
      if(selArr[i] == "Date Submitted" && opLen!== 4){
        console.log(selArr[i]);
        alert('appending' + i);
         console.log(cArr[i]);
       $("#" + cArr[i]).append('<option value="on">On</option>');
       $("#" + cArr[i]).append('<option value="after">After</option>');
       $("#" + cArr[i]).append('<option value="before">Before</option>');
       $("#" + cArr[i]).append('<option value="between">Between</option>');
       console.log("append on " + cArr[i] + " should have worked");
     }
     else{
       alert("first select option is not Date Submitted" + i);
       console.log(selArr[i]);
       console.log(cArr[i]);
       // $("#" + cArr[i]).empty();
       $("#" + cArr[i] + "option[value='on']").remove();
       $("#" + cArr[i] + "option[value='after']").remove();
       $("#" + cArr[i] + "option[value='before']").remove();
       $("#" + cArr[i] + "option[value='between']").remove();
       console.log("remove on " + cArr[i] + " should have worked");
     }
     if((selArr[i] == "Team Name" && opLen!== 3) || (selArr[i] == "Problem Statement" && opLen!== 3)){
       alert('first select option is Team Name or Problem Statement' + i);
       console.log(cArr[i]);
       $("#" + cArr[i]).append('<option value="matches">Matches</option>');
       $("#" + cArr[i]).append('<option value="contains">Contains</option>');
       $("#" + cArr[i]).append('<option value="starts-with">Starts with</option>');
     } else{
       alert('first select option is not Team Name or Problem Statement' + i);
       $("#" + cArr[i] + "option[value='matches']").remove();
       $("#" + cArr[i] + "option[value='contains']").remove();
       $("#" + cArr[i] + "option[value='starts-with']").remove();
       // $("#" + cArr[i]).empty();
     }
      if(selArr[i] == "Status" && opLen!== 3){
        alert('status ' + i);
        console.log(cArr[i]);
       $("#" + cArr[i]).append('<option value="pending">Pending</option>');
       $("#" + cArr[i]).append('<option value="accepted">Accepted</option>');
       $("#" + cArr[i]).append('<option value="rejected">Rejected</option>');
     } else{
       alert('not status ' + i);
       // $("#" + cArr[i]).empty();
       $("#" + cArr[i] + "option[value='pending']").remove();
       $("#" + cArr[i] + "option[value='accepted']").remove();
       $("#" + cArr[i] + "option[value='rejected']").remove();
     }
    if(selArr[i] == "Size" && opLen!== 3){
       alert('size ' + i);
       console.log(cArr[i]);
       $("#" + cArr[i]).append('<option value="equals">Equals</option>');
       $("#" + cArr[i]).append('<option value="greater-than">Greater than</option>');
       $("#" + cArr[i]).append('<option value="less-than">Less than</option>');
     } else{
       alert('not size' + i);
       // $("#" + cArr[i]).empty();
       $("#" + cArr[i] + "option[value='equals']").remove();
       $("#" + cArr[i] + "option[value='greater-than']").remove();
       $("#" + cArr[i] + "option[value='less-than']").remove();
     }
   } //end of first for loop
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


 function getSel(){
   var selArr = [];
   var id, f, selVal;
   $(".select-class").each(function(n){
   id = $(this).attr("id").toString();
   console.log("id is: " + id);
   // $(".filter-row").each(function(n){
     // id = $(this).find("select").attr("id");
     // console.log(id);  get select-filter, select-filter-2, select-filter-3
     // selVal = $("#" + id + " :selected").val();
    // $(".select-class").each(function(n){
     // f = document.getElementById(getId());
     f = document.getElementById(id);
     console.log("getElementById is" + f);
      //Get the option that was selected in the drop-down menu
     selVal = f.options[f.selectedIndex].value;
     selArr.push(selVal);
     console.log("selected value is " +selVal);
     console.log("n is " + n);
     return selVal;
   });
console.log(selArr);
 }

 function getComp(){
   var id, compVal, c;
   $(".comparison-class").each(function(n){
     alert("getComp function is running");
   id = $(this).attr("id");
   console.log("this is id: " + id);
   c = document.getElementById(id);
   console.log("this is element selected: " + c);
   compVal = c.options[c.selectedIndex].value;
   console.log(compVal);
   return compVal;
 });
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

 $("#filter").on("load", getModal);
 getModal();
 // $('#select-filter').on("change", getSel);
 // getSel();
  $(".select-class").change(changeCompFilter);
  // changeCompFilter();
  // $('#submit-filter').on("click", filter);
  // filter();

  // $('#select-filter').on("change", getCompVal);
  // getCompVal();
  // $("#select-filter").on("change", hideInputTextbox);
  // hideInputTextbox();

});
