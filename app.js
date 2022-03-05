const skills = document.querySelector('#skills-load');
const devs_add_form = document.querySelector('#devs_add_form');
const devs_datas = document.querySelector('#devs_data_lists');
const viewmapmodal = document.querySelector('#viewmapmodal');




//skills data get from server

let getdata = () => {



    axios.get('http://localhost:1010/skill').then(res => {

        let skillget = ''; 

        res.data.map(skills_list => {
            skillget += `
       <option value="${skills_list.name}">${skills_list.name}</option>`;


        });

        skills.insertAdjacentHTML('beforeend', skillget);

        

    });


};

getdata();


//add data in server

devs_add_form.addEventListener('submit', function(e) {

    e.preventDefault();

    let name = document.querySelector('#name');
    let level = document.querySelector('#level');
    let photo = document.querySelector('#photo');
    let email = document.querySelector('#email');
    let number = document.querySelector('#number');
    let discrption = document.querySelector('#discrption');

    if (name.value == '' || email.value == '' || number.value == '' || discrption.value == '' || level.value == '' || skills.value == '') {

    } else {

        axios.post('http://localhost:1010/devs', {

            id: "",
            name: name.value,
            eamil: email.value,
            number: number.value,
            photo: photo.value,
            skillId: skills.value,
            level: level.value,
            discrption: discrption.value


        }).then(res => {

            name.value = '';
            email.value = '';
            number.value = '';
            discrption.value = '';
            level.value = '';
            skills.value = 'select';
            photo.value = '';

            get_data_server();
        });




    }



})



// get data form server and add in table

let get_data_server = () => {


    axios.get('http://localhost:1010/devs').then(res => {

    
    

        let devs_data_list = '';
        res.data.map((list, index) => {

            
            devs_data_list += `
    
        <tr>
            <td>${index + 1}</td>
            <td><img class="dves_img rounded" src="${list.photo}" alt=""></td>
            <td>${list.name}</td>
            <td>${list.skillId}</td>
            <td>${list.level}</td>
            <td>
            <a data-toggle="modal" onclick="viewdevsdata(${list.id})" class="btn btn-info btn-sm" href="#modalview"><i class="fa fa-eye"></i></a>
                <a data-toggle="modal" class="btn btn-primary btn-sm" href="#modaledit"><i class="fa fa-edit"></i></a>
                <a data-toggle="modal" class="btn btn-danger btn-sm" href="#modal_delete"><i class="fa fa-trash"></i></a>
            </td>
        </tr>
        
    
    `


        })


        devs_datas.innerHTML = devs_data_list;

    })


};

get_data_server();




// view data on view modal

let viewdevsdata = (id) =>{

    axios.get('http://localhost:1010/devs/'+id).then(res =>{


    console.log(res.data.discrption);
        viewmapmodal.innerHTML = `
        
        <div class="col-lg-6">
        <div class="viewimg">
         <img class="w-100 img-thumbnail" src="${res.data.photo}" alt="">
        </div>
     </div>
     <div class="col-lg-6 text-white">
         <h4>Name: </br> ${res.data.name} </h4>
        <div class="row">
            <div class="col-lg-6">
             <b>Skill : </b> <p>${res.data.skillId}</p>
            </div>
            <div class="col-lg-6">
                <strong>Level :</strong> <p>${res.data.level}</p>
            </div>
        </div>

         <p>${res.data.discrption}</p>
         <b>Email :</b><p>${res.data.eamil}</p>
         <b>Phone :</b><p>${res.data.number}</p>
     </div>
        
        `


    });



}

