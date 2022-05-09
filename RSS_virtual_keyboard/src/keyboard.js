
import keyboard from './assets/keyboard.js';

const keys = keyboard;

let lang = 'eng';
let layout = 'lowercase';
let arrChars = [];

function getLocalStorage() {
    if(localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
    }
}

function setLocalStorage() {
    localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage)

window.addEventListener('load', () => {
    const textarea = document.querySelector('.textarea');
    getLocalStorage();
    const keyboardBlock = document.querySelector('.keyboard-block');
    showKeys(lang,'lowercase');
    let position;
    let btns;
    setClickOnBtn();
    setKeydown();
    setKeyup();

    function setClickOnBtn() {
      btns = document.querySelectorAll('.key'); 
      btns.forEach((item) => {
        item.addEventListener('click', (e) => {
            let actBtn = e.target;
            if ( actBtn.classList.contains('Backspace') ) {
                position = textarea.selectionStart;
                position = deleteAfter(position)
            } else
            if ( actBtn.classList.contains('Backslash') ) {
                position = textarea.selectionStart;
                deleteBefore(position)
            } else
            if ( actBtn.classList.contains('Enter') ) {
                position = textarea.selectionStart;
                position = addRow(position)
            } else
            if ( actBtn.classList.contains('Tab') ) {
                position = textarea.selectionStart;
                position = addTab(position)
            } else
            if ( actBtn.classList.contains('CapsLock') ) {
                changeOnCaps(actBtn);
            } else {
               printletter(actBtn); 
            }
            
            textarea.focus()
        }); 
    }) 
    }
    
    function showKeys(lang,layout) {
        keyboardBlock.innerHTML = '';
        if ( layout == 'lowercase') {
            if ( lang == 'rus' ) {
                keys.forEach((item) => {
                    const key = `<div class="key ${item.key}">
                        <span class="name ${item.key}">${item.rusName}</span>
                    </div>`;
                    keyboardBlock.insertAdjacentHTML('beforeend', key);
                })
            } 
            if ( lang == 'eng' ) {
                keys.forEach((item) => {
                    const key = `<div class="key ${item.key}">
                        <span class="name">${item.engName}</span>
                    </div>`;
                    keyboardBlock.insertAdjacentHTML('beforeend', key);
                })
            }
        }
        if (layout == 'uppercase' ) {
            if ( lang == 'rus' ) {
                keys.forEach((item) => {
                    const key = `<div class="key ${item.key}">
                        <span class="name">${item.rusCaps}</span>
                    </div>`;
                    keyboardBlock.insertAdjacentHTML('beforeend', key);
                })
            } 
            if ( lang == 'eng' ) {
                keys.forEach((item) => {
                    const key = `<div class="key ${item.key}">
                        <span class="name">${item.engCaps}</span>
                    </div>`;
                    keyboardBlock.insertAdjacentHTML('beforeend', key);
                })
            }
        }
       
    }

    function printletter(btn) {
        let key = btn.innerText.trim();
        let position = textarea.selectionStart;
        let arr = textarea.value.split('');
        let caps = document.querySelector('.CapsLock');
        let shiftLeft = document.querySelector('.ShiftLeft');
        let shiftRight = document.querySelector('.ShiftRight');
        if ( key == '◄' || key == '▲' || key == '▼' || key == '►' || key == 'Del' || key == '<-' || key == 'Tab' || key == 'CapsLock' || key == 'Shift' || key == 'ControlLeft' || key == 'AltLeft' || key == 'AltRight' || key == 'MetaRight' || key == 'MetaLeft' || key == 'ArrowLeft' || key == 'ArrowUp' || key == 'ArrowRight' || key == 'ArrowDown' || key == 'Enter' ) {
            return
        }
        if ( caps.classList.contains('clicked') ) {
            key = key.toUpperCase();
        } else if ( shiftLeft.classList.contains('clicked') || shiftRight.classList.contains('clicked') ) {
            key = key.toUpperCase();
        } else {
            key = key
        }

        if ( position < arr.length ) {
            arr = textarea.value.split('');
            const newValue = convertArrayToList(arr);
            let listArr = addToList(newValue, position, key);
            textarea.value = listArr.join('');
            textarea.selectionStart = position + 1;
        } else {
           textarea.value += key; 
        }

    }

    function setKeydown() {
        document.addEventListener('keydown',(e) => {
                let code = e.code;
                if ( code == 'Backslash') {
                    deleteBefore()
                }
                addChars(code);
                if ( code == 'ShiftLeft' || code == 'ShiftRight' || code == 'ControlLeft' || code == 'CapsLock') {
                    e.preventDefault();
                }
                if ( code == 'Tab') {
                    e.preventDefault();
                    position = textarea.selectionStart;
                    position = addTab(position);
                }
                if ( code == 'Space') {
                    e.preventDefault();
                    e.preventDefault();
                    position = textarea.selectionStart;
                    position = addSpace(position);
                }
                if ( code == 'CapsLock' ) {
                    e.preventDefault();
                    e.stopPropagation();
                    let key = document.querySelector(`.${code}`);
                    if ( key.classList.contains('clicked') ) {
                        layout = 'lowercase';
                        showKeys(lang,layout);
                        key.classList.remove('clicked')
                    } else {
                        layout = 'uppercase';
                        showKeys(lang,layout);
                        let caps = document.querySelector('.CapsLock');
                        caps.classList.add('clicked');
                    }
                    setClickOnBtn();
                    setKeydown();
                    setKeyup();
                } 
                keys.forEach((item) => {
                    if ( item.key == code ) {
                        let actKey = document.querySelector(`.${code}`);
                        actKey.classList.add('clicked');
                    }
                }) 
                
        })
    }

    function setKeyup() {
        btns = document.querySelectorAll('.key'); 
        document.addEventListener('keyup',(e) => {
        let actCode = e.key;
        if ( arrChars.includes('AltLeft') && arrChars.includes('ControlLeft') ) {
            changeLang();
            arrChars = [];
        } else {
            arrChars = [];
        }
        if ( actCode == actCode.toUpperCase() ) {
            btns.forEach((item) => {
                if ( item.classList.contains('ShiftLeft') || item.classList.contains('ShiftRight') || item.classList.contains('CapsLock') ) {
                } else {
                    if ( item.classList.contains('clicked') ) {
                        item.classList.remove('clicked')
                    }
                }
            })
        } else {
            let actKey = document.querySelector(`.${e.code}`);
            actKey.classList.remove('clicked');
        }
        })
    }

    function addChars(code) {
        if ( code == 'ControlLeft' ) {
            arrChars.push(code);
        }
        if ( code == 'AltLeft' ) {
            if ( arrChars.includes('ControlLeft') ) {
                arrChars.push(code);
            }
        }
    }

    function changeLang() {
        if ( lang == 'rus' ) {
            lang = 'eng';
            showKeys(lang,layout);
            if ( layout == 'uppercase' ) {
                let caps = document.querySelector('.CapsLock');
                caps.classList.add('clicked');
            }
        } else {
            lang = 'rus';
            showKeys(lang,layout);
            if ( layout == 'uppercase' ) {
                let caps = document.querySelector('.CapsLock');
                caps.classList.add('clicked');
            }
        }
        setClickOnBtn();
        setKeydown();
        setKeyup();
    }

    function changeOnCaps(key) {
        let actKey = key;
        if ( actKey.classList.contains('clicked') ) {
            layout = 'lowercase';
            showKeys(lang,layout);
            actKey.classList.remove('clicked')
        } else {
            layout = 'uppercase';
            showKeys(lang,layout);
            let caps = document.querySelector('.CapsLock');
            caps.classList.add('clicked');
        }
        setClickOnBtn();
        setKeydown();
        setKeyup();
    }

    function deleteAfter(pos) {
        let position = pos;
        let textArr = textarea.value.split('');
        if (position <= 0) {
            return
        } else {
            textArr.splice(position-1,1);
            textarea.value = textArr.join('');
            textarea.selectionStart = position;  
        }
        return position
    }

    function deleteBefore(pos) {
        let position = pos;
        let textArr = textarea.value.split('');
        if (position >= textArr.length) {
            return
        } else
        if (pos == 0 ) {
            textArr.shift();
            textarea.value = textArr.join('');
            textarea.selectionStart = 0;
        } else {
            textArr.splice(position,1);
            textarea.value = textArr.join('');
            textarea.selectionStart = position;  
        }
        return position
    }

    function addRow(pos) {
        let position = pos;
        let value = '\n';
        let textArr = textarea.value.split('');
        let linkedList = convertArrayToList(textArr);
        let newArr = addToList(linkedList,position,value);
        textarea.value = newArr.join('');
    }

    function addTab(pos) {
        let position = pos;
        let value = '\t';
        let textArr = textarea.value.split('');
        let linkedList = convertArrayToList(textArr);
        let newArr = addToList(linkedList,position,value);
        textarea.value = newArr.join('');
    }

    function addSpace(pos) {
        let position = pos;
        let value = ' ';
        let textArr = textarea.value.split('');
        let linkedList = convertArrayToList(textArr);
        let newArr = addToList(linkedList,position,value);
        textarea.value = newArr.join('');
    }
    
})

    class ListNode {
        constructor(x) {
           this.value = x;
           this.next = null;
        }
    }

    function convertArrayToList(arr) {
        return arr.reverse().reduce((acc, cur) => {
          if (acc) {
            const node = new ListNode(cur);
            node.next = acc;
            return node;
          }
      
          return new ListNode(cur);
        }, null);
    }

    function addToList(linkedList,position,value) {
        console.log(linkedList)
        let list = linkedList;
        let node = new ListNode(value);
        let prev = null;
        let resultArr = [];
        let i = 0;

        let current = list;

        while ( i < position ) {
            prev = current;
            current = prev.next;
            i++
        }
        if ( prev == null) {
            node.next = current;
            list = node;
        } else {
            prev.next = node;
            node.next = current;
        }
        current = list;
        while ( current ) {
            resultArr.push(current.value);
            prev = current;
            current = prev.next;
        }
        return resultArr;
    }

    