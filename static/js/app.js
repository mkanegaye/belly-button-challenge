// Log data to console
let url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json'
d3.json(url).then(function(data){
  console.log(data);
});
// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    // console.log(sample_ids);

    // Filter the metadata for the object with the desired sample number
    let results = metadata.filter(id => id.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    d3.select('#sample-metadata')
  
    // Use `.html("") to clear any existing metadata
    d3.select('#sample-metadata').html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(results).forEach(([key, value])=> {
      console.log(key,value);
      d3.select('#sample-metadata').append('h3').text(`${key},${value}`);
    })
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let sample_data = data.samples;
    
    // Filter the samples for the object with the desired sample number
    let results = sample_data.filter(id => id.id == sample);
    console.log(results);
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = results[0].otu_ids;
    let otu_labels = results[0].otu_labels;
    let sample_values = results[0].sample_values;
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    // Build a Bubble Chart
    let bubble_trace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
      }
    };

    let bubble_layout = {
      title: "Bacteria Count per Sample ID",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    };
    // Render the Bubble Chart
    Plotly.newPlot("bubble", [bubble_trace], bubble_layout);
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let bar_trace = {
      x: sample_values.reverse().slice(0,10),
      y: otu_ids.map(item => 'OTU ${item}').reverse().slice(0,10),
      text: otu_labels.reverse().slice(0,10),
      type: "bar",
      orientation: "h"
    };
    let layout = {
      title: "Top Ten Bacteria Cultures Found"
    };

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart
    Plotly.newPlot("bar", [bar_trace], layout)
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (name in names){
      dropdown.append("option").attr("value",name).text(name);
    }

    // Get the first sample from the list
    let first_sample = names[0];
    console.log(first_sample);

    // Build charts and metadata panel with the first sample
    buildCharts(first_sample)
  });
};

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  console.log(value);
  buildCharts(value);

};

// Initialize the dashboard
init();
