import {menu} from './menu.js'

console.log('Main js loaded')

//initiate the menu and render the grid boxes of each menu item from the menu object
let container=document.getElementById('grid')
console.log("Grids left position is " + container.offsetLeft)
let m=new menu()
m.render(container)
