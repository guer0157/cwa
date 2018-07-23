let submit_btn = document.getElementById("sendForm");
submit_btn.addEventListener("click", getInfo);

function getInfo(ev) {
    ev.preventDefault();

    let f_name = document.getElementById("name");

    let position = document.getElementById("position");

    let o_name = document.getElementById("organization");

    let email = document.getElementById("email");

    let phone = document.getElementById("phone");

    let t_info = document.getElementById("t_about");

    let h_info = document.getElementById("h_info");

    let radio_btns_org = document.querySelector("input[name='o_type']:checked");

    let radio_btns_size = document.querySelector("input[name='o_size']:checked");

    let checkbox_tech = document.querySelectorAll("input[name='c_tech']:checked");
    //Your Social Mission
    let sdg_goal=document.getElementById("sdg_goal");
    
    let sdg_social_mission=document.getElementById("s_mission");
    
    let sdg_clients=document.getElementById("cservice_mission");
    //Proposed Project
    let prjt_dig_tech_required=document.getElementById("dig_tech");
    
    let prjt_imp_a=document.getElementById("imp_a");
    
    let prjt_otech_con=document.getElementById("otech_con");
    
    let prjt_hd_hear=document.getElementById("hd_hear");
    
    

    //compile data into object for validation
    let obj = {
        "name": f_name,
        "position": position,
        "organization": o_name,
        "email": email,
        "phone": phone,
        "t_info": t_info,
        "h_info": h_info,
        "o_type": radio_btns_org,
        "o_size": radio_btns_size,
        "o_tech": checkbox_tech,
        "sdg_goal": sdg_goal,
        "social_mission": sdg_social_mission,
        "sdg_clients":sdg_clients,
        "dig_tech_required":prjt_dig_tech_required,
        "impact":prjt_imp_a,
        "o_projects":prjt_otech_con,
        "hd_hear":prjt_hd_hear
    }
    
//    console.log(obj);
    validateData(obj);
}

//Data validation function
function validateData(ev) {

    let name = ev.name;
    name.onkeypress=function(){
        name.style.borderColor="#666";
        let errName=name.nextElementSibling;
        errName.classList.remove("error-message");
        errName.classList.add("hide");
    }
    let val_count=0;
    if (name.value == "") {
        name.style.borderColor="red";
        let errName=name.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    let position = ev.position;

    let org_name = ev.organization;

    if (org_name.value == "") {
        org_name.style.borderColor="red";
        let errName=org_name.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }

    //val email   
    let checkEmail = ev.email;
    let emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailPass = emailPattern.test(checkEmail.value);
    if (emailPass == false) {
        if (checkEmail.value.length == 0) {
            checkEmail.style.borderColor="red";
            let errName=checkEmail.nextElementSibling;
            errName.classList.remove("hide");
            errName.classList.add("error-message");
            errName.innerHTML="Please provide your E-mail"
            val_count=val_count+1;
        } else {
            checkEmail.style.borderColor="red";
            let errName=checkEmail.nextElementSibling;
            errName.classList.remove("hide");
            errName.classList.add("error-message");
            errName.innerHTML="Invalid E-mail use format user@youremail.com";
            val_count=val_count+1;
        }
    }

    //validate phone
    let checkPhone = ev.phone;
    if (!checkPhone.value == "") {
        let phonePattern_dashes = new RegExp(/^([0-9][0-9][0-9])-?([0-9][0-9][0-9])-?([0-9][0-9][0-9][0-9])$/);
        let phonePass_dash = phonePattern_dashes.test(checkPhone.value);
        if (!phonePass_dash) {
            checkPhone.style.borderColor="red";
            let errName=checkPhone.nextElementSibling;
            errName.classList.remove("hide");
            errName.classList.add("error-message");
            val_count=val_count+1;
        }
    }

    let more_info = ev.t_info;
    if (more_info.value == "") {
        more_info.style.borderColor="red";
        let errName=more_info.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }

    let how_improve = ev.h_info;
    if (how_improve.value.length == 0) {
        how_improve.style.borderColor="red";
        let errName=how_improve.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }

    let org_type = ev.o_type;

    if (org_type == null) {
        let change_text = document.getElementById('o-type-error');
        change_text.classList.remove("hide");
        change_text.classList.add("error-message");
//          let change_border=document.querySelectorAll("input[name='o_type']");
//            change_border.forEach(btn=>{
//                console.log(btn);
//                btn.classList.add("is-validated");
//                console.log(btn);
//            })
        let check_event = document.querySelectorAll("input[name='o_type']");
        check_event.forEach(checkbox => {
            checkbox.addEventListener('click', function clearText(){
            change_text.classList.remove("error-message");
            change_text.classList.add("hide");
                })
        })
        val_count=val_count+1;
    }else if(org_type.value=="other"){
        let radio_btns_input = document.getElementById("o_org_type");
        if (radio_btns_input.value.length == 0) {
            let change_text = document.getElementById('o-type-error');
            change_text.classList.remove("hide");
            change_text.classList.add("error-message");
            radio_btns_input.style.borderColor="red";
            change_text.innerHTML="Please specify your answer";
        }
        val_count=val_count+1;
    }

    let org_size = ev.o_size;
        if(org_size==null){
            let errName=document.getElementById("o-size-error");
            errName.classList.remove("hide");
            errName.classList.add("error-message");
            let radio=document.querySelectorAll("input[name='o_size']");    
            radio.forEach(btns => {
            btns.addEventListener('click', function clearText(){
            errName.classList.remove("error-message");
            errName.classList.add("hide");
                })
            })
            val_count=val_count+1;
        }

    let tech_support = ev.o_tech;
    let tech_choices = [];
    if (tech_support.length == 0) {
        let errName=document.getElementById("c_tech_error");
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        let check_event = document.querySelectorAll("input[name='c_tech']");
        check_event.forEach(checkbox => {
        checkbox.addEventListener('click', function clearText() {
        errName.classList.remove("error-message");
        errName.classList.add("hide");
            })
        })
        val_count=val_count+1;
    }
    let checkbox_other=document.getElementById("other_sup");
    let other_text_field;
    for (let i = 0; i < tech_support.length; i++) {
        let create_arr_tech = tech_support[i].value;
        tech_choices.push(create_arr_tech);
    }
    
    if (checkbox_other.checked) {
        other_text_field = document.getElementById("o_org_type_tech");
        other_text_field.required = true;
        tech_choices.push(other_text_field.value);
        if (!other_text_field.checkValidity()) {
        let errName=document.getElementById("c_tech_error");
            errName.classList.remove("hide");
            errName.classList.add("error-message");
            other_text_field.style.borderColor="red";
        }
        val_count=val_count+1;
    }
    let tech_s_choices_s = JSON.stringify(tech_choices);
    let clean_tech_open= new RegExp(/\[/);
    let clean_tech_close= new RegExp(/\]/);
    let tech_s_choices_one= tech_s_choices_s.replace(clean_tech_open,"");
    let tech_s_choices_two= tech_s_choices_one.replace(clean_tech_close,"");
    //validate sdg_goal
    let sdg_goal=ev.sdg_goal;
    if(sdg_goal.value=="select"){
        let errName=sdg_goal.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate social mission
    let social_mission=ev.social_mission;
    if(social_mission.value==""){
        let errName=social_mission.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate clients
    let sdg_clients=ev.sdg_clients;
    if(sdg_clients.value==""){
        let errName=sdg_clients.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate dig tech required
    let dig_tech_required=ev.dig_tech_required;
    if(dig_tech_required.value==""){
        let errName=dig_tech_required.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate required
    let impact=ev.impact;
    if(impact.value==""){
        let errName=impact.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate other projects
    let o_projects=ev.o_projects;
    if(o_projects.value==""){
        let errName=o_projects.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    //validate how did you hear
    let how_did_hear = ev.hd_hear;
    if (how_did_hear.value.length == 0) {
        let errName=how_did_hear.nextElementSibling;
        errName.classList.remove("hide");
        errName.classList.add("error-message");
        val_count=val_count+1;
    }
    console.log(val_count);
    if(val_count>0){
        return false;
    }

    let data = {
        "name": name.value,
        "position": position.value,
        "organization": org_name.value,
        "email": checkEmail.value,
        "phone": checkPhone.value,
        "t_info": more_info.value,
        "h_info": how_improve.value,
        "o_type": org_type.value,
        "o_size": org_size.value,
        "o_tech": tech_s_choices_two,
        "sdg_goal": sdg_goal.value,
        "social_mission": social_mission.value,
        "sdg_clients":sdg_clients.value,
        "dig_tech_required":dig_tech_required.value,
        "impact":impact.value,
        "o_projects":o_projects.value,
        "hd_hear": how_did_hear.value
    };
    console.log(data);
//    submition(data);
};

//
function submition(ev) {
    let fd = new FormData();
    fd.append("name", ev.name);
    fd.append("org_name", ev.organization);
    fd.append("e_mail", ev.email);
    fd.append("position", ev.position);
    fd.append("phone", ev.phone);
    fd.append("more_info", ev.t_info);
    fd.append("how_improve", ev.h_info);
    fd.append("org_type", ev.o_type);
    fd.append("org_size", ev.o_size);
    fd.append("tech_support", ev.o_tech);
    fd.append("how_did_hear", ev.hd_hear);

    let opt = {
        mode: "cors",
        method: "POST",
        body: fd
    }


    fetch('http://www.lab7.ca/slide_api/api/form.php', opt)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })

};