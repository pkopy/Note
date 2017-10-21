(function(){
/*===MODEL===*/
let model = {
    init: function(){
        if (!localStorage.notes) {
            localStorage.notes = JSON.stringify([]);
        }
    },
    arrayWindows: function(){
        return JSON.parse(localStorage.notes); 
    },
    add: function(obj){
        let data = JSON.parse(localStorage.notes) ;
        data.push(obj);
        localStorage.notes = JSON.stringify(data);
    },
    change: function(windows){
        localStorage.notes = JSON.stringify(windows);
    },
    head:{
        start:{
            r: 102,
            g: 187,
            b: 65
        },
        end:{
            r: 65,
            g: 104,
            b: 187
        }
    },
    h3Notes:{
        r: 102,
        g: 187,
        b: 65
    },
    projects:{
        r: 65,
        g: 104,
        b: 187
    },
    palette:{
        r: 65,
        g: 104,
        b: 187
    },
    white:{
        r: 255,
        g: 255,
        b: 255
    },
    red:{
        r: 245,
        g: 151,
        b: 151
    },
    blue:{
        r: 152,
        g: 152,
        b: 252
    },
    green:{
        r: 210,
        g: 248,
        b: 148
    },
    yellow: {
        r: 235,
        g: 253,
        b: 0
    },
    pink:{
        r: 255,
        g: 192,
        b: 103
    }
}
/*===OCTO===*/
let octo = {
    init: function(){
        model.init();
        view.init();
        octo.setPos();
        view.render();
        viewHead.init();
    },
    newWindow: function(name = '', width = 250, height = 300){
        let window = {}
        name = name + octo.getArrayLength();
        window[name] = {
            id: name,
            col: octo.getArrayLength(),
            row: 0,
            backgroundColor: {r: 255, g: 255, b: 255},
            position: 'absolute',
            zIndex: 999,
            left: 0,
            top: 0,
            width: width,
            height: height,
            posX: 0,
            posY: 0,
            cursor: '',
            title: '',
            content: '',
        }
        model.add(window)
       
    },
    createDiv: function(){
        let windows = model.arrayWindows();
        //console.log(windows)
        let widgets = document.querySelectorAll('.widget')
        
            for(let window of windows){
                let flag = 0;
                let key = Object.keys(window)
                
                for(let i = 0; i < widgets.length; i++){
                   // console.log(widgets[i].id)
                    if(widgets[i].id === key[0]){
                        flag++;
                    }
                }
                if(flag === 0){
                    
                    let noteDiv = document.createElement('div')
                    noteDiv.id = window[key].id;
                    
                    noteDiv.style.position = window[key].position;
                    noteDiv.style.width = window[key].width + 'px';
                    noteDiv.style.height = window[key].height + 'px';
                    noteDiv.style.top = window[key].top + 'px';
                    noteDiv.style.left = window[key].left + 'px';
                    noteDiv.style.boxShadow =' 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
                    noteDiv.style.backgroundColor = window[key].backgroundColor;
                    noteDiv.className = 'widget';
                    noteDiv.style.zIndex = 0;
                    noteDiv.style.border = '1px solid #ffffff';
                    noteDiv.style.borderRadius = '2px';
                    let helpDiv = document.createElement('div')
                    helpDiv.id = window[key].id;
                    helpDiv.style.position = window[key].position;
                    helpDiv.style.width = window[key].width - 2 + 'px';
                    helpDiv.style.height = window[key].height -2 + 'px';
                    helpDiv.style.position = 'absolute'
                    helpDiv.style.top = '0px'
                    helpDiv.className = 'widgetHelp';
                    noteDiv.style.zIndex = 0;
                    let toolsDiv = document.createElement('div');
                    toolsDiv.style.position = 'absolute';
                    toolsDiv.className = 'tools'
                    toolsDiv.style.height = '40px';
                    toolsDiv.style.width = '100%';
                    toolsDiv.style.padding = '2px' 
                    toolsDiv.style.bottom = '0px';
                    //toolsDiv.style.visibility = "hidden"
                    let icon1 = document.createElement('span');
                    icon1.className = 'material-icons md 36 icon xx';
                    icon1.innerHTML = 'palette'
                    icon1.style.opacity ='0.6'
                    icon1.id = window[key].id
                    let icon2 = document.createElement('span');
                    icon2.className = 'material-icons md 36 icon xx1';
                    icon2.innerHTML = 'delete'
                    icon2.style.opacity ='0.6'
                    icon2.id = window[key].id
                    //icon1.style.opacity ='0.5'
                    toolsDiv.appendChild(icon1)
                    toolsDiv.appendChild(icon2)
                    helpDiv.appendChild(toolsDiv)
                    
                    //noteDiv.style.top = '100px'
                    txt = document.createElement('h1');
                    txt.innerHTML = window[key].id;
                    noteDiv.appendChild(txt);
                    noteDiv.appendChild(helpDiv)
                    document.getElementById('notes').appendChild(noteDiv)
                }
                
            }
          
        
    },
    setPos: function(){
        let windows = model.arrayWindows();
        for (let i = 0; i < windows.length; i++){
            let key = Object.keys(windows[i])[0];
            let pos = windows[i][key].col
            windows[i][key].top = 50;
            windows[i][key].left = 20 + pos * 250 + 20 * pos;
        }
        model.change(windows)
    },
    move: function (e){
        let windows = octo.getWindows();
        let objWindow;
        let id = e.target.id;
        let obj = e.target;
        let clickX;
        let clickY;
        let x = e.clientX;
        let y = e.clientY;
        for(let window of windows){
            
            if(Object.keys(window)[0] === id){
                objWindow = window; 
            }

        }
        
        clickX = objWindow[id].posX;
        clickY = objWindow[id].posY;
        let body = document.getElementById(objWindow[id].id)
        let left = document.getElementById('left');
        body.style.left = x - clickX -250  + 'px';
        body.style.top = y  - clickY - 50 +'px';
    },
    mouseUp:function(obj){
        obj.removeEventListener('mousemove', octo.move);
        let x;
        let windowCopy;
        let windows = octo.getWindows();
        let left = obj.style.left.slice(0, -2)
        console.log('left: ', left)
        console.log('oryginal: ', windows[obj.id][obj.id].id)
        if(left >= 20 && left <= 150){
            x = 0;
            windows[obj.id][obj.id].col = x;
            
            console.log(windows[obj.id][obj.id].col)
            windowCopy = windows[obj.id];
            console.log('copy: ', windows[obj.id])
            //windows.splice(windows[obj.id], 1)
            for(let window of windows){
                let key = Object.keys(window)
                if(key[0] !== windows[obj.id][obj.id].id){
                    console.log(key)
                    windows[key][key].col = x + 1;
                    console.log(window[key].col)

                }
                
            }
            
            model.change(windows)
            console.log(windows)
        }
       //windows.splice(x, 0, windowCopy)
        model.change(windows)
        octo.setPos();
        view.render();
    },
    mouseDown: function (e){
        let windows = octo.getWindows();
        let objWindow;
        let id = e.target.id;
        e.stopPropagation();
        console.log(windows[id][id].col)
        for(let i = 0; i < windows.length; i++){
            //console.log(windows)
           // windows[i][i].col = 0;
        }
        for(let window of windows){
            if(Object.keys(window)[0] === id){
                let body = document.getElementById(window[id].id)
                objWindow = window;
                window[id].posX = e.offsetX;
                window[id].posY = e.offsetY;
                window[id].top = parseInt(body.style.top.slice(0,-2));
                window[id].left = parseInt(body.style.left.slice(0,-2));
                model.change(windows)  
            }
            
            
        }
        if(id !== '' && !isNaN(id)){
            let body = document.getElementById(objWindow[id].id);
            body.addEventListener('mousemove', octo.move);
            
        }else{
            return
        }
    },
    getWindows: () => model.arrayWindows(),
    getArrayLength: () => model.arrayWindows().length,
    changeColor1: function(start, end, elem){
        
        let r = start.r;
        let g = start.g;
        let b = start.b;
        let absR = Math.abs(r-end.r)
        let absG = Math.abs(g-end.g)
        let absB = Math.abs(b-end.b)
        let max = Math.max(Math.max(absR, absG), absB);
        let rgb = model.head
        let id = setInterval(function(){    
            r = octo.changeValue(r, end.r)
            g = octo.changeValue(g, end.g)
            b = octo.changeValue(b, end.b)
            max--;
            elem.style.backgroundColor = 'rgb('+ r + ',' + g + ',' + b +')';
            if(max <= 0){
                clearInterval(id)
                let idx = elem.id;
                let windows = octo.getWindows();
                for(let window of windows){
                    if(Object.keys(window)[0] === idx){
                        let body = document.getElementById(window[idx].id)
                        window[idx].backgroundColor = end;
                        model.change(windows)
                    }
                }    
           }
        }, 1)
    },
    changeColor: function(start, end, elem){
        let head = document.getElementById('head')
        let r = start.r;
        let g = start.g;
        let b = start.b;
        let text = elem.textContent.toUpperCase();
        let menuLeft = document.querySelectorAll('.iconLeft')
        for(let menu of menuLeft){
            elem.removeEventListener('click', viewHead.renderHead)
        }
        
        let absR = Math.abs(r-end.r)
        let absG = Math.abs(g-end.g)
        let absB = Math.abs(b-end.b)
        let max = Math.max(Math.max(absR, absG), absB);
        let rgb = model.head
        let id = setInterval(function(){
            r = octo.changeValue(r, end.r)
            g = octo.changeValue(g, end.g)
            b = octo.changeValue(b, end.b)
            max--;
            head.style.backgroundColor = 'rgb('+ r + ',' + g + ',' + b +')';
            head.style.color = 'white';
            let textHead = document.getElementById('headText')
            textHead.firstChild.textContent = text;
            if(max <= 0){
                clearInterval(id)
                octo.changeHead(rgb.start, end)
                for(let menu of menuLeft){
                    elem.addEventListener('click', viewHead.renderHead)
                }
            }
        }, 10)
    },
    changeValue: function(value, end){
        if(value > end){
            value--;
            return value
        }else{
             value++
             return value
        }
    },
    getHead: model.head,
    changeHead: function(start, end){
        model.head.start.r = end.r
        model.head.start.g = end.g
        model.head.start.b = end.b
    },
    getColor: function(id){
        return model[id];
    },
    
    changeColorNote: function(e){
        let obj = e;
        obj.target.removeEventListener('click', octo.changeColorNote)
        let endId = obj.target.id;
        let elem = obj.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        let id = obj.target.parentNode.parentNode.parentNode.parentNode.id
        let start
        let windows = octo.getWindows();
        for(let window of windows){
            if(Object.keys(window)[0] === id){
                let body = document.getElementById(window[id].id)
                start = window[id].backgroundColor
            }
        }    
        let end = octo.getColor(endId)
        octo.changeColor1(start, end, elem)
    },
    delete: function(e){
        let windows = octo.getWindows();
        let id = e.target.parentNode.parentNode.parentNode.id
        for(let window of windows){
            if(Object.keys(window)[0] === id){
                let body = document.getElementById(window[id].id)
                start = window[id].backgroundColor
                windows.splice(id, 1)
                model.change(windows)
                
            }
        }
    }

}
/*===VIEW===*/
let view = {
    init: function(){
        octo.createDiv();
        let newNote = document.getElementById('newNote')
        newNote.addEventListener('click',view.newNote)
        let windows = octo.getWindows();
       
        for(let window of windows){
            let key = Object.keys(window)
            let elem = document.getElementById(window[key].id)
            elem.style.left = window[key].left + 'px';
            elem.style.top = window[key].top + 'px';
            elem.style.backgroundColor = 'rgb(' + window[key].backgroundColor.r + ',' + window[key].backgroundColor.g + ',' + window[key].backgroundColor.b + ')';
            elem.addEventListener('mousedown', octo.mouseDown);
            let tool = elem.childNodes[1].firstChild;
            let icon1 = tool.firstChild;
            elem.addEventListener('mouseover', function(){
               tool.className = 'tools1'
            })
            elem.addEventListener('mouseout', function(){
               tool.className = 'tools'
            //octo.mouseUp(elem)
            })
            elem.addEventListener('mouseup', function(){
               return octo.mouseUp(elem)
            })
        }
        let icons = document.querySelectorAll('.xx')
        for(let icon of icons){
        icon.addEventListener('mouseover', function(){
            let palette = document.getElementById('palette')
            palette.style.position = 'absolute';
            palette.style.left = '10px';
            palette.style.bottom = '37px';
            palette.style.display = 'block'
            icon.style.opacity = '1'
            let backColor = this.parentNode.parentNode.parentNode
            icon.appendChild(palette)
            icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
                palette.addEventListener('click', octo.changeColorNote)
            })
            icon.addEventListener('mouseout', function(){
                icon.style.opacity = '0.5'
                palette.style.display = 'none'
                icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
            })
        }
        let icons1 = document.querySelectorAll('.xx1')
        for(let icon of icons1){
            icon.addEventListener('mouseover', function(){
                icon.style.opacity = '1'
                icon.appendChild(palette)
                icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
            })
            icon.addEventListener('mouseout', function(){
                icon.style.opacity = '0.5'
                palette.style.display = 'none'
                icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
            })
       }
    },
    
    render: function(){
        let windows = octo.getWindows();
        //console.log(windows)
        for(let window of windows){
            
            let key = Object.keys(window)
            let elem = document.getElementById(window[key].id)
            elem.style.left = window[key].left + 'px';
            elem.style.top = window[key].top + 'px';
        }
    },
    newNote: function(){
        octo.newWindow();
        octo.createDiv();
        octo.setPos()
        view.init();
        view.render();  
    }

};
let viewHead = {
    init: function() {
        window.addEventListener('scroll', function(){
            let head = document.getElementById('head')
            let body = document.documentElement
            let scroll = body.scrollTop
            //console.log(scroll)
            head.className = 'head'
            if(scroll === 0){
                head.className ='';
            }
        })
        viewHead.render();
    },
    render: function() {
        let menus = document.getElementsByClassName('menuText') 
        for(let i = 0; i < menus.length; i++) {
            menus[i].addEventListener('click', viewHead.renderHead)
        }
        
    },
    renderHead: function(e){
        let elem = e.target;
        let endId = e.target.id
        let end = octo.getColor(endId)
        let start = model.head.start
        console.log('head color start: ' + start.r + ':'+ start.g + ':' + start.b)
        octo.changeColor(start, end, elem)
    }
}

octo.init();
})()
