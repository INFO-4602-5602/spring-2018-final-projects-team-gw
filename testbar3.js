
var deathlist = d3.csv("VaxDeaths2017.csv", function(error, data){
      if (error) throw error;
      data.forEach(function(d) {
          d.Deaths2017 = +d.Deaths2017;
          });
      console.log(data);
    });


// First, we will create some constants to define non-data-related parts of the visualization
var w = 700; // Width of our visualization ; was 700
var h = 500; // Height of our visualization' was 500
var barPadding = 1
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
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svg = d3.select("#bar").append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate("+margin.left + "," + margin.top + ")");
var datasettest = [2,39,6,12,2,16,20,2,1,10,1,9]

var svg = d3.select("#USVaxDeath").append("svg")
    .attr("width", w)
    .attr("height", h)

svg.selectAll("rect")
  .data(datasettest)
  .enter()
  .append("rect")
  // every rectangle must have attributes x, y, width, height
  .attr("x", function(d,i){  //the x value tells where the upper left corner (the x-coord) of the rectangle will be
        return i * (w / datasettest.length); //dataset.length is how many objects? are in our list/array.. If you take the width of the svg a divide by dataset.length, you will create an equal rect width for each bar.
        })
  .attr("y", function(d){ //the y value tells where the upper left corner (the y-coord) of the rectangle will be
        return h-d;  //Height minus data value
        })
  .attr("width", w / datasettest.length - barPadding) //sutract the barPadding to leave a visual whitespace between bars
  .attr("height", function(d){
        return d;
        })
  .attr("fill", function(d){ //this varies the color of the bar based on the height value
        return "rgb(0, 0, " + Math.round(d * 10) + ")";
  });

//adding text elements here will enumerate the height of the bar, and thus explicitly tell the user what quantity the bar represents
  svg.selectAll("text")
        .data(datasettest)
        .enter()
        .append("text")
        .text(function(d) {
        			   		return d;
        			   })
        			   .attr("x", function(d, i) {
        			   		return i * (w / datasettest.length) +5; //add 5 (pixels?) to move the text lower - but I don't really understand what's happening here
        			   })
        			   .attr("y", function(d) {
        			   		return h - (d * 4) + 15; //+ 15; I don't really understand what's happening here, either
        			   })
        			   .attr("font-family", "sans-serif")
        			   .attr("font-size", "18px")
        			   .attr("fill", "blue");

  // .data(datasettest)
  // .enter()
  // .append("div")
  // .attr("class","bar")
  // .style("height", function(d){
  //   var barHeight = d * 5;
  //   return barHeight + "px";
  // })
//
//
// // Get the data
// // d3.csv("VaxDeaths2017.csv", function(error, data){
// //   if (error) throw error;
//
//   // Scale the range of the data
// x.domain(d3.extent(datasettest, function(d) {return d[xVal];}));
// y.domain([0, d3.max(datasettest, function(d) {return d[yVal];})]);
// Scale the range of the data in the domains
  x.domain(datasettest.map(function(d) { return d.Vaccine; }));
  y.domain([0, d3.max(datasettest, function(d) { return d.Deaths2017; })]);

//   // Add the scatterplot points
//   // svg.selectAll("circle")
//   //     .data(deathlist)
//   //     .enter()
//   //     .append("circle")
//   //     .attr("r", 5)
//   //     // .attr("cx", function(d){return x(d[xVal]);})
//   //     // .attr("cy", function(d){return y(d[yVal]);})
//   //     .attr("fill","pink")
//   //     // .transition()
//   //     // .ease(d3.easeBounce)
//   //     // .duration(4000)
//   //     .attr("r", function(d){return d["death"];});
//
  // Add the X Axis
  svg.append("g")
    .attr("transform","translate(0, " + height +")")
    .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));

  //Add text labels
    var xLabel = svg.append("text")
                    .attr("class", "label")
                    .text(xVal)
                    .attr("x", width - 20)
                    .attr("y", height - 10);

    var yLabel = svg.append("text")
                    .attr("class", "label")
                    .text(yVal)
                    .attr("y", -10)
                    .attr("transform", "rotate(90)")
                    .style("text-anchor", "start");
//
// // });
//
// // A function to retrieve the next value in the vals list
// function getNextVal(val) {
// 	return vals[(vals.indexOf(val) + 1) % vals.length];
// };
//
// // A function to change what values we plot on the x-axis
// function setXval(val) {
// 	// Update xVal
// 	xVal = val;
// 	// Update the axis
// 	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
// 				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
// 	xAxis.scale(xScale);
// 	xAxisG.call(xAxis);
// 	xLabel.text(xVal);
// 	// Update the points
//
// };
//
// // A function to change what values we plot on the y-axis
// function setYval(val) {
// 	// Update yVal
// 	yVal = val;
// 	// Update the axis
// 	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
// 				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
// 	yAxis.scale(yScale);
// 	yAxisG.call(yAxis);
// 	yLabel.text(yVal);
// 	// Update the points
//
// };
//
//
// // var margin = {top: 5, right: 5, bottom: 50, left: 50};
// // // here, we want the full chart to be 700x200, so we determine
// // // the width and height by subtracting the margins from those values
// // var fullWidth = 700;
// // var fullHeight = 200;
// // // the width and height values will be used in the ranges of our scales
// // var width = fullWidth - margin.right - margin.left;
// // var height = fullHeight - margin.top - margin.bottom;
// // var svg = d3.select('#bar').append('svg')
// //   .attr('width', fullWidth)
// //   .attr('height', fullHeight)
// //   // this g is where the bar chart will be drawn
// //   .append('g')
// //     // translate it to leave room for the left and top margins
// //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
// //
// // // x value determined by month
// // var monthScale = d3.scaleBand()
// //   .domain(months)
// //   .range([0, width])
// //   .paddingInner(0.1);
// //
// // // the width of the bars is determined by the scale
// // var bandwidth = monthScale.bandwidth();
// //
// // // y value determined by temp
// // var maxTemp = d3.max(temperatures, function(d) { return d.temp; });
// // var tempScale = d3.scaleLinear()
// //   .domain([0, maxTemp])
// //   .range([height, 0])
// //   .nice();
// //
// // var xAxis = d3.axisBottom(monthScale);
// // var yAxis = d3.axisLeft(tempScale);
// //
// // // draw the axes
// // svg.append('g')
// //   .classed('x axis', true)
// //   .attr('transform', 'translate(0,' + height + ')')
// //   .call(xAxis);
// //
// // var yAxisEle = svg.append('g')
// //   .classed('y axis', true)
// //   .call(yAxis);
// //
// // // add a label to the yAxis
// // var yText = yAxisEle.append('text')
// //   .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
// //   .style('text-anchor', 'middle')
// //   .style('fill', 'black')
// //   .attr('dy', '-2.5em')
// //   .style('font-size', 14)
// //   .text('Fahrenheit');
// //
// // var barHolder = svg.append('g')
// //   .classed('bar-holder', true);
// //
// // // draw the bars
// // var bars = barHolder.selectAll('rect.bar')
// //     .data(temperatures)
// //   .enter().append('rect')
// //     .classed('bar', true)
// //     .attr('x', function(d, i) {
// //       // the x value is determined using the
// //       // month of the datum
// //       return monthScale(d.month)
// //     })
// //     .attr('width', bandwidth)
// //     .attr('y', function(d) {
// //       // the y position is determined by the datum's temp
// //       // this value is the top edge of the rectangle
// //       return tempScale(d.temp);
// //     })
// //     .attr('height', function(d) {
// //       // the bar's height should align it with the base of the chart (y=0)
//       return height - tempScale(d.temp);
//     });
