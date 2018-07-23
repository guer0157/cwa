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

    let hd_hear = document.getElementById("hd_hear");

    //compile data into object for validation
    let obj = {
        "name": f_name.value,
        "position": position.value,
        "organization": o_name.value,
        "email": email.value,
        "phone": phone.value,
        "t_info": t_info.value,
        "h_info": h_info.value,
        "o_type": radio_btns_org,
        "o_size": radio_btns_size,
        "o_tech": checkbox_tech,
        "hd_hear": hd_hear.value
    }
    console.log(obj);

//    validateData(obj);
}

//Data validation function
function validateData(ev) {

    let name = ev.name;
    if (name.value == "") {
        name.setCustomValidity(`Please provide a Name`);
        name.reportValidity();
    }
    let position = ev.position;

    let org_name = ev.organization;

    if (org_name.value == "") {
        org_name.setCustomValidity(`Plese provide the name of your organization`);
        org_name.reportValidity();
    }

    //val email   
    let checkEmail = ev.email;
    let emailPattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let emailPass = emailPattern.test(checkEmail.value);
    if (emailPass == false) {
        if (checkEmail.value.length == 0) {
            checkEmail.setCustomValidity(`Please provide an E-mail`);
            checkEmail.reportValidity();
            return false;
        } else {
            checkEmail.setCustomValidity(`Invalid E-mail use format user@youremail.com`);
            checkEmail.reportValidity();
        }
    }

    //validate phone
    let checkPhone = ev.phone;
    if (!checkPhone.value == "") {
        let phonePattern_dashes = new RegExp(/^([0-9][0-9][0-9])-?([0-9][0-9][0-9])-?([0-9][0-9][0-9][0-9])$/);
        let phonePass_dash = phonePattern_dashes.test(checkPhone.value);
        if (!phonePass_dash) {
            checkPhone.setCustomValidity(`Please provide area code. Only characters ( 0-9 and - ) allowed. `);
            checkPhone.reportValidity();
            return false;
        }
    }

    let more_info = ev.t_info;
    if (more_info.value == "") {
        more_info.setCustomValidity(`Please tell us about your organization`);
        more_info.reportValidity();
    }

    let how_improve = ev.h_info;
    if (how_improve.value.length == 0) {
        how_improve.setCustomValidity(`Please provide an answer`);
        how_improve.reportValidity();
    }

    let org_type = ev.o_type;

    if (org_type == null) {
        let change_text = document.getElementById('type_legend');
        change_text.innerHTML = "Your organization is:<span id='alertmsg' class='italic'> *Please select atleast one of the options below.</span>";
        let check_event = document.querySelectorAll("input[name='o_type']");
        check_event.forEach(checkbox => {
            checkbox.addEventListener('click', function clearText() {
                let original_text = document.getElementById('type_legend');
                original_text.innerHTML = "Your organization is:<span class='italic'> Thank you!</span>"
                setTimeout(clear => {
                    original_text.textContent = "Your organization is:";
                }, 1000)
            })
        })
        return false;
    }
    let org_type_val = org_type.value;
    if (org_type.value == "other") {
        let radio_btns_input = document.getElementById("o_org_type");
        org_type_val = radio_btns_input.value;
        if (radio_btns_input.value.length == 0) {
            radio_btns_input.setCustomValidity(`Please explain your answer`);
            radio_btns_input.reportValidity();
            return false;
        }
    }

    let org_size = ev.o_size;
   
        if(org_size==null){
            let change_size_legend=document.getElementById("org_size");
            change_size_legend.innerHTML="Your organization size: <i class='italic'>*Please specify your organizations size</i>"
        let size_btns=document.querySelectorAll("input[name='o_size']");
        size_btns.forEach(input=>{
            input.addEventListener('click', function(){
                let original_text = document.getElementById('org_size');
                original_text.innerHTML = "Your organization size: <i class='italic'>Thank you!</i>"
                setTimeout(clear => {
                    original_text.innerHTML = "Your organization size <i class='italic'>(employees and volunteers)</i>";
                }, 1000)
            })
        })
            return false;
        }

    let tech_support = ev.o_tech;
    let tech_choices = [];
    if (tech_support.length == 0) {
        tech_support_val = false;
        let change_text = document.getElementById('c_tech_legend');
        change_text.innerHTML = "Current technical support available:<span class='italic'> *Please select atleast one of the options below.</span>";
        let check_event = document.querySelectorAll("input[name='c_tech']");
        check_event.forEach(checkbox => {
            checkbox.addEventListener('click', function clearText() {
                let original_text = document.getElementById('c_tech_legend');
                original_text.innerHTML = "Current technical support available:<span class='italic'> Thank you!</span>"
                setTimeout(clear => {
                    original_text.textContent = "Current technical support available:";
                }, 1000)
            })
        })
        return false;
    }
    let checkbox_other = document.getElementById('other_sup');
  
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
            other_text_field.reportValidity();
            return false;
        }
    }
    let tech_s_choices_s = JSON.stringify(tech_choices);
    let clean_tech_open= new RegExp(/\[/);
    let clean_tech_close= new RegExp(/\]/);
    let tech_s_choices_one= tech_s_choices_s.replace(clean_tech_open,"");
    let tech_s_choices_two= tech_s_choices_one.replace(clean_tech_close,"");
  
    
    //validate how did you hear
    let how_did_hear = ev.hd_hear;
    if (how_did_hear.value.length == 0) {
        how_did_hear.setCustomValidity(`Please provide an answer`);
        how_did_hear.reportValidity();
    }
    
    

    let data = {
        "name": name.value,
        "position": position.value,
        "organization": org_name.value,
        "email": checkEmail.value,
        "phone": checkPhone.value,
        "t_info": more_info.value,
        "h_info": how_improve.value,
        "o_type": org_type_val,
        "o_size": org_size.value,
        "o_tech": tech_s_choices_two,
        "hd_hear": how_did_hear.value
    };

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