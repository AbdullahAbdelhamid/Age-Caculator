const inputElements = document.querySelectorAll('.card__input');
const submentButton = document.querySelector('.card__button');

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};
const validatemonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validateyear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (dayElement, monthElement, yearElement) => {
  const isVlid = [false, false, false];
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add('card__input--error');
  } else {
    isVlid[0] = true;
    dayElement.classList.remove('card__input--error');
  }
  if (!validatemonth(monthElement.value)) {
    monthElement.classList.add('card__input--error');
  } else {
    isVlid[1] = true;
    monthElement.classList.remove('card__input--error');
  }
  if (!validateyear(yearElement.value)) {
    yearElement.classList.add('card__input--error');
  } else {
    isVlid[2] = true;
    yearElement.classList.remove('card__input--error');
  }
  return isVlid.every((item) => item === true);
};
const calculateAge = (year, month, day) => {
  const today = new Date();
  const birhDay = new Date(year, month - 1, day);
  let age = today.getFullYear() - birhDay.getFullYear();
  const monthDiff = today.getMonth() - birhDay.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birhDay.getDate())) {
    age--;
  }
  return age;
};
const onClickHandler = () => {
  const dayElement = document.querySelector('.card__input[name="day"]');
  const monthElement = document.querySelector('.card__input[name="month"]');
  const yearElement = document.querySelector('.card__input[name="year"]');
  const resultElement = document.querySelector('.card__resultValue');

  if (!isDateValid(dayElement, monthElement, yearElement)) {
    resultElement.textContent = '--';
    return;
  }

  const yourAge = calculateAge(yearElement.value, monthElement.value, dayElement.value);
  resultElement.textContent = yourAge;
};
inputElements.forEach((item) => {
  item.addEventListener('keydown', (event) => event.key === 'Enter' && onClickHandler());
});
submentButton.addEventListener('click', onClickHandler);
