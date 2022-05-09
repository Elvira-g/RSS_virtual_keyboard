window.addEventListener('load',() => {
    const textareaBlock = document.querySelector('.textarea-block');

    const textarea = `<textarea class="textarea" autofocus></textarea>`;
    textareaBlock.insertAdjacentHTML('beforeend', textarea);
})