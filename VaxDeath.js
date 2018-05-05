
function lineGraph(){
    // set the dimensions and margins of the graph
    var margin = {top: 100, right: 20, bottom: 50, left: 70};
    var width = 700 - margin.left - margin.right
    var height = 450 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // append the svg obgect to the "line" div of the page
    var svg4 = d3.select("#line")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            // appends a 'group' element to 'svg'
            .append("g")
            // moves the 'group' element to the top left margin
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("USDeathsbyVaxType2017.csv", function(error, data){
            if (error) throw error;
            console.log(data);
            console.log("anystring");
            y.domain([0, d3.max(data, function(d) {return +d.Count;})]);
            var line_values = d3.line()
                      // .x(function(d){return nerdiness.indexOf(d.NerdLevel)*gridsize;})
                      // .x(function(d){return x(d.Count);})
                      .y(function(d){return y(d.Count);})

                      //.curve(d3.curveLinear);
            // var xAxis4 = d3.axisBottom(x).tickFormat(function(d, i) {
            //                 return nerdiness[i];
            //               });
          });
    };

//
lineGraph();
//

// part 2 from bostock
function barGraph(){
    var svg = d3.select("#bar"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("USDeathsbyVaxType2017.csv", function(d) {
        d.frequency = +d.frequency;
        return d;
        },
        function(error, data) {
            if (error) throw error;
            console.log(data);
            console.log("anystring3");
            x.domain(data.map(function(d) { return d.letter; }));
            y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.selectAll(".bar")
              .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.VAX_TYPE); })
                .attr("y", function(d) { return y(d.frequency); })
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.frequency); });
});
};

barGraph();
