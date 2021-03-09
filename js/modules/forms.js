import {closeModal, showModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector),
          messages = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо, мы скоро с вами свяжемся',
            failure: 'Что-то пошло не так'
    };

    function bindPostData(form){
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));


            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(messages.success);
                form.reset();
                statusMessage.remove();
            })
            .catch(() => (showThanksModal(messages.failure)))
            .finally(() => form.reset());
        });
    }
    forms.forEach(item => {
        bindPostData(item);
    });

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        showModal('.modal', modalTimerId);

        const modalDialog = document.createElement('div');
        document.querySelector('.modal').append(modalDialog);
        modalDialog.classList.add('modal__dialog');
        modalDialog.innerHTML = `
            <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
            </div>
        `;

        setTimeout(() => {
            modalDialog.remove();
            prevModalDialog.classList.remove('hide');
            prevModalDialog.classList.add('show');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;