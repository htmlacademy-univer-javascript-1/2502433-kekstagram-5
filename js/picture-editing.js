const SCALE_STEP = 25;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 0,
    step: 1,
    unit: ' ',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ' ',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
const scaleInput = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');
const effectLevel = form.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

let chosenEffect = DEFAULT_EFFECT;
const isDefaultEffect = () => chosenEffect === DEFAULT_EFFECT;
const resetEffect = () => {
  image.style.filter = 'none';
};

effectLevel.classList.add('visually-hidden');

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

const updateSlider = (effect = DEFAULT_EFFECT) => {
  effectLevel.classList.remove('visually-hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.max,
  });
  if (isDefaultEffect()) {
    effectLevel.classList.add('visually-hidden');
  }
  effectLevelValue.value = effect.max;
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider(chosenEffect);
};

const onSliderUpdate = () => {
  resetEffect();
  const effectValue = slider.noUiSlider.get();
  image.style.filter = `${chosenEffect.style}(${effectValue}${chosenEffect.unit})`;
  effectLevelValue.value = parseFloat(effectValue);
};

slider.noUiSlider.on('update', onSliderUpdate);
form.addEventListener('change', onFormChange);

const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onScaleButtonClick = (isBigger) => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = isBigger ? currentValue + SCALE_STEP : currentValue - SCALE_STEP;
  if ((isBigger && newValue <= DEFAULT_SCALE) || (!isBigger && newValue >= MIN_SCALE)) {
    scaleImage(newValue);
    smallerButton.removeAttribute('disabled');
    biggerButton.removeAttribute('disabled');
  } else {
    if (isBigger) {
      biggerButton.setAttribute('disabled', true);
    } else {
      smallerButton.setAttribute('disabled', true);
    }
  }
};

const onSmallerButtonClick = () => onScaleButtonClick(false);
const onBiggerButtonClick = () => onScaleButtonClick(true);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

const resetImage = () => {
  resetEffect();
  effectLevel.classList.add('visually-hidden');
  scaleImage(DEFAULT_SCALE);
};

export { resetImage };
