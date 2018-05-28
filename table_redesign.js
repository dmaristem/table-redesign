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

 function getSelVal(){
   var id, selVal;
   $(".filter-row").each(function(n){
     id = $(this).find("select").attr("id");
     if(id){
     selVal = $("#" + id + ":selected").val();
     return selVal;
    }
   });
 }
//
function getCompVal(){
  var id, compVal;
  $(".filter-row").each(function(m){
    id = $(this).find("select")[1].attr("id");
    compVal = $("#" + id + " :selected").val();
    return compVal;
  });
}
  //Get the value of the selected filter column option
  function getSel(){
    var f, selectedInp;
    //Select the select drop-down menu
    f = document.getElementById("select-filter");
     //Get the option that was selected in the drop-down menu
    selectedInp = f.options[f.selectedIndex].value;
    return selectedInp;
  }

  //Get the value of the comparison filter select option
  function getComp(){
    var c, comp;
    c = document.getElementById("comparison");
    comp = c.options[c.selectedIndex].value;
    return comp;
  }


// Dynamically change comparison filter drop-down options based on the selected column filter drop-down option
  function changeCompFilter(){
    alert('changeCompFilter firing');
    alert(getSelVal());
      if(getSelVal() == "Date Submitted"){
       // col.options[col.options.length]=new Option("On", "on");
       $("#comparison").append('<option value="on">On</option>');
       $("#comparison").append('<option value="after">After</option>');
       $("#comparison").append('<option value="before">Before</option>');
       $("#comparison").append('<option value="between">Between</option>');
     }else{
       $("#comparison option[value='on']").remove();
       $("#comparison option[value='after']").remove();
       $("#comparison option[value='before']").remove();
       $("#comparison option[value='between']").remove();
       // $("#comparison").remove('<option value="on">On</option>');
       // $("#comparison").remove('<option value="after">After</option>');
       // $("#comparison").remove('<option value="before">Before</option>');
       // $("#comparison").remove('<option value="between">Between</option>');
     }
     if(getSelVal() == "Team Name" || getSelVal() == "Problem Statement"){
       $("#comparison").append('<option value="matches">Matches</option>');
       $("#comparison").append('<option value="contains">Contains</option>');
       $("#comparison").append('<option value="starts-with">Starts with</option>');
     } else{
       $("#comparison option[value='matches']").remove();
       $("#comparison option[value='contains']").remove();
       $("#comparison option[value='starts-with']").remove();
     }
     if(getSelVal() == "Status"){
       $("#comparison").append('<option value="pending">Pending</option>');
       $("#comparison").append('<option value="accepted">Accepted</option>');
       $("#comparison").append('<option value="rejected">Rejected</option>');
     } else{
       $("#comparison option[value='pending']").remove();
       $("#comparison option[value='accepted']").remove();
       $("#comparison option[value='rejected']").remove();
     }
     if(getSelVal() == "Size"){
       $("#comparison").append('<option value="equals">Equals</option>');
       $("#comparison").append('<option value="greater-than">Greater than</option>');
       $("#comparison").append('<option value="less-than">Less than</option>');
     } else{
       $("#comparison option[value='equals']").remove();
       $("#comparison option[value='greater-than']").remove();
       $("#comparison option[value='less-than']").remove();
     }
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
   console.log(input);

   //Count the number of rows in the table
   numRows = table.rows.length - 1;
   // rows = table.getElementsByTagName('tbody')[0].rows.length;    also works in lieu of previous line

   //Loop through the header cells of the header row
    for(i=0; i<numCells; i++){
      // console.log(header[i].innerHTML); //log the text in cell
       //If the selected option matches the header name
       if(getSelVal() == header[i].textContent){

        //numRows - 1 because we're not counting the footer row
         for(j=1; j<=numRows-1; j++){
             tr = table.rows[j];

             //col number stays fixed --> i is fixed
             td = tr.cells[i];


             //Comparison options
             if(getCompVal() == "equals" || getCompVal() == "matches"){
               if (td.textContent == input){
               tr.style.display = "";
              } else{
                tr.style.display = "none";
              }
            }else if(getCompVal() == "greater-than"){
              if (td.textContent > input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "less-than"){
              if (td.textContent < input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "Not equal to"){
              if (td.textContent !== input) {
              tr.style.display = "";
             } else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "pending"){
             if(td.textContent == "Pending"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "accepted"){
             if(td.textContent == "Accepted"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "rejected"){
             if(td.textContent == "Rejected"){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "contains"){
             if(td.textContent.includes(input)){
               tr.style.display = "";
             }else{
               tr.style.display = "none";
             }
           }else if(getCompVal() == "starts-with"){
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

 $("#filter").on("click", getModal);
 getModal();
  $("#select-filter").on("change", changeCompFilter);
  changeCompFilter();
  $('#submit-filter').on("click", filter);
  filter();
  // $('#select-filter').on("change", getSelVal);
  // getSelVal();
  // $('#select-filter').on("change", getCompVal);
  // getCompVal();
  // $("#select-filter").on("change", hideInputTextbox);
  // hideInputTextbox();

});
