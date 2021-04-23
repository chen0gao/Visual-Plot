VisualPlot.prototype.svgMap =
function() {
  var newScript = document.createElement("script");
  newScript.src = "visual_plot/data/map_data.js";
  document.querySelector('body').appendChild(newScript);

  d3.xml('visual_plot/data/ZIP3_zones.svg')
  .then(svg => {
    const old_svg = svg.documentElement
    d3.select(this.dom)._groups[0][0].append(old_svg)
    d3.select(this.dom+` svg`).attr("width", this.x+this.width)
    .attr("height",this.y+this.height);

    this.container = d3.select(this.dom+` svg`).append('g')
    let state_container = this.container._groups[0][0]

    //Filter out unused states
    if(this.map.filter(d=>d.toLowerCase()=='us').length==0) {

      this.map.forEach((area, i) => {

        if(area.length==2 && isNaN(area))  {//State
          var stateDOM = [...document.querySelectorAll('#map svg g')].filter(state=>state.id.toLowerCase()
          ==area.toLowerCase())[0]
          state_container.appendChild(stateDOM)
        } else if (area.length>2 && isNaN(area)) { //City
          var cityAllDOM = this.mapdata.filter(d=>d.city.toLowerCase().includes(area.toLowerCase()));

          cityAllDOM.forEach((citys, i) => {
            var cityDOM = [...document.querySelectorAll('#map svg path')].filter(city=>parseInt(city.id)
            ==parseInt(citys.zip))[0]

            if(!cityDOM) return;
            state_container.appendChild(cityDOM)
          });

        }

      })

    } else { //Entire map
      document.querySelectorAll('#map svg g').forEach((state, i) => {
        if(state_container!=state)
        state_container.appendChild(state)
      })
    }

    document.querySelectorAll('#map svg g').forEach((g_dom, i) => {
      if(g_dom.parentNode!=state_container)
      d3.select(this.dom+` [id='${g_dom.id}']`).remove()
    });


    //Scale the container
    let svg_width = state_container.getBoundingClientRect().width,
    svg_height= state_container.getBoundingClientRect().height,
    svg_x = state_container.getBoundingClientRect().x,
    svg_y = state_container.getBoundingClientRect().y;

    var scale = 1
    if(this.width>=this.height) { //Landscape Container
      scale = (svg_width>=svg_height+5)? this.width/svg_width : this.height/svg_height //5 means much large, else there is problem
    } else {  //Portrait Container
      scale = (svg_width>=svg_height+5)? this.height/svg_height : this.width/svg_width
    }


    let dom_y = document.querySelector(this.dom).getBoundingClientRect().y //Scale the bottom y as well, since zoom out
    this.container.attr("transform", `translate(${this.x-svg_x*scale},${(dom_y+this.y+-svg_y)*scale}) scale(${scale})`);

    this.data.forEach((dataset, i) => {
      var area = dataset.id

      if(area.length==2 && isNaN(area))  {//State
        var stateDOM = [...document.querySelectorAll('#map svg g')].filter(state=>state.id.toLowerCase()
        ==area.toLowerCase())[0]

        if(stateDOM)
        stateDOM.querySelectorAll('path').forEach((zips, i) => {
          d3.select(this.dom+` [id='${zips.id}']`)
          .style("fill",dataset.color);
        });

      } else if (area.length>2 && isNaN(area)) { //City
        var cityAllDOM = this.mapdata.filter(d=>d.city&&d.city.toLowerCase().includes(area.toLowerCase()));

        cityAllDOM.forEach((citys, i) => {
          if(![...document.querySelectorAll('#map svg path')]) return;
          var cityDOM = [...document.querySelectorAll('#map svg path')].filter(
            city=>parseInt(city.id)==parseInt(citys.zip))[0]

            if(!cityDOM) return;
            d3.select(this.dom+` [id='${cityDOM.id}']`)
            .style("fill",dataset.color);
          });

        } else { //Zip
          d3.select(this.dom+` [id='${dataset.id}']`)
          .style("fill",dataset.color);
        }

      });

      // Clean the load svg
      old_svg.style.display = 'none'
    });


  }
