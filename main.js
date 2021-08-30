const tipAmount = document.querySelector("#tip");
const totalAmount = document.querySelector("#total");

const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const reset = document.querySelector("#reset");
const custom = document.querySelector(".tip.custom");
const tips = document.querySelectorAll(".tip.given");

const getBill = () => {
  return parseFloat(billInput.value);
};

const getTip = () => {
  const completed = document.querySelector(".completed");
  let tip = 0;

  if (completed) {
    tip = parseFloat(completed.dataset.tip);
  } else if (isFinite(custom.value)) {
    tip = parseFloat(custom.value);
  }
  return tip / 100;
};

const getPeople = () => {
  const peopleCount = peopleInput.value;
  const result = parseFloat(peopleCount);
  if (isNaN(result)) return 1;
  return result;
};

const resetCompleted = () => {
  tips.forEach((tip) => tip.classList.remove("completed"));
};

const makeFilled = () => {
  if (!reset.classList.contains("filled")) {
    reset.classList.add("filled");
  }
};

const compute = () => {
  const bill = getBill();
  const tip = getTip();
  const people = getPeople();

  const tipGiven = (bill * tip) / people;
  const total = bill / people + tipGiven;
  if (isNaN(tipGiven)) {
    tipAmount.textContent = "$0.00";
  } else {
    tipAmount.textContent = `$${tipGiven.toFixed(2)}`;
  }
  if (isNaN(tipGiven)) {
    totalAmount.textContent = "$0.00";
  } else {
    totalAmount.textContent = `$${total.toFixed(2)}`;
  }
};

billInput.addEventListener("keyup", () => {
  compute();
});
peopleInput.addEventListener("keyup", () => {
  compute();
});
custom.addEventListener("keyup", () => {
  resetCompleted();
  makeFilled();
  compute();
});

tips.forEach((tip) => {
  tip.addEventListener("click", () => {
    resetCompleted();
    makeFilled();
    custom.value = "";

    tip.classList.add("completed");
    compute();
  });
});

reset.addEventListener("click", () => {
  resetCompleted();
  reset.classList.remove("filled");
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
});
