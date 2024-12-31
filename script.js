// Funzione per ottenere la data in formato dd-mm-yyyy
let data;

function showAlert(message) {
    // Crea un div per l'alert
    const alertBox = document.createElement('div');
  alertBox.classList.add('alert');

    // Crea un messaggio
    const alertMessage = document.createElement('span');
    alertMessage.textContent = message;
    alertBox.appendChild(alertMessage);

    // Crea un bottone per chiudere l'alert
    const closeButton = document.createElement('button');
    closeButton.classList.add('alert_btn');
    closeButton.textContent = 'x';
    closeButton.onclick = function() {
        document.body.removeChild(alertBox); // Rimuovi l'alert dal DOM
    };
    alertBox.appendChild(closeButton);

    // Aggiungi l'alert al body
    document.body.appendChild(alertBox);
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}

function getFormattedDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi partono da 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Funzione per aggiornare il titolo
async function getJson() {
    const today = new Date();
    const todayDate = getFormattedDate(today);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayDate = getFormattedDate(yesterday);

    const jsonFileNameToday = `${todayDate}`;
    const jsonFileNameYesterday = `${yesterdayDate}`;

    try {
        // Prova a caricare il file di oggi
        const responseToday = await fetch(jsonFileNameToday);
        
        if (responseToday.ok) {
             data = await responseToday.json();
                      update();

        } else {
            const responseYesterday = await fetch(jsonFileNameYesterday);
            
            if (responseYesterday.ok) {
                 
                data = await responseYesterday.json();
                update();
                } else {
              throw new Error('File non trovato');
                    }
        }
    } catch (error) {
       const titleElement = document.getElementById("date");
        titleElement.textContent = "Non ho nessun file";
    }
}

 async function update() {
            const dateElement = document.getElementById("date");
           // const body = document.getElementById("body");
           // const gridContainer = document.getElementById("grid-container");
            //const gameElement = document.getElementById("game");
           // const buttonContainer = document.getElementById('buttonContainer');
            //const controllaSoluzione = document.getElementById('controllaSoluzione');
          // const contentDiv = document.getElementById('indizi');

          
            dateElement.textContent = data.data;
            let   giochi =  Object.keys(data);
      
for(let index=0;index<giochi.length-1;index++){
  
  if(data[giochi[index+1]].puzzle=="classico"){

 const body = document.createElement("body");
    document.documentElement.appendChild(body);
    
    
    const gameElement = document.createElement("h1");
gameElement.className = "game";
gameElement.textContent = "CLASSICO";
    body.appendChild(gameElement);
    
    
    
    const controllaSoluzione = document.createElement("div");
    body.appendChild(controllaSoluzione);
    
        const gridContainer = document.createElement("div");
        gridContainer.className = "grid-container";
    body.appendChild(gridContainer);
    
    const buttonContainer = document.createElement("div");
    body.appendChild(buttonContainer);
    
     const contentDiv = document.createElement("div");
    body.appendChild(contentDiv);

        const keyboardContainer = document.createElement("div");
              keyboardContainer.className = 'keyboard';
    body.appendChild(keyboardContainer);
      
            let width=data[giochi[index+1]].dimensioni.larghezza;
            let height=data[giochi[index+1]].dimensioni.altezza;

 // let cell_width= `${0.4*body.clientWidth / width}`;
 let cell_width=`100`
  gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
 gridContainer.style.gridTemplateColumns = `repeat(${width}, ${cell_width}px)`;
gridContainer.style.gridTemplateRows = `repeat(${height}, ${cell_width}px)`;
        
        let letters=data[giochi[index+1]].sequenza;//letter="CASAI00ROLMIERBA"
        
        let indici = [];
        let indici_o = [];
        let indici_v = [];
        
        for(let i=0;i<height;i++){
        
let cut = letters.substring(i * width, (i + 1) * width);
let currentWordStart = -1;

    for (let i = 0; i < cut.length; i++) {
        if (cut[i] !== '0') {
            if (currentWordStart === -1) {
                currentWordStart = i; 
            }
        } else {
            if (currentWordStart !== -1) {
              if (i-currentWordStart > 1){  
                indici.push(currentWordStart+i * width);
                 indici_o.push(currentWordStart+i * width);
                
              }
                
                currentWordStart = -1; 
            }
        }
    }

    if (currentWordStart !== -1) {
      if (cut.length-currentWordStart > 1){ 
          indici.push(currentWordStart+i * width);
           indici_o.push(currentWordStart+i * width);
          }
    }
        }
        
        
        
        let horizontal=true;
        let lastcell;
        
        for(let i=0;i<width;i++){let cut="";
        for(let j=0;j<height;j++){
          cut=cut+letters[i+j*width];}
let currentWordStart = -1;
        for (let i = 0; i < cut.length; i++) {
        if (cut[i] !== '0') {
            if (currentWordStart === -1) {
                currentWordStart = i; 
            }
        } else {
            if (currentWordStart !== -1) {
              if (i-currentWordStart > 1){  
                indici.push(i+currentWordStart * width);
                indici_v.push(i+currentWordStart * width);

                
              }
                currentWordStart = -1; 
            }
        }
    }

    if (currentWordStart !== -1) {
      if (cut.length-currentWordStart > 1){ 
          indici.push(i+currentWordStart* width);
          indici_v.push(i+currentWordStart* width);
          }
    }
        }
        
        indici = new Set(indici);
        indici = Array.from(indici).sort((a, b) => a - b);
          indici_v = Array.from(indici_v).sort((a, b) => a - b);
         let pos_indici_o = [];
        let pos_indici_v = [];
        let contatori_o=0;
        let contatori_v=0;
        for(let i=0;i<indici.length;i++){
          if(indici[i]==indici_o[contatori_o]){contatori_o++;pos_indici_o.push(i+1);}
          if(indici[i]==indici_v[contatori_v]){contatori_v++;pos_indici_v.push(i+1);}

        }
        
        

let contatore = 0; // Assicurati di inizializzare contatore
let contatoreDiIndici=0;
let ignoreOnInput=false;

for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cell_width}px`;
         cell.style.height = `${cell_width}px`;
 cell.style.fontSize = `${cell_width/4}px`;
        if (contatore < letters.length) {
            const currentChar = letters[contatore];
            
                 cell.setAttribute("cell", `${i+j*width}`);
            if (/[A-Za-z]/.test(currentChar)) {
                const input = document.createElement("input");
                input.type = "text";
                input.value="";
                   if (isMobileDevice()) {        input.readOnly = true; }
            //    input.value = Object.keys(data[giochi[index + 1]].orrizontali[0]);
                input.style.width = "100%"; 
                input.style.height = "100%";
                 input.setAttribute("input", `${index}_${i+j*width}`);

                                input.style.backgroundColor = "transparent"; 
               input.style.caretColor = "transparent"; 
                 input.style.fontSize = `${2*cell_width/4}px`; // Imposta la dimensione del testo a 10px
        input.style.textAlign = "center"; // Centra il testo all'interno dell'input

             input.oninput = function(event) {event.preventDefault();}
             input.onkeydown = function(event) {event.preventDefault();}

           input.onkeyup = function(event) {
    if (event.key === 'Delete' || event.key === 'Backspace') {
                        input.value="";


       let num=parseInt(((input.getAttribute("input")).split("_"))[1],10);
           if(horizontal){
      num--;
      if(num==-1){num=width*height-1;}
              if(data[giochi[index+1]].sequenza[num]=="0"){num--;}
           }
      else{
        num-=width;
         if(num==-width){num=width*height-1;}
       else if(num<0){num=-1+num+width*height;}
       
          if(data[giochi[index+1]].sequenza[num]=="0"){num+=width;}
      }
            

      ignoreOnInput=true;
           indizioSelezionato(num);
     ///disabilita oninput
    }/*
};
                input.oninput = function() {
                if(!ignoreOnInput){
                  
             */else{     
         const cursorPosition = this.selectionStart;
         

    this.value = event.key.replace(/[^A-Za-z]/g, '').toUpperCase();

/*
      if (cursorPosition==1) {
 this.value = this.value.slice(0,1);///voglio il carattere a sx
  }
       if (cursorPosition==2) {
  this.value = this.value.slice(-1);///voglio il carattere a dx
  }*/

    let num=parseInt(((this.getAttribute("input")).split("_"))[1],10);
    let loop=true;
  
 // alert("ciao"+num);


    while(loop){
      if(horizontal){
      num++;
      if(num==width*height){num=0;}
      if(data[giochi[index+1]].sequenza[num]=="0"){loop=false;num--;}}
      else{
        num+=width;
        if(num>width*height){num=1+num-width*height;}
        if(num==width*height+width-1){num=0;}
          if(data[giochi[index+1]].sequenza[num]=="0"){loop=false;num-=width;;}
      }
            

      
      
      const inputElement = document.querySelector(`input[input="${index}_${num}"]`);
        if (inputElement) {
         
            loop=false;
        }
 
  }
indizioSelezionato(num);
}
/* else{
ignoreOnInput=false;
this.value = this.value.replace(/[^A-Za-z]/g, '').toUpperCase();
  this.value=this.value = this.value.slice(0,1);; 
 }*/


        };
                input.onclick = function() { 
clickOnInput(this);
     };
               if(indici[contatoreDiIndici]===i+j*width){contatoreDiIndici++;
                 const numberLabel = document.createElement("div");
                 numberLabel.style.margin = "2px";
    numberLabel.textContent = contatoreDiIndici;
    numberLabel.style.position = "absolute"; // Posiziona il numero in modo assoluto
   
    cell.appendChild(numberLabel);
               }
                cell.appendChild(input);
            } else {
                cell.style.backgroundColor = "black";
            }
            
            
        
        } else {
           console.log("c'è un problema");
        }

        gridContainer.appendChild(cell);
        contatore++;
    }
}///ho finito di disegnare le celle



 const buttons = [
    //    { text: "Seleziona tutto", state: 0 },
        { text: "Mostra Indizi Originali", state: -1 },
        { text: "Mostra Traduzione Indizi", state: -2 },
        { text: "Mostra Traduzione Soluzioni", state: -3 }
    ];
let State=[];

buttons.forEach(button => {
    const btn = document.createElement('button'); // Crea un nuovo pulsante
    btn.className = 'btn_state'; // Aggiungi la classe CSS
    btn.textContent = button.text; // Imposta il testo del pulsante

    // Funzione interna per gestire il clic del pulsante
    const handleClick = () => {
    
                for(let i=0;i<pos_indici_o.length+pos_indici_v.length;i++){State[i]=-button.state;mostraIndizi();}

    };

    btn.onclick = handleClick; // Imposta l'evento onclick
    buttonContainer.appendChild(btn); // Aggiungi il pulsante al contenitore
});



for(let i=0;i<pos_indici_o.length;i++){
  State.push(1);
}

for(let i=0;i<pos_indici_v.length;i++){
  State.push(1);
}

const clickOnInput = (that) => {
  
  for(let i=0;i<width*height;i++){
              const inputElement = document.querySelector(`input[input="${index}_${i}"]`);
         // 
         if(inputElement){inputElement.style.backgroundColor = "white"; }
        }
               
       that.focus();
    that.style.backgroundColor = "yellow"; 
  lastcell=that;
};
const getAllInput = () =>{
  let s="";
        for(let i=0;i<width*height;i++){
   
const inputElement = document.querySelector(`input[input="${index}_${i}"]`);

if (inputElement) {
  if(!inputElement.value==""){
 s+=(inputElement.value);} 
} else {
    s+="0";
}

}
  return s;
  
}
const indizioSelezionato = (i) => {     
  const inputElement = document.querySelector(`input[input="${index}_${i}"]`);
if(inputElement){
  clickOnInput(inputElement);
  //alert(`${indici[i-1]}_${i}`);
}
  
  
};
    const mostraIndizi = () => {


contentDiv.innerHTML = '';
        // Orrizontali
        const Orrizontali = document.createElement('div');
        Orrizontali.className = 'subtitle';
        Orrizontali.textContent = "Orrizontali";
        contentDiv.appendChild(Orrizontali);

const listContainerOrrizontal = document.createElement('span');

for (let i = 0; i <  data[giochi[index+1]].orrizontali.length; i++) {
    const itemElement = document.createElement('span');
    itemElement.className = 'item'; 
    let text;
    if(State[i]==1){
    text=data[giochi[index + 1]].orrizontali[i].indizio;}
    if(State[i]==2){
    text=data[giochi[index + 1]].orrizontali[i].trad_indizio;}
    if(State[i]==3){
    text=data[giochi[index + 1]].orrizontali[i].trad_sol;}
   itemElement.innerHTML = `<strong>${pos_indici_o[i]}.</strong> ${text}`;


itemElement.onclick = function() {
       indizioSelezionato(indici[pos_indici_o[i]-1]);
       horizontal=true;
    };

    listContainerOrrizontal.appendChild(itemElement);
}

contentDiv.appendChild(listContainerOrrizontal);

const space = document.createElement('div');
space.style.height = '20px'; // Spazio verticale di 5px
contentDiv.appendChild(space);
  // Verticali
        const Verticali = document.createElement('div');
        Verticali.className = 'subtitle';
        Verticali.textContent = "Verticali";
        contentDiv.appendChild(Verticali);
     
     const listContainerVertical = document.createElement('span');
     
     for (let i = 0; i <  data[giochi[index+1]].verticali.length; i++) {
    const itemElement = document.createElement('span');
    itemElement.className = 'item'; 
let text;
if(State[i+pos_indici_o.length]==1){
 text=data[giochi[index + 1]].verticali[i].indizio;}
 if(State[i+pos_indici_o.length]==2){
 text=data[giochi[index + 1]].verticali[i].trad_indizio;}
 if(State[i+pos_indici_o.length]==3){
 text=data[giochi[index + 1]].verticali[i].trad_sol;}
   itemElement.innerHTML = `<strong>${pos_indici_v[i]}.</strong> ${text}`;

itemElement.onclick = function() {
       indizioSelezionato(indici[pos_indici_v[i]-1]);
              horizontal=false;

    };
    listContainerVertical.appendChild(itemElement);
}
         contentDiv.appendChild(listContainerVertical);
    };///mostraIndizi
    
    mostraIndizi();
    
       const btn = document.createElement('button');
    btn.className = 'btn_state'; 
    btn.textContent = 'Controlla soluzione'; 
    
    
       const btn2 = document.createElement('button');
    btn2.className = 'btn_state'; 
    btn2.textContent = 'Guarda soluzione'; 

    btn.onclick = function() {
      let mystring=getAllInput();

if(data[giochi[index+1]].sequenza==mystring){
 // alert("Complimenti!!!");
 showAlert("Complimenti!!!");
}
else{
showAlert("Ci sono degli errori");
}

    };

    btn2.onclick = function() {
     let questasequenza = data[giochi[index + 1]].sequenza;

for (let i = 0; i < width * height; i++) {
    if (isNaN(questasequenza[i])) { // Controlla se non è un numero (quindi è una lettera)
        const inputElement = document.querySelector(`input[input="${index}_${i}"]`);
        if (inputElement) { // Verifica che l'input esista
            inputElement.value = questasequenza[i]; // Imposta il valore dell'input
        }
    }
}

    }
    controllaSoluzione.appendChild(btn);
    controllaSoluzione.appendChild(btn2);

     if (isMobileDevice()) {
        const keyboardDiv = document.createElement('div');
        keyboardDiv.className = 'keyboard';

        // Creazione dei tasti della tastiera
        const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z','X', 'C', 'V', 'B', 'N', 'M', 'Backspace', 'Delete'];
        keys.forEach(key => {
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            keyDiv.textContent = key;

            // Aggiungi un evento click per gestire il comportamento del tasto
            keyDiv.addEventListener('click', () => {
               simulateKeyPress(key);
            });

            keyboardDiv.appendChild(keyDiv);
        });

        keyboardContainer.appendChild(keyboardDiv);
    }
const simulateKeyPress = (key) => 
//function simulateKeyPress(key) {
        const event = new KeyboardEvent('keydown', {
            key: key,
            code: key === 'Backspace' ? 'Backspace' : key === 'Delete' ? 'Delete' : `Key${key}`,
            char: key,
            keyCode: key.charCodeAt(0), // Nota: keyCode è deprecato, ma può essere usato per compatibilità
            bubbles: true
        });
    alert(lastcell.value);
       lastcell.value=key;

        document.dispatchEvent(event);
        console.log(`Simulata pressione del tasto: ${key}`);
    }
      
    
  }/////if classic



}////for game
            
            
            
}////update

 function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent);
    }

window.onload = getJson;///check
