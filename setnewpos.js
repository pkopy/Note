setPosInit: function(){
    let windows = model.arrayWindows();
    let sumWidth = 0;
    let row = 0;
    let pos = 0;
    for (let i = 0; i < windows.length; i++){
        let key = Object.keys(windows[i])[0];
        //let pos = windows[i][key].col;
       
        sumWidth +=  300; 
        if(sumWidth >= window.innerWidth){
            row++;
            sumWidth = 300;
            pos = 0;
            windows[i][key].col = pos;
        }
        
        windows[i][key].top = 50 + row * 300 + 20 * row;
        windows[i][key].left = 20 + pos * 250 + 20 * pos;
        windows[i][key].col = pos;
        windows[i][key].row = row;
        pos++;
        
    }
    model.change(windows)
    console.log(windows)
    console.log(sumWidth)
    console.log(window.innerWidth)
},
newSetPos:function(){
    let windows = model.arrayWindows();
    let lastWindow = windows[windows.length - 1][windows.length - 1];
    console.log(lastWindow)
    let col = lastWindow.col;
    let row = lastWindow.row;
    let sumWidth = 300 + col * 300
    if(col === 0 && row === 0){
        octo.setPosInit()
    }else if(sumWidth >= window.innerWidth){
        row++;
        sumWidth = 300;
        let pos = col++;
        windows[windows.length - 1][windows.length - 1].top = 50 + row * 300 + 20 * row;
        windows[windows.length - 1][windows.length - 1].left = 20 + pos * 250 + 20 * pos;
        windows[windows.length - 1][windows.length - 1].col = pos;
        windows[windows.length - 1][windows.length - 1].row = row;
    }else{
        let pos = col++
        windows[windows.length-1][windows.length-1].top = 50 + row * 300 + 20 * row;
        windows[windows.length-1][windows.length-1].left = 20 + pos * 250 + 20 * pos;
        windows[windows.length-1][windows.length-1].col = pos;
        windows[windows.length-1][windows.length-1].row = row;
    }
    model.change(windows);
    console.log(col)
},