
var margin = {top: 80, right: 180, bottom: 80, left: 180},
    // width = 960 - margin.left - margin.right,
    width = 860 - margin.left - margin.right,
    // height = 500 - margin.top - margin.bottom;
    height = 440 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, .3);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .ticks(8, "%");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        // return "<span style='color:red'>" + d.Vaccine + "</span>";
        return d.Vaccine + "<br><strong><span style='color:red'>Qty of Reported Events: </strong></span>" + d.Injured2017;
        // return "<strong>Number of Deaths:</strong> <span style='color:red'>" + d.Deaths2017 + "</span>";
    })

// var svg = d3.select("body").append("svg")
//This is where I think 'body' should be #dth2 so so that it binds to the right thing
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.csv("VaxInj2017.csv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.Vaccine; }));
    y.domain([0, d3.max(data, function(d) { return d.Injured2017; })]);

    svg.append("text")
        .attr("class", "title")
        .attr("x", x(data[0].Vaccine))
        .attr("y", -26)
        .text("Number of Injuries from 11 Types of Vaccines in 2017, as named in VAERS");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll(".tick text")
        .call(wrap, x.rangeBand());

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.Vaccine); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.Injured2017); })
        .attr("height", function(d) { return height - y(d.Injured2017); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d){
            return d;
        })
        .attr("x", function(d,i){
            return i * (w / data2.length) + 5;
        })
        .attr("y", function(d){
            return h - (d * 4) + 15;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("fill", "blue");
  });

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

function type(d) {
  d.Injured2017 = +d.Injured2017;
  return d;
}
