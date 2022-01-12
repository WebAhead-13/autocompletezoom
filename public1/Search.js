
var data ;
input= document.querySelector("#myInput");

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
    const text = e.target.value;
    var result = new Array();
    if(e.target.value) {
      var index=0;
    for(let i=0;i<data.Employees.length;i++)
    {
      let name=data.Employees[i].firstName;
      if((name.toLowerCase()).startsWith((text).toLowerCase())){
        result[index] = name;
        console.log(name)
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




