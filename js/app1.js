(function(){
    /*===MODEL===*/
        let model = {
        /*init: function(){
           if (!myJSONfromFile) {
               //console.log(myJSONfromFile)
               myJSONfromFile = JSON.stringify([]);
            }
        },
        arrayWindows: function(){
            return JSON.parse(myJSONfromFile); 
        },
        add: function(obj){
            data = JSON.parse(myJSONfromFile);
            data.push(obj);
            myJSONfromFile = JSON.stringify(data);
        },
        change: function(windows){
            myJSONfromFile = JSON.stringify(windows);
            //console.log(myJSONfromFile)
           var xhr = new XMLHttpRequest();
            //console.log('UNSENT', xhr.readyState); // readyState will be 0
    
            xhr.open('POST', 'writeFile.php', true);
            //console.log('OPENED', xhr.readyState); // readyState will be 1
    
            xhr.onprogress = function () {
            // console.log('LOADING', xhr.readyState); // readyState will be 3
            };
    
            xhr.onload = function () {
             //   console.log('DONE', xhr.readyState); // readyState will be 4
            };
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            //console.log(myJSONfromFile)
            xhr.send("x=" + myJSONfromFile);
            //console.log(xhr.send("x=" + myJSONfromFile))*/
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
    };
    /*===OCTO===*/
        let octo = {
        init: function(){
            model.init();
            view.init();
            octo.setPosInit();
            view.render();
            viewHead.init();
            
        },
        newWindow: function(name='', width = 250, height = 300){
            windowNote = {};
            
            name = name + octo.getArrayLength();
            windowNote[name] = {
                id: name,
                col: '',
                row: '',
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
                date: octo.date()
            };
            model.add(windowNote);
           
        },
        date: function(){
            date = new Date();
            day = ['Nd', 'Pon', 'Wto', 'Śr', 'Czw', 'Pt', 'So'];
            month = ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'];
            minutes = date.getMinutes();
            sec = date.getSeconds();
            function zero(number){
                if(number < 10){
                    number = '0' + number;
                }else{
                    number
                }
                return number;
            }
            
            return date.getHours() + ':' + zero(minutes) + ':' + zero(sec) +' - ' + 
            date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear()
        },
        createDiv: function(){
            windows = model.arrayWindows();
            widgets = document.querySelectorAll('.widget');
            
                for(let windowNote of windows){
                    let flag = 0;
                    let key = Object.keys(windowNote);
                    for(let i = 0; i < widgets.length; i++){
                        if(widgets[i].id === key[0]){
                            flag++;
                        }
                    }
                    if(flag === 0){
                        
                        let noteDiv = document.createElement('div')
                        noteDiv.id = windowNote[key].id;
                        
                        noteDiv.style.position = windowNote[key].position;
                        noteDiv.style.width = windowNote[key].width + 'px';
                        noteDiv.style.height = windowNote[key].height + 'px';
                        noteDiv.style.top = windowNote[key].top + 'px';
                        noteDiv.style.left = windowNote[key].left + 'px';
                        noteDiv.style.boxShadow =' 0 1px 1px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
                        noteDiv.style.backgroundColor =windowNote[key].backgroundColor;
                        noteDiv.className = 'widget';
                        noteDiv.style.zIndex = 0;
                        noteDiv.style.border = '1px solid #ffffff';
                        noteDiv.style.borderRadius = '2px';
                        var helpDiv = document.createElement('div');
                        helpDiv.id = windowNote[key].id;
                        helpDiv.style.position = windowNote[key].position;
                        helpDiv.style.width = windowNote[key].width - 2 + 'px';
                        helpDiv.style.height = windowNote[key].height -2 + 'px';
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
                        let icon1 = document.createElement('span');
                        icon1.className = 'material-icons md 36 icon xx';
                        icon1.innerHTML = 'palette'
                        icon1.style.opacity ='0.6'
                        icon1.id = windowNote[key].id
                        let icon2 = document.createElement('span');
                        icon2.className = 'material-icons md 36 icon xx1';
                        icon2.innerHTML = 'delete'
                        icon2.style.opacity ='0.6'
                        icon2.id = windowNote[key].id
                        toolsDiv.appendChild(icon1)
                        toolsDiv.appendChild(icon2)
                        
                        let txt = document.createElement('h1');
                        txt.className = 'title'
                        txt.innerHTML = windowNote[key].title;
                        let dateTxt = document.createElement('p')
                        dateTxt.innerHTML = windowNote[key].date
                        dateTxt.className = 'date'
                        let contentTxt = document.createElement('p');
                        contentTxt.innerHTML = windowNote[key].content;
                        contentTxt.className = 'content'
                       
                        noteDiv.appendChild(txt);
                        noteDiv.appendChild(dateTxt);
                        noteDiv.appendChild(contentTxt);
                        helpDiv.appendChild(toolsDiv)
                        noteDiv.appendChild(helpDiv)
                        
                        document.getElementById('notes').appendChild(noteDiv)
                    }
                    
                }
              
            
        },
        createDivPalette: function() {
            let palette = document.createElement('div');
            let white = document.createElement('div');
            let blue = document.createElement('div');
            let green = document.createElement('div');
            let red = document.createElement('div');
            let pink = document.createElement('div');
            let yellow = document.createElement('div');
            palette.id = 'palette';
            palette.style.position = 'absolute';
            white.id = 'white';
            white.className = 'colors';
            blue.id = 'blue';
            blue.className = 'colors';
            green.id = 'green';
            green.className = 'colors';
            red.id = 'red';
            red.className = 'colors';
            pink.id = 'pink';
            pink.className = 'colors';
            yellow.id = 'yellow';
            yellow.className = 'colors';
            palette.appendChild(white);
            palette.appendChild(blue);
            palette.appendChild(green);
            palette.appendChild(red);
            palette.appendChild(pink);
            palette.appendChild(yellow);
            document.getElementById('notes').appendChild(palette)
        },
        setPosInit: function(){
            let windows = model.arrayWindows();
            let sumWidth = 0;
            let row = 0;
            let pos = 0;
            
            for (let i = 0; i < windows.length; i++){
                let key = Object.keys(windows[i])[0];
                //let pos = windows[i][key].col;
                
                sumWidth +=  330; 
                if(sumWidth >= window.innerWidth){
                    row++;
                    sumWidth = 330;
                    pos = 0;
                }
                
                windows[i][key].top = 50 + row * 300 + 20 * row;
                windows[i][key].left = 20 + pos * 250 + 20 * pos;
                windows[i][key].col = pos;
                windows[i][key].row = row;
                pos++;
                
            }
            model.change(windows)
        },
        newSetPos:function(){
            let windows = model.arrayWindows();
            let lastWindow = windows[windows.length - 2][windows.length - 2];
            let pos = lastWindow.col;
            let row = lastWindow.row;
            let sumWidth = 300 + pos * 300
            if(windows.length === 1){
                octo.setPosInit();
            
            }else if(sumWidth >= window.innerWidth){
                row++;
                sumWidth = 300;
                pos++;
                windows[windows.length - 1][windows.length - 1].top = 50 + row * 300 + 20 * row;
                windows[windows.length - 1][windows.length - 1].left = 20 + pos * 250 + 20 * pos;
                windows[windows.length - 1][windows.length - 1].col = pos;
                windows[windows.length - 1][windows.length - 1].row = row;
            }else{
                pos++;
                windows[windows.length-1][windows.length-1].top = 50 + row * 300 + 20 * row;
                windows[windows.length-1][windows.length-1].left = 20 + pos * 250 + 20 * pos;
                windows[windows.length-1][windows.length-1].col = pos;
                windows[windows.length-1][windows.length-1].row = row;
            }
            model.change(windows);
            
        },
        setPos: function(){
            let windows = model.arrayWindows();
            let sumWidth = 250;
            let row = 0;
            let pos = 0;
            for (let i = 0; i < windows.length; i++){
                let key = Object.keys(windows[i])[0];
                let pos = windows[i][key].col;
                let row = windows[i][key].row;
                windows[i][key].top = 50 + row * 300 + 20 * row;
                windows[i][key].left = 20 + pos * 250 + 20 * pos;
               // windows[i][key].col = pos;
               // windows[i][key].row = row;
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
            let arrHelpCol = [];
            let arrHelpRow = [];
            for(let windowNote of windows){
                let idObj = Object.keys(windowNote)[0];
                arrHelpCol.push(windowNote[idObj].col);
                arrHelpRow.push(windowNote[idObj].row);
                if(Object.keys(windowNote)[0] === id){
                    objWindow = windowNote; 
                }
            }
           let maxRow = octo.max(arrHelpRow);    
           let maxCol = octo.max(arrHelpCol);
           let position = octo.findPosition(obj, maxCol) ;
           let allPos = []; 
             for(let i = 0; i < windows.length; i++){
                let x = windows[i][i]
                let pos = octo.findPosition(windows[i][i], maxCol)
                allPos.push({
                    id: x.id,
                    pos: pos 
                });
            } 
            let bod = document.documentElement
            let scroll = bod.scrollTop
            clickX = objWindow[id].posX;
            clickY = objWindow[id].posY;
            let body = document.getElementById(objWindow[id].id)
            let left = document.getElementById('left');
            body.style.left = x - clickX -250  + 'px';
            body.style.top = y  - clickY - 50 + scroll +'px';
            let oldCol = windows[obj.id][obj.id].col
            let oldRow = windows[obj.id][obj.id].row
            let oldLeft = windows[obj.id][obj.id].left
            let oldTop = windows[obj.id][obj.id].top
            let left1 = obj.parentNode.style.left.slice(0, -2)
            let top = obj.parentNode.style.top.slice(0, -2)
            for(let i = 0; i < maxCol; i++){
                if(oldLeft - left1 > 0){
                    if(left1 >= (20 - clickX + (i * 250)) && left1 <= (250 - clickX + (i * 250))  && windows[obj.id][obj.id].col !== i){
                        x = i;
                        windows[obj.id][obj.id].col = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                            for(let allPo of allPos){
                                if((allPo.pos + 1) === position){
                                    windows[allPo.id][allPo.id].col = colStart + 1
                                }
                            }    
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }
            for(let i = 0; i < maxCol + 1; i++){ 
                if(oldLeft - left1 < 0){
                    if(left1 >= (20 + (i * 250)) && left1 <= (250  + (i * 250))  && windows[obj.id][obj.id].col !== i){
                        x = i;
                        windows[obj.id][obj.id].col = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                            for(let allPo of allPos){
                                if((allPo.pos - 1) === position){
                                    windows[allPo.id][allPo.id].col = colStart - 1
                                 }
                            }    
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }    
            for(let i = 0; i < maxRow; i++){
                if(oldTop - top > 0){
                    if(top >= (50 - clickY + (i * 300)) && top <= (300 - clickY
                         + (i * 300))  && windows[obj.id][obj.id].row !== i){
                        x = i;
                        windows[obj.id][obj.id].row = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                            for(let allPo of allPos){
                                if((allPo.pos + maxCol + 1) === position){
                                    windows[allPo.id][allPo.id].row = rowStart + 1
                                }
                            }    
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }  
            for(let i = 0; i < maxRow + 1; i++){
                if(oldTop - top < 0){
                    if(top >= (50 - clickY + (i * 300)) && top <= (300 - clickY
                         + (i * 300))  && windows[obj.id][obj.id].row !== i){
                        x = i;
                        windows[obj.id][obj.id].row = x;
                        let key = Object.keys(windows[obj.id])
                        let colStart = windows[key][key].col
                        let rowStart = windows[key][key].row
                            for(let allPo of allPos){
                                if((allPo.pos - maxCol - 1) === position){
                                    windows[allPo.id][allPo.id].row = rowStart - 1
                                }
                            }    
                        model.change(windows)
                        octo.setPos();
                        view.render();
                    }
                }
            }      
        },
        max: function(arr){
            let maxCallback = (max, cur) => Math.max(max, cur); 
            let maxCol = arr.reduce(maxCallback)
            return maxCol;
        },
        findPosition: function(obj, max){
            let windows = octo.getWindows();
            let col = windows[obj.id][obj.id].col;
            let row  = windows[obj.id][obj.id].row;
            let pos = (col + (row * (max + 1)))
            return pos;
        },
        mouseUpremove: function(obj){
            obj.removeEventListener('mousemove', octo.move);
            octo.setPos()
            view.render();
        },
        mouseUp:function(obj){
            obj.removeEventListener('mousemove', octo.move);
            let x;
            let windowCopy;
            let windows = octo.getWindows();
            let left = obj.style.left.slice(0, -2)
            view.render();
        },
        mouseDown: function (e){
            
            let windows = octo.getWindows();
            let objWindow;
            let id = e.target.id;
            e.stopPropagation();
            for(let windowNote of windows){
                if(Object.keys(windowNote)[0] === id){
                    let body = document.getElementById(windowNote[id].id)
                    objWindow = windowNote;
                    windowNote[id].posX = e.offsetX;
                    windowNote[id].posY = e.offsetY;
                    windowNote[id].top = parseInt(body.style.top.slice(0,-2));
                    windowNote[id].left = parseInt(body.style.left.slice(0,-2));
                    model.change(windows)  
                }
            }
            if(id !== '' && !isNaN(id)){
                let widgets = document.querySelectorAll('.widget');
                for(let widget of widgets){
                    widget.style.zIndex = '0';
                }
                let body = document.getElementById(objWindow[id].id);
                body.style.zIndex = '999'
    
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
                    for(let windowNote of windows){
                        if(Object.keys(windowNote)[0] === idx){
                            let body = document.getElementById(windowNote[idx].id)
                            windowNote[idx].backgroundColor = end;
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
        changeValue: function(value, end, x){
            x = x || 1;
            if(value > end){
                value -= x;
                return value
            }else{
                 value += x;
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
            for(let windowNote of windows){
                if(Object.keys(windowNote)[0] === id){
                    let body = document.getElementById(windowNote[id].id)
                    start = windowNote[id].backgroundColor
                }
            }    
            let end = octo.getColor(endId)
            octo.changeColor1(start, end, elem)
        },
        delete: function(e){
            let windows = octo.getWindows();
            let id = e.target.parentNode.parentNode.parentNode.id
<<<<<<< HEAD
            id = id * 1;
            let arrHelp = [];
            for(let i = 0; i < id; i++){
                arrHelp.push(windows[i])
            }
            let widgets = document.querySelectorAll('.widget')
           for(let i = id; i < windows.length - 1; i++){
                let copyWindow = windows[i]
                windowNote = {};
                windowNote[i] = {
                    id: i,
                    col: copyWindow[i].col ,
                    row: copyWindow[i].row,
                    backgroundColor: windows[i+1][i+1].backgroundColor,
                    position: 'absolute',
                    zIndex: 999,
                    left: copyWindow[i].left,
                    top: copyWindow[i].top,
                    width: windows[i+1][i+1].width,
                    height: windows[i+1][i+1].height,
                    posX: 0,
                    posY: 0,
                    cursor: '',
                    title: windows[i+1][i+1].title,
                    content: windows[i+1][i+1].content,
                    date: windows[i+1][i+1].date
                    
                };

                arrHelp.push(windowNote)
            }
            model.change(arrHelp);
            for(let widget of widgets){
                widget.remove()
            }
            octo.init()
=======
            for(let windowNote of windows){
                if(Object.keys(windowNote)[0] === id){
                    let body = document.getElementById(windowNote[id].id)
                    start = windowNote[id].backgroundColor
                    windows.splice(id, 1)
                    model.change(windows)
                    
                }
            }
>>>>>>> parent of 866c497... function delete
        },
        resizeWindow: function(){
            //console.log(widthWindow)
            let windows = octo.getWindows();
            let widthWindow = window.innerWidth - 250;
            let arrHelpCol = [];
            for(let windowNote of windows){
                let idObj = Object.keys(windowNote)[0];
                arrHelpCol.push(windowNote[idObj].col);
            } 
            let maxCol = octo.max(arrHelpCol);
            if(widthWindow < (maxCol + 1) * 300){
                octo.setPosInit();
                view.render();
                
            }
            if(widthWindow - (maxCol + 1) * 300 > 300){
                octo.setPosInit();
                view.render();
                
            }
        },
        clickNote: function(e){
            let windows = octo.getWindows();
            let id = e.target.parentNode.id
            let obj = windows[id]
            let body = document.getElementById(id)
            body.removeEventListener('mousedown', octo.mouseDown)
            body.removeEventListener('mouseup', octo.mouseUp)
            body.removeEventListener('mouseup', octo.mouseUpremove)
            body.style.display = 'none' 
            let divWrite = document.createElement('div')
            divWrite.style.width = '400px';
            divWrite.style.height = '300px';
            divWrite.style.position = 'absolute'
            divWrite.style.zIndex ='1002';
            divWrite.style.left = window.innerWidth/2 - 200 + 'px';
            divWrite.style.top = window.innerHeight/2 - 200 + 'px';
            divWrite.style.border = '1px solid black'
            let r = windows[id][id].backgroundColor.r;
             let g = windows[id][id].backgroundColor.g;
              let b = windows[id][id].backgroundColor.b;
            let tytul = windows[id][id].title
            let content = windows[id][id].content
            divWrite.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let title = document.createElement('input')
            title.style.fontSize = '20px';
            title.placeholder = 'Wpisz tytuł...'
            title.value = tytul;
            title.style.padding = '20px 0px 10px 20px'
            title.style.border = 'none'
            title.style.outline = 'none'
            let dateTxt = document.createElement('p')
            dateTxt.innerHTML = windows[id][id].date
            dateTxt.className = 'date1'
            title.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let textContent = document.createElement('textarea')
            textContent.style.fontSize = '16px';
            textContent.placeholder = 'Tutaj wpisz swoją notatkę...'
            textContent.value = content;
            textContent.style.padding = '20px 0px 10px 20px'
            textContent.style.border = 'none'
            textContent.style.resize = 'none'
            textContent.style.outline = 'none'
            textContent.style.width = '380px'
            textContent.style.height = '200px';
            textContent.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
            let divBack = document.createElement('div')
            divBack.style.height = '100%';
            divBack.style.width = '110%';
            divBack.style.position = 'fixed'
            divBack.style.top = '0px';
            divBack.style.left = '0px';
            divBack.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            divBack.style.zIndex ='1001';
            divWrite.appendChild(title)
            divWrite.appendChild(dateTxt)
            divWrite.appendChild(textContent)
            document.getElementsByTagName('body')[0].appendChild(divBack)
            document.getElementsByTagName('body')[0].appendChild(divWrite)
            divBack.addEventListener('click',function(){
                windows[id][id].title = title.value;
                windows[id][id].content = textContent.value
                model.change(windows)
                body.style.display = 'inline-block';
                body.firstChild.innerHTML = windows[id][id].title
                body.childNodes[2].innerHTML = windows[id][id].content
                divBack.remove();
                divWrite.remove();
                body.addEventListener('mousedown', octo.mouseDown)
                
                
            })
        }
    }
    /*===VIEW===*/
    let view = {
        init: function(){
            octo.createDivPalette();
            octo.createDiv();
            //let body = document.getElementsByTagName('body')[0];
            window.addEventListener('resize', octo.resizeWindow)
            let newNote = document.getElementById('newNote')
            newNote.addEventListener('click',view.newNote)
            let windows = octo.getWindows();
            for(let windowNote of windows){
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                elem.style.left = windowNote[key].left + 'px';
                elem.style.top = windowNote[key].top + 'px';
                elem.style.backgroundColor = 'rgb(' + windowNote[key].backgroundColor.r + ',' + windowNote[key].backgroundColor.g + ',' + windowNote[key].backgroundColor.b + ')';
                elem.addEventListener('mousedown', octo.mouseDown);
                elem.addEventListener('dblclick', octo.clickNote);
                
                let tool = elem.childNodes[3].firstChild;
                let icon1 = tool.firstChild;
                elem.addEventListener('mouseover', function(){
                   tool.className = 'tools1'
                   //elem.className = 'widget1'
                })
                elem.addEventListener('mouseout', function(){
                    tool.className = 'tools'
                    octo.mouseUpremove(elem)
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
                icon.style.opacity = 1;
                let backColor = this.parentNode.parentNode.parentNode
                icon.appendChild(palette)
                icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
                    palette.addEventListener('click', octo.changeColorNote)
                })
                icon.addEventListener('mouseout', function(){
                    let palette = document.getElementById('palette')
                    icon.style.opacity = '0.5'
                    palette.style.display = 'none'
                    icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
                })
            }
            let icons1 = document.querySelectorAll('.xx1')
            for(let icon of icons1){
                let palette = document.getElementById('palette')
                icon.addEventListener('mouseover', function(){
                    icon.style.opacity = '1'
                    icon.appendChild(palette)
                    icon.parentNode.parentNode.parentNode.removeEventListener('mousedown', octo.mouseDown);
                })
                icon.addEventListener('mouseout', function(){
                    let palette = document.getElementById('palette')
                    icon.style.opacity = '0.5'
                    palette.style.display = 'none'
                    icon.parentNode.parentNode.parentNode.addEventListener('mousedown', octo.mouseDown);
                })
           }
           
           
        },
        
        render: function(){
            let windows = octo.getWindows();
            for(let windowNote of windows){
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                let left = elem.style.left.slice(0, -2) * 1;
                let top = elem.style.top.slice(0, -2) * 1;
                let absLeft = Math.abs(left - windowNote[key].left)
                let id = setInterval(function(){
                    
                left = octo.changeValue(left, windowNote[key].left, 8 )
                    if(left < windowNote[key].left){
                        elem.style.left = left + 'px'
                        if(left + 10 > windowNote[key].left ){
                            clearInterval(id)
                            elem.style.left = windowNote[key].left + 'px';
                        }  
                    }else{
                        elem.style.left = left + 'px'
                        if(left - 10 < windowNote[key].left ){
                            clearInterval(id)
                            elem.style.left = windowNote[key].left + 'px';
                        }
                    }
                },1)
                let id1 = setInterval(function(){
                      
                    top = octo.changeValue(top, windowNote[key].top, 8)
                    if(top > windowNote[key].top){
                        elem.style.top = top + 'px';
                        if(top -10 <= windowNote[key].top){
                            clearInterval(id1)
                            elem.style.top = windowNote[key].top + 'px';
                        }
                    }else{
                        
                        elem.style.top = top + 'px'
                        if(top + 10 >= windowNote[key].top){
                            clearInterval(id1)
                            elem.style.top = windowNote[key].top + 'px';
                        }  
                    }
                },1)
            }
        },
        renderUp: function(){
            let windows = octo.getWindows();
            for(let windowNote of windows){
                let key = Object.keys(windowNote)
                let elem = document.getElementById(windowNote[key].id)
                let left = elem.style.left.slice(0, -2) * 1;
            elem.style.left = windowNote[key].left + 'px';
            elem.style.top = windowNote[key].top + 'px';
            }
        },
        newNote: function(){
            octo.newWindow();
            octo.createDiv();
            
            octo.setPosInit()
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
                let resize = body.onresize = (x) => x + 1;
                head.className = 'head'
                if(scroll === 0){
                    head.className ='';
                }
            })
            viewHead.render();
        },
        initBody: function(){
            window.addEventListener("resize", function(){
               octo.setPosInit();
                view.render();
            }); 
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
            octo.changeColor(start, end, elem)
        }
    }
    
    octo.init();
    })()
    