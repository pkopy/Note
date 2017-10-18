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
    }
}
/*===OCTO===*/
let octo = {
    init: function(){

        
        model.init();
        //console.log(model.arrayWindows)
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
            col: 0,
            row: 0,
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
        console.log(windows)
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
                    noteDiv.style.backgroundColor = 'white';
                    noteDiv.className = 'widget';
                    noteDiv.style.zIndex = 0;
                    noteDiv.style.border = '1px solid #ffffff';
                    noteDiv.style.borderRadius = '2px';
                    let helpDiv = document.createElement('div')
                    helpDiv.id = window[key].id;
                    helpDiv.style.position = window[key].position;
                    helpDiv.style.width = window[key].width + 'px';
                    helpDiv.style.height = window[key].height + 'px';
                    helpDiv.style.position = 'absolute'
                    helpDiv.style.top = '0px'
                    helpDiv.className = 'widgetHelp';
                    noteDiv.style.zIndex = 0;
                    let toolsDiv = document.createElement('div');
                    toolsDiv.style.position = 'absolute';
                    toolsDiv.className = 'tools'
                    toolsDiv.style.height = '40px';
                    toolsDiv.style.width = '100%';
                    toolsDiv.style.bottom = '0px';
                    //toolsDiv.style.visibility = "hidden"
                    let icon1 = document.createElement('span');
                    icon1.className = 'material-icons md 36 icon';
                    icon1.innerHTML = 'palette'
                    toolsDiv.appendChild(icon1)
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
            console.log(key)
            let note = document.getElementById('key')
            
            windows[i][key].col = i;
            let pos = windows[i][key].col
            windows[i][key].top = 50;

            windows[i][key].left = 20 + pos * 250 + 20 * i;
            
        }
        console.log(windows)
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
                
                //console.log(window) 
            }
        }
        clickX = objWindow[id].posX;
        clickY = objWindow[id].posY;
        
        let body = document.getElementById(objWindow[id].id)
        let left = document.getElementById('left');
        body.removeEventListener('mousedown', octo.mouseDown)
        body.addEventListener('mouseup', function(){
            return octo.mouseUp(body)
        })
        body.style.left = x - clickX -250  + 'px';
        body.style.top = y  - clickY - 64 +'px';
       //console.log(objWindow)

    },
    mouseUp:function(obj){
        obj.removeEventListener('mousemove', octo.move);
    },
    mouseDown: function (e){
        let windows = octo.getWindows();
        let objWindow;
        let id = e.target.id;
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
        let body = document.getElementById(objWindow[id].id);
        body.addEventListener('mousemove', octo.move);
    },
    getWindows: () => model.arrayWindows(),
    getArrayLength: () => model.arrayWindows().length,
    changeColor: function(start, end, elem){
        let head = document.getElementById('head')
        let r = start.r;
        let g = start.g;
        let b = start.b;
        console.log(r,g,b)
        elem.removeEventListener('click', viewHead.renderHead)
        let a = Math.abs(r-end.r)
        let d = Math.abs(g-end.g)
        let c = Math.abs(b-end.b)
        let max = Math.max(Math.max(a, d), c);
        console.log(max)
        let rgb = model.head
        let id = setInterval(function(){
            r = octo.changeValue(r, end.r)
            g = octo.changeValue(g, end.g)
            b = octo.changeValue(b, end.b)
            
            //
            max--;
            head.style.backgroundColor = 'rgb('+ r + ',' + g + ',' + b +')';
            //console.log(r,g,b)
            if(max <= 0){
                clearInterval(id)
                //viewHead.render()
                octo.changeHead(rgb.start, end)
            }
        }, 10)
        
        console.log('end')
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
       
        console.log(model.head.start)
    },
    getColor: function(id){
        
        return model[id];
    },
    

}
/*===VIEW===*/
let view = {
    init: function(){
        octo.createDiv();
        view.newNote();
       // document.getElementById('left').addEventListener('click', octo.test)
    },
    render: function(){
        let windows = octo.getWindows();
        
        for(let window of windows){
            let key = Object.keys(window)
            let elem = document.getElementById(window[key].id)
            elem.style.left = window[key].left + 'px';
            elem.style.top = window[key].top + 'px';
            elem.addEventListener('mousedown', octo.mouseDown);
            let tool = elem.childNodes[1].firstChild;
            elem.addEventListener('mouseover', function(){
                tool.className = 'tools1'
                elem.addEventListener('mouseout', function(){
                    tool.className = 'tools'
                })
            })
        }
        
        //console.log(windows)
    },
    newNote: function(){
        let newNote = document.getElementById('newNote')
        newNote.addEventListener('click',function(){
            octo.newWindow();
            octo.setPos()
            //console.log(octo.getWindows())
            octo.createDiv();
            view.render();
            
        })
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
