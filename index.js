const dayInput = document.getElementById("day-in");
const monthInput = document.getElementById("month-in");
const yearInput = document.getElementById("year-in");

const dayGroup = document.getElementsByClassName("day-group")[0];
const monthGroup = document.getElementsByClassName("month-group")[0];
const yearGroup = document.getElementsByClassName("year-group")[0];

const submitButton = document.getElementById("submit-button");

function daysInMonth(m, y) {
  // m is 0 indexed: 0-11
  switch (m) {
    case 1:
      return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
    case 8:
    case 3:
    case 5:
    case 10:
      return 30;
    default:
      return 31;
  }
}

function isValid(d, m, y) {
  console.log(m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y), "ISVALID");
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m - 1, y);
}

const inputHandler = (input, group, length, max, min) => {
  return () => {
    if (input.value.length > length) {
      input.value = input.value.slice(0, length);
    }
    const setInvalidClass = (className) => {
      group.classList.add("invalid");
      group.getElementsByClassName(className)[0].classList.remove("hidden");
    };
    if (input.value == "") {
      setInvalidClass("required");
    } else if (input.value > max || input.value < min) {
      setInvalidClass("error");
    } else {
      group.classList.remove("invalid");
      group.getElementsByClassName("error")[0].classList.add("hidden");
      group.getElementsByClassName("required")[0].classList.add("hidden");
    }
  };
};

dayInput.oninput = inputHandler(dayInput, dayGroup, 2, 31, 1);
monthInput.oninput = inputHandler(monthInput, monthGroup, 2, 12, 1);
yearInput.oninput = inputHandler(yearInput, yearGroup, 4, 2023, 1);

const groups = [dayGroup, monthGroup, yearGroup];
const inputs = [dayInput, monthInput, yearInput];

submitButton.addEventListener("click", () => {
  if (groups.some((g) => g.classList.contains("invalid"))) {
    return;
  }

  const dayVal = dayInput.value;
  const monthVal = monthInput.value;
  const yearVal = yearInput.value;

  if (!isValid(dayVal, monthVal, yearVal)) {
    groups.forEach((g) => g.classList.add("invalid"));
    return;
  }

  const today = new Date();
  const birthday = new Date(yearVal, monthVal - 1, dayVal);
  const diffInMillisecond = today.valueOf() - birthday.valueOf();

  const year_age = Math.floor(diffInMillisecond / 31536000000);
  let day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);

  if (
    today.getMonth() == birthday.getMonth() &&
    today.getDate() == birthday.getDate()
  ) {
    alert("Happy Birthday!");
  }

  const month_age = Math.floor(day_age / 30);
  day_age = day_age % 30;

  document.getElementById("days-out").style.setProperty("--day", day_age);
  document.getElementById("month-out").style.setProperty("--month", month_age);
  document.getElementById("years-out").style.setProperty("--year", year_age);
});
