function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  data = d3.json("../static/data/data.json").then((data) => {
      let tableData = data.map(function(data){

        return data;
      })
      return tableData;
    //  var columnName = data.id;

    //  columnName.forEach((column) => {
    //    selector
    //      .append("option")
    //      .text(column)
    //      .property("value", column);
    });
    console.log(data);
    //buildTabulatorTable(data)

    // Use the first sample from the list to build the initial plots
  //   var columnName = sampleNames[0];
  buildCharts("age");
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
  d3.json("../static/data/data.json").then((data) => {
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
  d3.json("../static/data/data.json").then((data) => {
  
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
        text: "<b>The Graphs</b>",
    //   y: 0.90
      }
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", [barData], barLayout);
  });
}

//tabulator table code

function buildTabulatorTable(tableData){
  // console.log(tableData);
  // var table = new buildTabulatorTable('#tabulator_table',{
  //   data:tableData,
  //   autoColumns:true,
  //   layout:"fitColumns",
  //   paginationSize:20,
  // });
 }