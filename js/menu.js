import {data} from './data.js'


let menu=function(){

//Properties
  this.currency= '£'
  this.backgroundArray= {}
  this.boxes = data
  this.parent


//Methods
//Creates and array of the big background elements, keeping it ready for the animations
  this.bigBackgrounds= (key) =>{
      console.log("Background creator")
      let domElement=this.elementCreator('div','background-inner')
      domElement.setAttribute('style',"background-image:url('" + this.boxes[key].imagePointer + "');width:100%;height:auto;")
      this.backgroundArray[key]=domElement
    }

  //Method to render the grid menu on the screen
  this.render = (parent) =>{
    this.parent = parent
    for(let key in this.boxes){
        this.bigBackgrounds(key)
      let gridBox=this.elementCreator('div','gridElement')
      gridBox.setAttribute('id' ,key)
      gridBox.setAttribute('style',"background-image:url('" + this.boxes[key].imagePointer + "');")
      let title =this.elementCreator('p','sectionName')
      let cover = this.elementCreator('div','sectionCover')
      title.innerText = this.boxes[key].name
      gridBox.appendChild(cover)
      gridBox.appendChild(title)
      parent.appendChild(gridBox)
      let posX=gridBox.offsetLeft //+parent.offsetLeft
      let posY=gridBox.offsetTop +parent.offsetTop
      console.log("The x position is: " + gridBox.offsetLeft + ". The y position is " + posY)
      gridBox.addEventListener('click',(event) =>{
        this.clickHandler(key,posX,posY)
      })
  }
}
  //Attach the animation  to click events on the grid elements
  this.clickHandler = (id,x,y) => {
    let that=this
    //background rendering
    let bckgr=document.getElementsByClassName('bckgr')[0]
    let coverColor=this.elementCreator('div','cover')
    bckgr.classList.add('bckgr-full')
    bckgr.appendChild(coverColor)
    bckgr.appendChild(this.backgroundArray[id])

    //title and cancel button rendering
    let cancel=document.getElementsByClassName('cancel')[0]
    cancel.addEventListener('click',this.closeMenu)
    let title=document.getElementsByClassName('title')[0];
    title.innerHTML='<p>' + this.boxes[id].name + '</p>';
    title.classList.add('title-active')
    cancel.classList.add('visible-cancel')

    //Thumbnail double rendering to the top of grid
    let thumbnailDouble=this.elementCreator('div','doubledThumbnail')
    let thumbnailContent=this.elementCreator('div','content')
    thumbnailDouble.setAttribute('style',"background-image:url('" + this.boxes[id].imagePointer + "');top:" + y + "px;left:" + x + "px;")
    thumbnailDouble.appendChild(thumbnailContent)
    document.getElementsByClassName('container')[0].appendChild(thumbnailDouble)
    setTimeout(function(){ thumbnailDouble.classList.add('elementTransformed') },300)
    setTimeout(function(){
      thumbnailDouble.classList.add('elementSizeTransformed')
      setTimeout(function(){ that.addPriceList(id,thumbnailContent) },400)
     },780)


  }
  //Method to render and style the table with the price list of each menu item
    this.addPriceList = (key, target) => {
      //fetch the data
      let data= this.boxes[key]
      let priceTable=this.elementCreator('table','priceTable')
      if(data.multiple == true){
        console.log("Sublisting needed")
        for(let subItem in data.list){
          //subitem names
          let mainTr = this.elementCreator('tr')
          let tdItem = this.elementCreator('td')
            tdItem.innerHTML="<p>" + subItem + "</p>"
            mainTr.appendChild(tdItem)
            priceTable.appendChild(mainTr)
            //subitem listing
            data.list[subItem].forEach(sub => {
              let subTr = this.elementCreator('tr')
              let tdItem = this.elementCreator('td')
                //subitem name
                tdItem.innerHTML="<p class='subitem'>" + sub.item + "</p>"
                subTr.appendChild(tdItem)
                //subitem price
                let tdPrice = this.elementCreator('td')
                let price = this.currency + sub.price
                tdPrice.innerText = price
                subTr.appendChild(tdPrice)
                priceTable.appendChild(subTr)
            })
        }
      }else{
      //initiate the table

      data.list.forEach(d =>{
        let tr = this.elementCreator('tr')
            let tdItem = this.elementCreator('td')
              tdItem.innerHTML="<p>" + d.item + "</p>"
              tr.appendChild(tdItem)

            let tdPrice = this.elementCreator('td')
              let price = this.currency + d.price
              tdPrice.innerText = price
              tr.appendChild(tdPrice)

        priceTable.appendChild(tr)
      })

      }
      target.appendChild(priceTable)

    }
  //Method to create cusomt div elements with specific class name
    this.elementCreator = (type,className)  => {
    let el=document.createElement(type)
    if(typeof(className) != "undefined")  el.classList.add(className)
    return el

  }
  //method to handle the close button action
  this.closeMenu = () => {
    console.log("Menu closing triggered")
    let toRemove=document.getElementsByClassName('doubledThumbnail')[0]
    let background= document.getElementsByClassName('bckgr')[0]
    let cancel=document.getElementsByClassName('cancel')[0]
    let cover=document.getElementsByClassName('cover')[0]
    document.getElementsByClassName('title')[0].classList.remove('title-active')
    cover.setAttribute("style","background-color:#3b3a38;")
    toRemove.parentNode.removeChild(toRemove)
    setTimeout(function(){ background.innerHTML='' },700)
    background.classList.remove('bckgr-full')
    cancel.classList.remove('visible-cancel')

  }
}

export {menu}
