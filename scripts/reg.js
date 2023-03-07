import { get, post} from "./requests.js";

$(document).ready(function () {
    navbarChek();
});
$("#button-submit").click(function (){
    CheckValidation();
})

function CheckValidation(){
    let login = $('#input-login').val()
    let loginExp = /[a-zA-z]+\w*/
    if(loginExp.test(login) && login.length >= 5){
        $('#input-login').removeClass('is-invalid')
    } else {
        $('#input-login').addClass('is-invalid')
        return false
    }

    let password = $("#input-password").val()
    if(password.length < 6){
        $("#input-password").addClass("is-invalid")
        return false
    } else {
        $("#input-password").removeClass("is-invalid")
    }
}

function navbarChek(){
    get(`http://v1683738.hosted-by-vdsina.ru:5000/users/me`)
        .then(profile => {
            $("#navbar").find("#nickname").text(profile.login);
            $("#signout").click(() => {
                post(`http://v1683738.hosted-by-vdsina.ru:5000/auth/logout`)
                    .then(() => {
                        localStorage.setItem("userToken", "");
                        localStorage.setItem("refreshUserToken", "");
                        window.location.href = '../pages/login.html'
                    });
            })
            // todo добавить обработку ролей
            localStorage.setItem("userId", profile.id);
        })
}