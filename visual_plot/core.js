class VisualPlot {

  constructor(setting) {

    this.init(setting)
    this.date_meta = {
      col:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      month:["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]
    }
  }

  init(setting) {
    this.dom = setting.dom
    this.box_width = setting.box_width || 40;
    this.box_height = setting.box_height || 40;
    this.banner_height = setting.banner_height || this.box_height/4
    this.style = setting.style || 'normal';
    this.gap = setting.gap || 0;
    this.x = (setting.x==0)? 0 : setting.x || 100;
    this.y = (setting.y==0)? 0 : setting.y || 10;
    this.size = setting.size || 30
    this.line_length = setting.line_length || 100
    this.innerRadius = 20
    this.outerRadius = this.innerRadius + this.size //outerRadius is not access by user
    this.subtext_fontSize = setting.subtext_fontSize || 16
    this.subtext_maxString = setting.subtext_maxString || 20

    this.data = setting.data

    this.map = setting.map
    this.width = setting.width || 800
    this.height = setting.height || 500

    this.init_date = setting.date

    this.init_date_format = new Date(this.init_date)
    this.svg = d3.select(this.dom).append("svg").attr("width", 800).attr("height", 500)
  }
}
