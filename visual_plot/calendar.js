VisualPlot.prototype.calendar =
function() {

  var day_box = [ [] ]
  var init_day = this.init_date_format.getDay()
  var last_date = new Date(this.init_date_format.getFullYear(), this.init_date_format.getMonth()+1, 0).getDate();
  var date = 1;


  for (let i=0;i<=99;i++) {
    if(day_box[day_box.length-1].length>=7) day_box.push([]) //New row every 7 col
    
    if(i<init_day)   day_box[day_box.length-1].push(null)
    if(i>=init_day)  {
      day_box[day_box.length-1].push(date)
      date++
    }

    if(date>last_date) break;
  }

  this.svg.attr("width", 7*this.box_width + 200)
  this.svg.attr("height", day_box.length*this.box_height+ 120)

  let titleHeight = 26 //Font Size

  //Title
  this.svg.append('g').append('text')
  .text(`${this.date_meta.month[this.init_date_format.getMonth()]} ${this.init_date_format.getFullYear()}`)
  .attr('x', this.x+7/2*this.box_width)
  .attr('y', this.y + titleHeight)
  .attr("class",'title')

  //Label
  this.svg.append('g').selectAll("text").data(this.date_meta.col).enter().append('text')
  .attr('x', (d,i)=>{return this.x+i*this.box_width +this.box_width/2})
  .attr('y', this.y +100 - this.box_height/2)
  .text((d)=>{return d})

  day_box.forEach((col, i) => {
    let row = this.svg.append('g')

    // Box
    row.selectAll("rect").data(col)
    .enter().append('rect')
    .attr('x', (d,i)=>{return this.x+i*this.box_width})
    .attr('y', this.y +100 +this.box_height*i)
    .attr('width', this.box_width)
    .attr('height', this.box_height)
    .attr('stroke', 'black')
    .attr('fill', 'white')
    .style('opacity', (d,i)=>{if(d==null) return 0})
    .attr("class", (d)=>{
      if(d<new Date().getDate()) {
        return 'past' + ` day${d}`
      } else if(d==new Date().getDate()) {
        return 'today' + ` day${d}`
      } else {
        return ` day${d}`
      }
    })

    // Text
    row.selectAll("text").data(col)
    .enter().append("text")
    .attr('x', (d,i)=>{return this.x+i*this.box_width +this.box_width/2})
    .attr('y', this.y +100+this.box_height*i +15)
    .attr("class", (d)=>{
      if(d<new Date().getDate()) {
        return 'past'
      } else if(d==new Date().getDate()) {
        return 'today'
      }
    })
    .text((d)=>{return d})
  });



  // Highlight
  let day_fill = [[]]
  for (let i = 1; i<=last_date;i++) {
    day_fill.push([])
  }
  this.data.forEach((item, j) => {
    for (let i = 1; i<=last_date;i++) {
      for (let x in item.data) {
        // fill the day
        if(i>=item.data[x][0] && i<=item.data[x][1]) //[1,5]
        day_fill[i].push({name:x,color:item.color})
      }

    }
  });

  let row = this.svg.append('g')
  //Render data
  day_fill.forEach((item, j) => {
    if(item.length>0) {
      row.append('g').selectAll("rect").data(item)
      .enter().append('rect')
      .attr('x', d3.select(`.day${j}`).attr("x"))
      .attr('y', (d,i)=>{return parseInt(d3.select(`.day${j}`).attr("y")) +25+this.banner_height*i })
      .attr('width', this.box_width)
      .attr('height', this.banner_height)
      .attr('fill', (d)=>d.color)

      row.append('g').selectAll("text").data(item)
      .enter().append('text')
      .attr('x', parseInt(d3.select(`.day${j}`).attr("x"))+this.box_width/2)
      .attr('y', (d,i)=>{return parseInt(d3.select(`.day${j}`).attr("y")) +25+this.banner_height*i+this.banner_height/2 })
      .attr('class','small')
      .text(d=>d.name)
    }
  });

}

VisualPlot.prototype.timeline =
function() {
  let dataLength = 2 + this.data.length;

  var day_box = []
  var init_day = this.init_date_format.getDay()
  var last_date = new Date(this.init_date_format.getFullYear(), this.init_date_format.getMonth()+1, 0).getDate();

  for (let i = 1; i<=last_date;i++) {
    day_box.push(i)
  }


  this.svg.attr("width", day_box.length*this.box_width + 200)
  .attr("height", this.data.length*this.box_height+ 120)

  let row = this.svg.append('g')

  // Label
  row.selectAll("text").data(day_box)
  .enter().append("text")
  .attr('x', (d,i)=>{return this.x+i*this.box_width + this.box_width/2})
  .attr('y', this.y + this.box_height - 30)
  .text((d)=>{return d})

  // Separate line
  row.selectAll("line").data(day_box)
  .enter().append('line')
  .style("stroke", 'rgba(223, 230, 233,0.7')
  .style("stroke-width", 2)
  .attr('x1', (d,i)=>{return this.x+i*this.box_width})
  .attr('y1', this.y)
  .attr('x2', (d,i)=>{return this.x+i*this.box_width})
  .attr('y2', this.y+this.box_height*dataLength)


  this.data.forEach((item, j) => {

    // Header
    row.append('rect')
    .attr('x', (d,i)=>{return this.x - this.box_width - 10})
    .attr('y', this.y+this.box_height*(j+1) + this.gap*j)
    .attr('width', this.box_width)
    .attr('height', this.box_height)
    .attr('fill', item.color)
    row.append("text")
    .attr('x', (d,i)=>{return this.x - this.box_width + this.box_width/2 - 10})
    .attr('y', this.y+this.box_height*(j+1) + this.box_height/2 + this.gap*j)
    .text((d)=>{return item.name})
    .attr('fill', 'white')

    // Box
    row.append('g').selectAll("rect").data(day_box)
    .enter().append('rect')
    .attr('x', (d,i)=>{return this.x+i*this.box_width})
    .attr('y', this.y+this.box_height*(j+1) + this.gap*j)
    .attr('width', this.box_width)
    .attr('height', this.box_height)
    .attr('fill', 'rgba(223, 230, 233,0.3)')
    .style('opacity', (d,i)=>{if(d==null) return 0})


    // Highlight
    let day_fill = []
    for (let x in item.data) {
      // fill the day
      for (let i =item.data[x][0];i<=item.data[x][1];i++) { //[1,5]
        day_fill.push(i)
      }

    }


    row.append('g').selectAll("rect").data(day_fill)
    .enter().append('rect')
    .attr('x', (d,i)=>{return this.x+(d-1)*this.box_width})
    .attr('y', this.y+this.box_height*(j+1) + this.gap*j)
    .attr('width', this.box_width)
    .attr('height', this.box_height)
    .attr('fill', item.color)


    for (let x in item.data) {
      var mid_point = (item.data[x][0] + item.data[x][1])/2

      //Label
      row.append("text")
      .attr('x', (d,i)=>{return this.x+(mid_point-1)*this.box_width + this.box_width/2})
      .attr('y', this.y + this.box_height*(j+1) + this.box_height/2 + this.gap*j)
      .text(x)
      .attr('fill', 'white')
    }

  });


}
