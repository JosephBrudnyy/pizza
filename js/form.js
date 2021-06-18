;(function (){
    let forms = document.querySelectorAll('.form-send');

    if (forms.length === 0){
        return;
    }

    let formSend = form => {
        let xhr = new XMLHttpRequest();
        let url = 'mail/mail.php';

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-url-urlencoded');

        xhr.onload = () => {
            console.log(xhr.response)
        }

        xhr.send();
    }

    for(let i = 0; i < forms.length; i+=1){
        forms[i].addEventListener('submit', e=>{
            e.preventDefault();
            let form = e.currentTarget;

            formSend(form)
        })
    }
})();