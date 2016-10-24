function Editor(){

var doc = document,
    MainBlock = doc.getElementById('mainBlock'),
    Blocktags = doc.getElementById('Blocktags'),
    masTag,
    masInputs = Blocktags.getElementsByClassName('mainBlock__tags__input'),
    masTag = Blocktags.getElementsByClassName('mainBlock__tags'),
    adds = doc.getElementById('add'),
    ok = doc.getElementById('ok'),
    send = doc.getElementById('send'),
    fieldtext = doc.getElementById('fieldtext'),
    id = 0,
    idnote = 0,
    objStorage = {},
    month = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"],
    ObjNote = {},
    TagCelect = [],
    tags = [],
    search = doc.getElementById('search'),
    tegContainer,
    content,
    objParce,
    objNoteParce,
    index



    objParce = JSON.parse(localStorage.getItem("obj"))
    for (index in objParce) {
        addTag(objParce[index])

    }

    objNoteParce = JSON.parse(localStorage.getItem("ObjNote"))
    for (index in objNoteParce) {
        createNote(objNoteParce[index][0],objNoteParce[index][1], objNoteParce[index][2])

    }

    //поиск
    search.oninput = function() {

        findTegsInput(this.value)
    }


    //функция отправки формы
    function ee() {
        var val=fieldtext.value.trim()
 
        if(val=="")
            return 
      
           
            
        findTeg(fieldtext.value)
        TagCelect = []
        tags = []

        for (var i = 0; i < masTag.length; i++) {

            masTag[i].classList.remove("toggleborder")

        }
    }




    fieldtext.onkeydown = function(e) {
        if (e.keyCode == 13)
            ee()
    }


    send.onclick = function() {
        ee()
    }



    
    //функция создания тегов в ноте

    function handling(massiv) {
        var mas = []
        for (var index in massiv) {
            var item = doc.createElement('p')
            item.innerHTML = massiv[index]
            item.className = "tagC"
            tegContainer.appendChild(item)
            mas.push(massiv[index])
        }

        ObjNote["note" + idnote].push(mas)
        localStorage.setItem("ObjNote", JSON.stringify(ObjNote))
        content.appendChild(tegContainer)
    }


//функция выбора пути создания

    function createtag(content, flag) {
        tegContainer = doc.createElement('div')
        tegContainer.className = "containerTags"
        switch (flag) {
            case 'both':
                var concat = TagCelect.concat(tags)
                handling(concat)
                break;
            case 'select':
                handling(TagCelect)
            case 'input':
                handling(tags)

        }
    }



//функция удаления решоток
    function removeS(value) {
        value = value.replace("#", " ")
        value = value.trim()
        return value

    }



//функция создания записи
    function createNote(value, timeStore, mastags) {

        var wrap = doc.createElement('div')
        content = doc.createElement('article')
        var dates = doc.createElement('div')
        var Time = doc.createElement('p')
        var delnote = doc.createElement('i')
        var edit = doc.createElement('i')


        var nodeText = doc.createElement('div')
        nodeText.className = "textNode"
        nodeText.classList.add("classforsel")
        nodeText.setAttribute("spellcheck", "false")
        delnote.classList.add('fa')
        delnote.classList.add('fa-times')
        delnote.classList.add('delnoteNote')
        edit.classList.add('fa')

        edit.classList.add('fa-lock')
        edit.classList.add('editnode')

        var currenttime = new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear()
        Time.className = "note__header-title"
        delnote.onclick = function() {
            this.parentNode.style.animation = 'animdel 0.1s ease forwards'
            var that = this
            setTimeout(function() {
                MainBlock.removeChild(that.parentNode)
            }, 100)

            delete ObjNote[this.parentNode.id]
            localStorage.setItem("ObjNote", JSON.stringify(ObjNote))
        }
       
        edit.onclick = function() {

                 
                
            this.classList.toggle("fa-pencil")
            this.parentNode.getElementsByClassName("textNode")[0].classList.toggle("classforsel")
            this.parentNode.getElementsByClassName("textNode")[0].focus()

            if (this.parentNode.querySelector('.containerTags') && (!this.parentNode.querySelector('.textNode .backlight'))) {

                if (!this.parentNode.querySelector('.textNode span')) {
                    var mas = []
                    var contTag = this.parentNode.querySelector('.containerTags');
             var t;
                       var conttext = this.parentNode.querySelector('.textNode').innerHTML.trim();
                   this.parentNode.querySelector('.textNode').innerHTML
                  
                  
               
                        for (var i = 0; i < contTag.children.length; i++) {
                    mas.push(removeS(contTag.children[i].innerHTML))
                        
                  
                     var reg = new RegExp(mas[i],"i");
                            
                           
                      if(conttext = conttext.replace(reg,"<span class='backlight' contenteditable='false' spellcheck='false'>"+mas[i]+"</span>")){
                       
                     if(conttext.indexOf('span')>=0){
                           t=1;
                        
                     }
                      }
                     
                   
       
                    }
                    
                    if(t==1){
                     conttext+="&nbsp"
                     t=0
                    }
                        
               this.parentNode.querySelector('.textNode').innerHTML=conttext


                } else if (!this.parentNode.querySelector('.textNode span').classList.contains('backlight')) {

                    var masColor = this.parentNode.querySelectorAll('.textNode span')
                    for (var i = 0; i < masColor.length; i++) {
                        masColor[i].classList.add('backlight')

                    }

                }


            } else {
                var masColor = this.parentNode.querySelectorAll('.textNode .backlight')
                for (var i = 0; i < masColor.length; i++) {
                    masColor[i].classList.remove('backlight')

                }

            }
            if (!nodeText.hasAttribute("contenteditable")) {
                nodeText.setAttribute("contenteditable", "")

            } else if (nodeText.hasAttribute("contenteditable")) {
                var masColor = this.parentNode.querySelectorAll('.textNode .backlight')
                for (var i = 0; i < masColor.length; i++) {
                    masColor[i].classList.remove('backlight')

                }


                nodeText.removeAttribute("contenteditable")
                ObjNote[this.parentNode.id] = [this.parentNode.getElementsByClassName("textNode")[0].innerHTML, this.parentNode.getElementsByClassName('note__header-title')[0].innerHTML, ObjNote[this.parentNode.id][2]]
                localStorage.setItem("ObjNote", JSON.stringify(ObjNote))
            }




        }
        content.className = "note__content"



        if (timeStore == null)
            Time.innerHTML = currenttime
        else {
            Time.innerHTML = timeStore
            wrap.style.animation = "none"
        }
        ObjNote["note" + idnote] = [value, currenttime]
        localStorage.setItem("ObjNote", JSON.stringify(ObjNote))
        nodeText.innerHTML = delsimb(value)

        content.appendChild(nodeText)



        dates.className = "note__header-block"

        dates.appendChild(Time)
        wrap.className = "note"
        wrap.id = "note" + idnote
        wrap.appendChild(dates)
        wrap.appendChild(content)
        wrap.appendChild(delnote)
        wrap.appendChild(edit)

        MainBlock.appendChild(wrap)



        if (TagCelect.length != 0 && tags.length > 0)
            createtag(content, "both")
        else if (TagCelect.length != 0) {
            createtag(content, "select")
        } else if (tags.length > 0) {
            createtag(content, "input")
        }



        if (mastags != null) {

            var tegContainer = doc.createElement('div')

            tegContainer.className = "containerTags"
            var mas = []
            for (var index in mastags) {
                var item = doc.createElement('p')
                item.innerHTML = mastags[index]
                item.className = "tagC"
                tegContainer.appendChild(item)
                mas.push(mastags[index])


            }

            ObjNote["note" + idnote].push(mas)
            localStorage.setItem("ObjNote", JSON.stringify(ObjNote))
            content.appendChild(tegContainer)


        }


        idnote++;


    }

function delsimb(value){
    value=value.replace(/#/g," ") 
    return  value
    
}


//функция поиска знака тега

    function findTeg(value) {

        if (/#/ig.test(value)) {
            var position = []
            var count = 0;

            var j;
            var reg = /#/ig;
            var end = [];
            while (result = reg.exec(value)) {
                position.push(result.index + 1)

            }

            for (j = position[0]; j < value.length; j++)
                if (value[j] == " " || value[j] == "," || value[j] == "#") {

                    count++
                    end.push(j);
                    if (j = position[count])
                        j = position[count]
                    else
                        break
                }


            for (var index in position) {
                tags.push("#" + value.substring(position[index], end[index]))
                addTag(tags[index], "flag")

            }


        }
        createNote(value)
        fieldtext.value = ""
        return
    }




  

//быстрое создание тега

    document.onkeydown = function(e) {




        if (e.ctrlKey && e.keyCode == 66) {
            if (adds.style.display != "none" && ok.style.display != "block") {

                addTag()
            }
        }
    }


//поиск элемента в массиве
    function chekmass(mas, elem) {
        for (var index in mas) {
            if (mas[index] === elem)
                return true
        }
        return false

    }

//удаление элемента в массиве
    function delmass(mas, elem) {
        var idx = mas.indexOf(elem);
        if (idx != -1) {

            return mas.splice(idx, 1);
        }
        return false;

    }



//добавление тега
    function addTag(text, flag) {



        if (text === null)
            return


        var elem = doc.createElement('div')
        elem.style.animation = "animationTag 0.4s ease forwards"
        elem.classList.add('mainBlock__tags')
        elem.onclick = function() {


            if (elem.lastChild.value != 0 && elem.lastChild.hasAttribute("disabled")) {
                this.classList.toggle('toggleborder')
                if (!chekmass(TagCelect, this.lastChild.value)) {

                    TagCelect.push(this.lastChild.value)
                } else
                    delmass(TagCelect, this.lastChild.value)
            }

        }


        elem.id = id
        var inp = doc.createElement('input')
        inp.classList.add('mainBlock__tags__input')
        inp.setAttribute("maxlength", "25")

        inp.style.cursor = "auto"
        var close = doc.createElement('i')
        close.classList.add('fa')
        close.classList.add('fa-times')


        close.onclick = function(e) {
            e.stopPropagation()
            Blocktags.removeChild(this.parentNode)
            delete objStorage['tag' + this.parentNode.id]
            localStorage.setItem("obj", JSON.stringify(objStorage))

            ok.style.display = "none"
            adds.style.display = "block"


            delmass(TagCelect, this.parentNode.lastChild.value)
        }


        elem.appendChild(close)
        elem.appendChild(inp)
        Blocktags.appendChild(elem)
        inp.focus()
        ok.style.display = "block"

        ok.onclick = function() {
            inp.focus()
        }

        adds.style.display = "none"


        if (text != null && text != "") {

            inp.value = text
            inp.setAttribute("title", text)
            if (flag == null)
                elem.style.animation = "none"
            okSet()
        }

        function okSet(that) {


            inp.setAttribute("disabled", "")
            inp.style.cursor = "pointer"
            ok.style.display = "none"
            adds.style.display = "block"
            ok.classList.remove('changeColor')

            var th = "tag" + id
            if (text == null) {
                var val = "#" + inp.value
                inp.value = val
                inp.setAttribute("title", val)

            }
            objStorage['tag' + id] = (val || text)
            localStorage.setItem("obj", JSON.stringify(objStorage))

            inp.classList.add('classforsel')
            id++
        }




        inp.onkeydown = function(e) {


            if (e.keyCode == 13 && Blocktags.children[Blocktags.children.length - 1].children[1].value != 0) {
                okSet(this)

            }


        }




        inp.oninput = function() {
            if (this.value != 0) {

                ok.classList.add('changeColor')
                ok.onclick = function() {

                    okSet()

                }




            } else {
                ok.classList.remove('changeColor')


                ok.onclick = function() {
                    inp.focus()
                }
            }

        }




    }


//добавление тега

    adds.onclick = function() {

        addTag()

    }


//живой поиск

    function findTegsInput(value) {
        
       
        value=value.trim()
      
        var masCon = doc.getElementsByClassName('containerTags')
        var masnote = doc.getElementsByClassName('note')
         if(value!=0){
        var reg = new RegExp("\^\\"+value,"i");
         }
        for (var i = 0; i < masnote.length; i++) {
            masnote[i].style.display = "none"
            masnote[i].style.animation = "none"
        }




        for (var i = 0; i < masCon.length; i++) {

            for (var j = 0; j < masCon[i].children.length; j++) {
                
                if (removeS(masCon[i].children[j].innerHTML).search(reg) == 0) {
                    masCon[i].parentNode.parentNode.style.display = "block"
                }




            }



        }

        if (value == 0) {
            for (var i = 0; i < masnote.length; i++) {
                masnote[i].style.display = "block"
            }



        }




    }
    
}

var myEditor=new Editor();
