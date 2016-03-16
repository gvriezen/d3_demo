//execute script when window is loaded
window.onload = function () {
	var w = 900, h =500; 
	var container = d3.select("body") //get the <body> element from the DOM
	.append("svg") //put a new svg in the body
	.attr("width", w) // assign width
	.attr("height", h) // assign the height
	.attr("class", "container") //always assign a class (as the block name)
	.style("background-color", "rgba(0,0,0,0.2)") // semicolons only put at end of the block

//inner rect block example
	var innerRect = container.append("rect") //add a <rect> element in the svg
// //datum operator used to bind a data value to the selection
		.datum(400) //single value is a datum
   		.attr("width", 850) //rectangle width
    	.attr("height", 450) //rectangle height
    	.attr("width", function(d) { //rectangle width
        	    return d * 2; //400 * 2 = 800
        	}) 
        .attr("height", function(d) { //rectangle height
         	   return d; //400
       		})
        .attr("class", "innerRect") //class name
        .attr("x", 50) //position from left on the x (horizontal) axis
        .attr("y", 50) //position from top on the y (vertical) axis
        .style("fill", "#FFFFFF"); //fill color

	var cityPop = [
     {
     	city: 'Seattle',
     	population: 668342
     },

     {
     	city: 'Portland',
     	population: 619360
     },
     {
     	city: 'Minneapolis',
     	population: 407207
     },

     { city: 'Saint Louis',
     	population: 317419

     }
   ];

   var x = d3.scale.linear() //create the scale
        .range([100, 700]) //output min and max
        .domain([0, 3]); //input min and max

   var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find the maximum value of the array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scale.linear()
        .range([450, 50]) //was 440,95
        .domain([0, 700000
        ]); //was minPop, maxPop

    var color = d3.scale.linear()
        .range([
            "#FDBE85",
            "#D94701"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

	var circles = container.selectAll(".circles") //but wait--there are no circles yet!
        .data(cityPop) //here we feed in an array
        .enter() //one of the great mysteries of the universe
        .append("circle") //add a circle for each datum
        .attr("class", "circles") //apply a class name to all circles
        .attr("id", function(d){ //circle radius
            // console.log("d:", d, "i:", i); //let's take a look at d and i
            return d.city;
        })

        .attr("r", function(d) {
        	//calculate radius based on pop value as circle area
        	var area = d.population * 0.01;
        	return Math.sqrt (area/Math.PI);
        })

         .attr("cx", function(d, i){
            //use the scale generator with the index to place each circle horizontally
            return x(i);
        })
        // // .attr("cx", function(d, i){ //x coordinate
        // // 	return 90 + (i * 180);
           
        // })
		.attr("cy", function(d){
            return y(d.population);
        })

        // .attr("cy", function(d){ //y coordinate
        //     return 450 - (d.population * 0.0005);
        // });

        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke

        var yAxis = d3.svg.axis()
        	.scale(y)
        	.orient("left")

        var axis = container.append("g")
        	.attr("class", "axis")
        	.attr("transform", "translate(50, 0)")
        	.call(yAxis);

        var title = container.append("text")
        	.attr("class", "title")
        	.attr("text-anchor", "middle")
        	.attr("x", 450)
        	.attr("y", 40)
        	.text("City Populations");

        var labels = container.selectAll (".labels")
        	.data(cityPop)
        	.enter()
        	.append("text")
        	.attr("class", "labels")
        	.attr("text-anchor", "left")
        	// .attr("x", function(d,i){
        	// 	//horizontal position of each circle - to the right
        	// 	return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5
        	// })

        	.attr ("y", function(d) {
        		//vertical position centered on each circle
        			return y(d.population) 
        			// + 5;
        	})


        	var nameLine = labels.append ("tspan")
        		.attr("class", "nameLine")
        		.attr("x", function(d,i){
        		//horizontal position of each circle - to the right
        			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5
        	})

        		.text(function(d){
        			return d.city 
        	});

        	//create format generator

        	var format = d3.format (",");

	    	var popLine = labels.append("tspan")
        		.attr("class", "popLine")

        		.attr ("x", function(d,i) {
        		//vertical position centered on each circle
        			return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5
        	})
        		.attr("dy", "15") //vertical offset

        		.text(function(d){
        			return "Pop." + d.population;
        		});


};
