const Plans = [
  {
    description: "FaleMais 30",
    minutes: 30,
  },
  {
    description: "FaleMais 60",
    minutes: 60,
  },
  {
    description: "FaleMais 120",
    minutes: 120,
  },
];

const AreaCode = [
  {
    areaOrigin: "011",
    areaDestination: "016",
    price: 1.9,
  },
  {
    areaOrigin: "016",
    areaDestination: "011",
    price: 2.9,
  },
  {
    areaOrigin: "011",
    areaDestination: "017",
    price: 1.7,
  },
  {
    areaOrigin: "017",
    areaDestination: "011",
    price: 2.7,
  },
  {
    areaOrigin: "011",
    areaDestination: "018",
    price: 0.9,
  },
  {
    areaOrigin: "018",
    areaDestination: "011",
    price: 1.9,
  },
];

const DDDs = ["011", "016", "017", "018"];
const inputOrigin = document.getElementById("origin");
//console.log("inputOrigin", inputOrigin);
const inputDestination = document.getElementById("destination");

const inputTime = document.getElementById("time");
const notFind = document.getElementById("alert");

const PLANs = ["FaleMais 30", "FaleMais 60", "FaleMais 120"];
const inputPlan = document.getElementById("plan");

function setaAreaCode() {
  //console.log("setaAreaCode");

  const AddOptions = (select) => {
    DDDs.forEach((DDD) => {
      let option = document.createElement("option");
      option.innerHTML = DDD;
      option.value = DDD;
      select.appendChild(option);
    });
  };

  AddOptions(inputOrigin);
  AddOptions(inputDestination);
}

const matchSourceCode = (item) => {
  const itemAreaOrigin = item.areaOrigin;
  const itemAreaDestination = item.areaDestination;
  //console.log('itemAreaOrigin: ', itemAreaOrigin);
  //console.log('itemAreaDestination: ', itemAreaDestination);

  //console.log('aqui', inputOrigin.value);

  if (
    itemAreaOrigin === inputOrigin.value &&
    itemAreaDestination === inputDestination.value
  ) {
    return itemAreaOrigin && itemAreaDestination;
  }
};

function setaPlans() {
  const AddPlans = (select) => {
    PLANs.forEach((plan) => {
      let option = document.createElement("option");
      option.innerHTML = plan;
      option.value = plan;
      select.appendChild(option);
    });
  };

  AddPlans(inputPlan);
}

const matchSourcePlans = (item) => {
  const itemDescription = item.description;
  const itemMinutes = item.minutes;
  //console.log('itemAreaOrigin: ', itemAreaOrigin);

  //console.log('planos', inputPlan.value);

  if (itemDescription === inputPlan.value) {
    return itemMinutes;
  }
};

function calculation() {
  const origin = inputOrigin.value;
  //console.log("ddd:", origin);

  const destination = inputDestination.value;
  //console.log("ddd:", destination);

  const time = Number(inputTime.value);
  //console.log("tempo:", time);

  const plan = inputPlan.value;
  //console.log("plano:", plan);

  const areaCodeItem = AreaCode.find(matchSourceCode);
  //console.log("areaCodeItem: ", areaCodeItem);

  const planItem = Plans.find(matchSourcePlans);
  //console.log("planItem: ", planItem);

  if (!time || !plan || !origin || !destination || origin === destination) {
    notFind.innerText =
      "Não foi possível calcular. Por favor, preencha os campos corretamente.";

    return;
  }

  let notPlan = Number(time * areaCodeItem.price);
  document.getElementById("notPlan").innerHTML =
    "R$ " + notPlan.toFixed(2).toString().replace(".", ",");
  //console.log("valor sem plano", notPlan);

  let withPlan = Number((Math.max(time - planItem.minutes, 0) * areaCodeItem.price)*1.10);
  document.getElementById("withPlan").innerHTML = 
    "R$ " + withPlan.toFixed(2).toString().replace(".", ",");
  //console.log("valor com plano", withPlan);
}

window.addEventListener("load", () => {
  setaAreaCode();
  setaPlans();
});
