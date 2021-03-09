function slider({container, slide, nextArrov, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider
    const slides = document.querySelectorAll(container),
          slider = document.querySelector(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrov),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        total.innerHTML = `0${slides.length}`;
    } else {
        total.innerHTML = slides.length;
    }

    if (slides.length < 10) {
        current.innerHTML = `0${slideIndex}`;
    } else {
        current.innerHTML = slideIndex;
    }

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => slide.width = width);

    slidesField.style.cssText = `
        display: flex;
        width: ${100 * slides.length}%;
        transition: 0.5s all;
    `;

    slider.style.position = 'relative';

    const carousel = document.createElement('ul'),
          dots = [];

    carousel.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(carousel);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        dot.setAttribute('data-slide-to', i+1);
        carousel.append(dot);
        dots.push(dot);
        dots[0].style.opacity = 1;
    }

    function toDigit(string) {
        return +string.replace(/\D/g, '');
    }

    function setCurrent() {
        if (slideIndex < 10) {
            current.innerHTML = `0${slideIndex}`;
        } else {
            current.innerHTML = slideIndex;
        }
    }

    function colorizeDot() {
        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == toDigit(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += toDigit(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        setCurrent();
        colorizeDot();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = toDigit(width) * (slides.length - 1);
        } else {
            offset -= toDigit(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        setCurrent();
        colorizeDot();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const moveTo = event.target.getAttribute('data-slide-to');
            slideIndex = moveTo;
            offset = toDigit(width) * (moveTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setCurrent();
            colorizeDot();
        });
    });
}

export default slider;