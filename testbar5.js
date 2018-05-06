// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var deathlist = d3.csv("VaxDeaths2017.csv", function(error, data){
    if (error) throw error;
        data.forEach(function(d) {
            d.Deaths2017 = +d.Deaths2017;
            });
        console.log(data);
        // });

        // Scale the range of the data in the domains
          x.domain(data.map(function(d) { return d.Vaccine; }));
          y.domain([0, d3.max(data, function(d) { return d.Deaths2017; })]);

          // append the rectangles for the bar chart
          svg.selectAll(".bar")
              .data(data)
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.Vaccine); })
              .attr("width", x.bandwidth())
              .attr("y", function(d) { return y(d.Deaths2017); })
              .attr("height", function(d) { return height - y(d.Deaths2017); });

          // add the x Axis
          svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          // add the y Axis
          svg.append("g")
              .call(d3.axisLeft(y));

        });
