VisualPlot.prototype.arcSlice =
function() {

  const PI = 3.14159;
  let max_translated = this.innerRadius + (this.data.length)*(this.size) + (this.data.length-1)*this.gap

  let bottom_gap = 20
  this.svg.attr("width", this.x+max_translated*2)
  this.svg.attr("height", this.y+max_translated*2+bottom_gap)

  this.data.forEach((dataset, i) => {

    let percentage = (dataset.data>100) ? 100 : parseFloat(dataset.data),
    name = dataset.name,
    color = dataset.color

    let arc_angle = 2*PI*percentage/100

    let innerRadius = this.innerRadius + i*(this.size+this.gap)
    let outerRadius = innerRadius + this.size

    // An arc will be created
    this.arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0)
    .endAngle(arc_angle);

    this.svg.append("path")
    .attr("class", "arc")
    .attr("transform", `translate(${this.x+ max_translated},${this.y + max_translated})`) //Fixed value for centering the arc
    .attr("d", this.arc)
    .attr("fill",color);
  });

  //Label
  let font_size = 30,
  label_gap = 10

  this.svg.append('g').selectAll("text").data(this.data).enter().append('text')
  .style('font-size',`${font_size}px`)
  .style('font-weight',`bold`)
  .attr('x', this.x+ max_translated - font_size - label_gap)
  .attr('y', (d,i)=>{return this.y+ max_translated //Translated length
    - i*(this.size+this.gap) //Arc length
    - this.innerRadius - this.size/2 //Init length
  })
  .text((d)=>{return d.data})
  .attr("fill",(d)=>d.color);

  var text_inner_gap = 4
  let text_gap = 20

  this.renderText().forEach((text, i) => {
    this.svg.append('g').selectAll("text").data(text).enter()
    .append('text')
    .style("text-anchor",'end')
    .attr('x', this.x+ max_translated - this.subtext_fontSize*this.data.length -text_gap) // + label_gap +
    .attr('y', (d,j,array)=>{
      var centerizing = (array.length==1) ? this.subtext_fontSize : this.subtext_fontSize/2
      return this.y+ max_translated //Translated length
      - i*(this.size+this.gap) //Arc length
      - this.innerRadius - this.size/2 //Init length
      - (array.length-j)*this.subtext_fontSize//reverse the text order, 1st line is first text
      + text_inner_gap*j //Gap between two split text
      + array.length*centerizing //move to center based on text lenght
    })
    .text(d=>d)
    .attr("fill",this.data[i].color)
  });


}

VisualPlot.prototype.bubble =
function() {
  const PI = 3.14159;

  let first_radius = parseFloat(this.data[0].data)/100*this.size
  let previous_x = [] //accummative x
  let centerY = this.y+first_radius
  let centerY_second = this.y+first_radius*2 //Put at bottom
  var previousCircle = {}

  //Circle
  this.group = this.svg.append('g')

  this.group.append('g').selectAll("circle").data(this.data).enter().append('circle')
  .attr('cx', (d,i,array)=>{
    if(i==0) {
      previous_x.push(this.x+first_radius)
      previousCircle = d
      return previous_x[0]
    } else {
      var radius = parseFloat(d.data)/100*this.size
      var prev_radius = parseFloat(previousCircle.data)/100*this.size

      var dis = radius + prev_radius + this.gap
      var adjust_x = (dis**2-(centerY_second-centerY)**2)**(1/2)
      var cur_x = previous_x[previous_x.length-1]+adjust_x
      previous_x.push(cur_x)
      previousCircle = d
      return cur_x
    }
  })
  .attr('cy', (d,i)=>{
    if(i%2==0) {
      return centerY
    } else {
      return centerY_second
    }
  })
  .attr('r', (d)=>parseFloat(d.data)/100*this.size)
  .attr('fill',(d)=>d.color);

  //Text
  this.group.append('g').selectAll("text").data(this.data).enter().append('text')
  .attr('x', (d,i)=>previous_x[i])
  .attr('y', (d,i)=>{
    if(i%2==0) {
      return centerY
    } else {
      return centerY_second
    }
  })
  .text((d)=>{return d.data})
  .attr('class','bubble');

  // Line
  // Separate line
  this.group.append('g').selectAll("line").data(this.data)
  .enter().append('line')
  .style("stroke", '#34495e')
  .style("stroke-width", 1)
  .attr('x1', (d,i)=>previous_x[i])
  .attr('y1', (d,i)=>{
    if(i%2==0) {
      return centerY - 16
    } else {
      return centerY_second + 16
    }
  })
  .attr('x2', (d,i)=>previous_x[i])
  .attr('y2', (d,i)=>{
    if(i%2==0) {
      return centerY - this.line_length
    } else {
      return centerY_second + this.line_length
    }
  })

  //Text
  var text_inner_gap = 4
  let text_gap = 20

  this.renderText().forEach((text, j) => {
    this.svg.append('g').selectAll("text").data(text).enter()
    .append('text')
    .style("text-anchor",'middle')
    .style('font-size',`${this.subtext_fontSize}px`)
    .attr('x', (d,i)=>previous_x[j]) // + label_gap +
    .attr('y', (d,i,array)=>{
      if(j%2==0) {
        return centerY - this.line_length //- 10
        - (array.length-i)*this.subtext_fontSize//reverse the text order, 1st line is first text
        + text_inner_gap*i //Gap between two split text
        - text_inner_gap*(array.length)
      } else {
        return centerY_second + this.line_length // + 10
        + (array.length-i)*this.subtext_fontSize//reverse the text order, 1st line is first text
        - text_inner_gap*i //Gap between two split text
        + text_inner_gap*(array.length)
      }
    })
    .text(d=>d)
    .attr("fill",this.data[j].color)
  });

}

VisualPlot.prototype.renderText =
function() {
  //Text
  let max_string = this.subtext_maxString
  let text_data = []
  this.data.forEach((data, i) => {

    text_data[i] = []

    var color = data.color
    var string = ''
    var split_index = 0
    var totalIndex = data.text.split(' ').length-1;

    data.text.split(' ').forEach((text, j) => {

      var data_string = ''

      if(string.length<max_string && j<totalIndex) {
        string+=text+' '

        return;
      } else if (string.length>=max_string){
        data_string = string+=text+' '
        string = ''
      } else {
        string+=text+' '
        data_string = string
      }

      text_data[i].push(data_string.trim())
      split_index++
    });

  });

  return text_data
}
