const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let emailInput = document.getElementById("email-input")
let submitButton = document.getElementById("submit-btn")
let errorMessage = document.querySelector('.error-message')
let disabledButton = true;

if(submitButton)
{
    submitButton.disabled = disabledButton;

    emailInput.addEventListener('input',function(){
       
        if(emailFormat.test(emailInput.value))
        {
            disabledButton = false;

            submitButton.style.color = 'black';
            submitButton.style.backgroundColor = 'rgb(255, 255, 255)';
            errorMessage.style.visibility = 'hidden';
        }else{
            disabledButton = true;

            errorMessage.style.visibility = 'visible';
            submitButton.style.color = 'gray';
            submitButton.style.backgroundColor = 'red';
        }

        submitButton.disabled = disabledButton;
    })

    submitButton.addEventListener('click',function(){
        alert(emailInput.value)
    })
}



