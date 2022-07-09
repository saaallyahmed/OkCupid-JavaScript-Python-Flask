function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("./data/data.json").then((data) => {
        console.log(data)
      //  var columnName = data.id;
  
      //  columnName.forEach((column) => {
      //    selector
      //      .append("option")
      //      .text(column)
      //      .property("value", column);
      });
  
      // Use the first sample from the list to build the initial plots
    //   var columnName = sampleNames[0];
    //   buildCharts("age");
    //   buildMetadata(firstSample);
    }
//     );
//   }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(columnName) {
    // Fetch new data each time a new sample is selected
    //buildMetadata(newSample);
    console.log(columnName);
    buildCharts(columnName);
    
  }

 
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("./data/data.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
  
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }

  function buildCharts(columnName){
    //build a bar chart
    d3.json("./data/data.json").then((data) => {
    
      //var samples = data.samples;
      console.log(columnName);
      console.log(data[0].age)
      //x = data.map
      // Create the trace for the bar chart. 
      catData = {}
      data.map(item=>{
        if (item[columnName] in catData){
          catData[item[columnName]]++
        }
        else {
          catData[item[columnName]] = 1
        }
      })
      console.log(catData)
      var barData = {
        x: Object.keys(catData),
        y: Object.values(catData),
        type: "bar",
        
      };
      // Create the layout for the bar chart. 
      var barLayout = {
        title: {
          text: "<b>Top 10 Bacteria Cultures Found</b>",
      //   y: 0.90
        }
      };
      // Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", [barData], barLayout);
    });
    //Creat Sunburst chart
  }

//Sunbrust chart
  var catData = [{
  type: "sunburst",
  ids: [
    "Body Type", "Education", "Age", "Body Type - Athletic", "Average",
    "Body Type - Fit", "Education - Masters Graduated", "Declined to Answer",
    "Education - Two-years College","Age - Orientation", "Age ", "Age - Ethnicity",
    "Jobs", "Income"
  ],
  labels: [
    "Body<br>Type", "Education", "Age", "Athletic", "Average", "Fit",
    "Masters<br>Graduated", "Declined<br>to Answer", "Two-year<br>College", "Orientation", "Gay",
    "Bisexual", "Straight", "Ethnicity", "Jobs",
    "Income"
  ],
  parents: [
    "", "", "", "Body Type", "Body Type", "Body Type", "Education",
    "Education", "Education","Age", "Age - Orientation", "Age - Orientation",
    "Age - Orientation", "Age - Orientation", "Age - Ethnicity",
    "Age - Ethnicity"
  ],
  outsidetextfont: {size: 20, color: "#377eb8"},
  // leaf: {opacity: 0.4},
  marker: {line: {width: 2}},
}];





var layout = {
  margin: {l: 0, r: 0, b: 0, t:0},
  sunburstcolorway:["#636efa","#ef553b","#00cc96"],
};


Plotly.newPlot('myDiv', catData, layout);

