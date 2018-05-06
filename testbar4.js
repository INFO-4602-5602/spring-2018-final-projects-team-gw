


// First, we will create some constants to define non-data-related parts of the visualization
var w = 300; // Width of our visualization ; was 700
var h = 300; // Height of our visualization' was 500
var barPadding = 5
// var xOffset = 40; // Space for x-axis labels
// var yOffset = 100; // Space for y-axis labels
// var margin = 10; // Margin around visualization
// var vals = ['vaxtype', 'death']; // List of data attributes
// var xVal = vals[0]; // Value to plot on x-axis
// var yVal = vals[1]; // Value to plot on y-axis

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom;
//
// set the ranges
var x = d3.scaleBand()
      .range([0, width])
      .padding(10); //was .1
var y = d3.scaleLinear()
      .range([height, 0]);

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("#bar").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate("+margin.left + "," + margin.top + ")");
// var datasettest = [2,39,6,12,2,16,20,2,1,10,1,9]

var svg = d3.select("#USVaxDeath").append("svg")
    // .attr("width", w)
    // .attr("height", h)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// get the dataand store it in a variable, deathlist
var deathlist = d3.csv("VaxDeaths2017.csv", function(error, data){
      if (error) throw error;
      data.forEach(function(d) {
          d.Deaths2017 = +d.Deaths2017;
          });
          // Scale the range of the data in the domains
      x.domain(data.map(function(d) { return d.Vaccine; }));
      y.domain([0, d3.max(data, function(d) { return d.Deaths2017; })]);
      // console.log(data);
      // append the rectangles for the bar chart
      svg.selectAll("#bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Vaccine); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.Deaths2017); })
          .attr("height", function(d) { return height - y(d.Deaths2017); });
          });

// svg.selectAll("rect")
//   .data(datasettest)
//   .enter()
//   .append("rect")
//   // every rectangle must have attributes x, y, width, height
//   .attr("x", function(d,i){  //the x value tells where the upper left corner (the x-coord) of the rectangle will be
//         return i * (w / datasettest.length); //dataset.length is how many objects? are in our list/array.. If you take the width of the svg a divide by dataset.length, you will create an equal rect width for each bar.
//         })
//   .attr("y", function(d){ //the y value tells where the upper left corner (the y-coord) of the rectangle will be
//         return h-d;  //Height minus data value
//         })
//   .attr("width", w / datasettest.length - barPadding) //sutract the barPadding to leave a visual whitespace between bars
//   .attr("height", function(d){
//         return d;
//         })
//   .attr("fill", function(d){ //this varies the color of the bar based on the height value
//         return "rgb(0, 0, " + Math.round(d * 10) + ")";
//   });

//adding text elements here will enumerate the height of the bar, and thus explicitly tell the user what quantity the bar represents
  // svg.selectAll("text")
  //       .data(datasettest)
  //       .enter()
  //       .append("text")
  //       .text(function(d) {
  //       			   return d;
  //       			   })
  // 		  .attr("x", function(d, i) {
  //       		   	  return i * (w / datasettest.length) +5; //add 5 (pixels?) to move the text lower - but I don't really understand what's happening here
  //       		      })
  //      .attr("y", function(d) {
  //      		       return h - (d * 4) + 15; //+ 15; I don't really understand what's happening here, either
  //                 })
  //      .attr("font-family", "sans-serif")
  //      .attr("font-size", "18px")
  //      .attr("fill", "blue");

// add the x Axis
  svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

 // add the y Axis
 svg.append("g")
     .call(d3.axisLeft(y));
