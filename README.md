# Visual Plot
Reproducing some interesting online charts using [d3.js](https://github.com/d3/d3)

## Demo
https://chen0gao.github.io/Visual-Plot/

## Table of Contents
1. [Setup](#Setup)
2. [Usage](#Usage)
   - [Timeline](#timeline)
   - [Calendar](#calendar)
   - [Arc Slide](#arc-slide)
   - [Bubble](#bubble)
   - [Map (svg)](#map-svg)
3. [To-Do List](#to-do-list)
4. [Reference](#reference)


## Setup
HTML:
```HTML
  <link href="visual_plot/index.css" rel="stylesheet">
  <script src="visual_plot/core.js"></script>
  <script src="visual_plot/calendar.js"></script>
  <script src="visual_plot/percentage.js"></script>
  <script src="visual_plot/map.js"></script>

  <section id='dom'></section> //Dom for plotting
```

## Usage
### Timeline
```javascript
let visual_plot = new VisualPlot(
  {
    //target DOM
    dom:'#dom',
    //Date for timeline
    date:'1/1/2021',
    //DOM style
    x:100,y:10,
    box_width: 50,box_height:40,
    gap:10,
    //Data
    data:[
       {name:'Green',color:'#22a6b3',
       //[start_date,end_date]
        data:{'⭐eat':[1,3],'drink':[6,9],'smile':[11,15]}},
       {name:'Red',color:'#d63031',
        data:{'💫test':[3,6]}},
       {name:'Purple',color:'#6c5ce7',
        data:{'apple':[18,25]}},
     ]
   })
visual_plot.timeline()
```
![](https://github.com/chen0gao/Visual-Plot/blob/main/img/timeline.PNG?raw=true)

### Calendar
```javascript
visual_plot.init(
  {
    //target DOM
    dom:'#dom',
    //Date for timeline
    date:'1/1/2021',
    //DOM style
    x:100,y:10,
    box_width: 60,box_height:60,
    banner_height: 14,
    //Data
    data:[
     {name:'Green',color:'#22a6b3',
     //[start_date,end_date]
      data:{'⭐eat':[1,3],'drink':[6,9],'smile':[11,15]}},
     {name:'Red',color:'#d63031',
      data:{'💫test':[3,6]}},
     {name:'Purple',color:'#6c5ce7',
      data:{'apple':[18,25]}},
    ]
  }
)
visual_plot.calendar()
```
![](https://github.com/chen0gao/Visual-Plot/blob/main/img/calendar.PNG?raw=true)

### Arc Slide
```javascript
visual_plot.init(
  {
    //target DOM
    dom:'#dom',
    //DOM style
    x:150,y:50,
    size: 40,
    gap:6,
    subtext_fontSize:14,subtext_maxString: 20,
    //Data
    data:[
      {name:'Arc 1',color:'#22a6b3',data:'29%',text:'A chart with example'},
      {name:'Arc 2',color:'#d63031',data:'34%',text:'Example text holder with long and long description yet much more longer'},
      {name:'Arc 3',color:'#6c5ce7',data:'43%',text:'Another long example text holder yet'},
      {name:'Arc 4',color:'#f1c40f',data:'50%',text:'This is short'},
      {name:'Arc 5',color:'#7f8c8d',data:'65%',text:'Some other text with some description yet yet yey'},
    ]
})
visual_plot.arcSlice()
```
![](https://github.com/chen0gao/Visual-Plot/blob/main/img/arcSlice.PNG?raw=true)

### Bubble
```javascript
visual_plot.init(
  {
    //target DOM
    dom:'#dom',
    //DOM style
    x:100,y:100,
    size: 140,
    gap:5,
    line_length: 100,
    subtext_fontSize:14,subtext_maxString: 10,
    //Data
    data:[
      {name:'bubble 1',color:'#22a6b3',data:'64%',text:'A chart with example'},
      {name:'bubble 2',color:'#f1c40f',data:'52%',text:'Example text holder with long and long description yet much more longer'},
      {name:'bubble 3',color:'#6c5ce7',data:'35%',text:'Another long example text holder yet'},
      {name:'bubble 4',color:'#d63031',data:'45%',text:'This is short'},
    ]
})
visual_plot.bubble()
```
![](https://github.com/chen0gao/Visual-Plot/blob/main/img/bubble.PNG?raw=true)


### Map (svg)
```javascript
visual_plot.init(
  {
    //target DOM
    dom:'#dom',
    //DOM style
    x:10,y:50,
    width: 500,height:400,
    //target map
	map:['NY','NJ','PA','OH','CT'], //States only
    map:['US'], //Or entire map
   //data
    data:[
     {id:'NY',color:'#81ecec'},
     {id:'PA',color:'#a29bfe'},
     {id:'NJ',color:'#fab1a0'},
     {id:'Philadelphia',color:'#d63031'},
     {id:'136',color:'#d63031'},
    ],
})
visual_plot.svgMap()
```
![](https://github.com/chen0gao/Visual-Plot/blob/main/img/svgMap.PNG?raw=true)


## To-do List
- add mouse event
- More chart style customization

## Reference
* SVG Map: https://commons.wikimedia.org/wiki/File:ZIP3_zones.svg
* Zip Code data: https://en.wikipedia.org/wiki/List_of_ZIP_Code_prefixes
