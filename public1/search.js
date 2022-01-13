//const { json } = require("express/lib/response");

var data ;
const input = document.querySelector("#myInput");
const form = document.querySelector("form");
let searchText="";


fetch("/employees")
  .then(response => {
    if (!response.ok) throw new Error(response.status);
    return response.json()
  })
  .then (json => {
     data=json;
     console.log(json)
    })
  .catch(console.error);

  input.addEventListener("input", function(e) {
    console.log(e.target.value)
    searchText=e.target.value;
    const text = e.target.value;
    var result = new Array();
    if(e.target.value) {
      var index=0;
      for(let i=0;i<data.Employees.length;i++)  {
      let fName=data.Employees[i].firstName;
      let lName=data.Employees[i].lastName;
      if( (fName.toLowerCase()).startsWith((text).toLowerCase()) || 
          (lName.toLowerCase()).startsWith((text).toLowerCase())  )
       {
        result[index] = data.Employees[i].preferredFullName;
        index++;
       }

      }
      var options = '';

      for (var i = 0; i < result.length; i++) {
       options += '<option value="' + result[i] + '" />';
       document.getElementById('results').innerHTML = options;
      }
   }
  })

  const DataList = document.getElementById("myInput");
  DataList.addEventListener("change", (event)=>{
    console.log(event.target.value)
  });
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("show "+searchText)
    
   
    fetch(`/employees/${searchText}`)
    .then(response => {
      if (!response.ok) throw new Error(response.status);
        console.log(response)})
  .then (json => {
    console.log(json)
   })
 .catch(console.error);

   
  })
;
