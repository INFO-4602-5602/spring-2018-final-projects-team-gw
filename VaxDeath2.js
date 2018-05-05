// Much of the commentary and code was taken from Scott Murray's book "Interactive Data Visualization for the Web"

// The rowConverter variable calls a function which changes the number from a string to a number type.
var rowConverter = function(d) {
    return {
      VAX_TYPE: d.VAX_TYPE, //no conversion
      CountDistinct_VAERS_ID: parseFloat(d.CountDistinct_VAERS_ID),
      Count: parseFloat(d.Count)
    };
}

var vaxdeath2017; // Declare global variable, initially empty (undefined)

d3.csv("USDeathsbyVaxType2017.csv", rowConverter, function(error, data) {
    if(error){   // if error is not null, something went wrong
        console.log(error);   // Log the  error
    } else { // If no error, the file loaded correctly.
        console.log(data);  //Log the data.
    }

    // Include other  code  to execute aftersuccessful file load here
    vaxdeath2017=data;
});

d3.select("#bar").selectAll("p")
    .data(vaxdeath2017)
    .enter()
    .append("p")
    .text("New paragraph!");
