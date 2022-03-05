// Offer function start 

const cof = document.getElementById('cof');
const cos = document.getElementById('cos');
const cot = document.getElementById('cot');
const colol = document.getElementById('colol');



let love = setInterval(() => {

    let start_time = new Date();
    let end_time = new Date('2022-03-28 12:00:00');

    let time_diff = Math.floor(Math.abs(end_time.getTime() - start_time.getTime()));

    let total_sec = Math.floor(time_diff / 1000);
    let total_mint = Math.floor(total_sec / 60);
    let total_hours = Math.floor(total_mint / 60);
    let total_day = Math.floor(total_hours / 24);

    let hours = total_hours - (total_day * 24);
    let min = total_mint - (total_day * 24 * 60) - (hours * 60);
    let sec = total_sec - (total_day * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60);

    cof.innerHTML = `${total_day > 9 ? total_day : '0'+total_day }`;
    cos.innerHTML = `${ hours > 9 ? hours : '0'+hours}`;
    cot.innerHTML = ` ${ min>9 ? min : '0'+min}`;
    colol.innerHTML = ` ${sec>9? sec :'0'+sec} `;

}, 1000);

//offer function end



//note function start

const note_form = document.querySelector('#note-form');
const list_group = document.querySelector('.list-group');

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let date = new Date();

let year = date.getFullYear();
let month = months[date.getMonth()];
let day =  date.getDate();

console.log(year, month, day);

note_form.addEventListener('submit', function(e){
e.preventDefault();





let input_area = document.querySelector('.textarea');
axios.post('http://localhost:1010/note',{

id : "",
list : input_area.value

}).then(res =>{


    input_area.value = '';

    list_call();
});



});




function list_call(){



    axios.get('http://localhost:1010/note').then(data =>{


    let dadada = data.data.reverse();
        let note_list = '';
        dadada.map(lists =>{
        
        note_list += `

         <li class="list-group-item"> ${lists.list+' </br> ' + day+' '+ month+' ' + year + ''}</li>
        
        `;
        
        });
        
        list_group.innerHTML = note_list;
        
        
        });


};
list_call();



// note function end