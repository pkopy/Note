(function(){
/*===MODEL===*/
let model = {
    init: function(){

    },
    arrayWindows: [],
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
        model.arrayWindows.push(window)
       
    },
    createDiv: function(){
        let windows = model.arrayWindows;
        let widgets = document.querySelectorAll('.widget')
        
            for(let window of windows){
                let flag = 0;
                let key = Object.keys(window)
                
                for(let i = 0; i < widgets.length; i++){
                    console.log(widgets[i].id)
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
                    noteDiv.className = 'widgetHelp';
                    noteDiv.style.zIndex = 0;
                    
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
        let windows = model.arrayWindows;
        for (let i = 0; i < windows.length; i++){
            let key = Object.keys(windows[i])[0];
            windows[i][key].top = 50;
            windows[i][key].left = 20 + i * 250 + 20 * i;
        }
    },
    move: function (e){
        let windows = octo.getWindows();
        let objWindow;
        let id = e.target.id;
        let clickX;
        let clickY;
        let x = e.clientX;
        let y = e.clientY;
       // console.log(e)
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
        console.log(left.style.width)
        body.style.left = x - clickX - 250 + 'px';
        body.style.top = y - clickY - 85 +'px';
       console.log(objWindow)
    },
    mouseDown: function (e){
        let windows = octo.getWindows();
        let objWindow;
        let id = e.target.id;
        console.log(e)
        for(let window of windows){
            if(Object.keys(window)[0] === id){
                objWindow = window;
                //console.log(window) 
                
            }
        }
        let body = document.getElementById(objWindow[id].id)
        objWindow[id].posX = e.offsetX;
        objWindow[id].posY = e.offsetY;
        objWindow[id].top = parseInt(body.style.top.slice(0,-2));
        objWindow[id].left = parseInt(body.style.left.slice(0,-2));
        body.addEventListener('mousemove', octo.move)
        
        
    },
    getWindows: () => model.arrayWindows,
    getArrayLength: () => model.arrayWindows.length,
    changeColor: function(start, end, elem){
        let head = document.getElementById('head')
        let r = start.r;
        let g = start.g;
        let b = start.b;
        console.log(r,g,b)
        elem.removeEventListener('click', viewHead.renderHead)
        
        let rgb = model.head
        let id = setInterval(function(){
            r = octo.changeValue(r, end.r)
            g = octo.changeValue(g, end.g)
            b = octo.changeValue(b, end.b)
            
            
            head.style.backgroundColor = 'rgb('+ r + ',' + g + ',' + b +')';
            //console.log(r,g,b)
            if(r>= end.r && b >= end.b && g >=end.g){
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
       // document.getElementById('left').addEventListener('click', octo.test)
    },
    render: function(){
        let windows = octo.getWindows();
        let newNote = document.getElementById('newNote')
        for(let window of windows){
            let key = Object.keys(window)
            let elem = document.getElementById(window[key].id)
            elem.style.left = window[key].left + 'px';
            elem.style.top = window[key].top + 'px';
            elem.addEventListener('mousedown', octo.mouseDown);

        }
        newNote.addEventListener('click',function(){
            octo.newWindow();
            octo.setPos()
            octo.createDiv();
            
        })
        console.log(windows)
    }

};
let viewHead = {
    init: function() {
        window.addEventListener('scroll', function(){
            let head = document.getElementById('head')
            let body = document.documentElement
            let scroll = body.scrollTop
            console.log(scroll)
            head.className = 'head'
            if(scroll === 0){
                head.className ='';
            }
        })
        viewHead.render();
    },
    render: function() {
        let menus = document.getElementsByClassName('menuText') 
        console.log(menus)
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
