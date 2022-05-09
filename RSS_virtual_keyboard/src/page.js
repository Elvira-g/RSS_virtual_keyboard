const body = document.querySelector('body');

window.addEventListener('load', () => {
    const container = `<div class="container">
        <h1 class="title">RSS Virtual Keyboard</h1>
        <div class="textarea-block"></div>
        <div class="keyboard-block"></div>
        <div class="footer">
            <p class="footer-text">Клавиатура создана в операционной системе iOS</p>
            <p class="footer-text">Для переключения языка комбинация: левыe ctrl + alt </p>
        </div>
    </div>`;
    body.insertAdjacentHTML('beforeend', container);

//     const textareaBlock = document.querySelector('.textarea-block');

// const textarea = `<textarea name="" id="" cols="30" rows="10" class="textarea"></textarea>`;
// textareaBlock.insertAdjacentHTML('beforeend', textarea);
})