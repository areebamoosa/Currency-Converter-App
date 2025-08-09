const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_oBFF1aO3ssIB6G5EZxJe0ckQjq0xzK848PCLN3HU";

const fromDrop = document.querySelectorAll("select")[0];
const toDrop = document.querySelectorAll("select")[1];
const getBtn = document.querySelector("button");
const amountInput = document.querySelector("input");
const msg = document.querySelector(".msg");
const exchangeIcon = document.querySelector(".fa-arrow-right-arrow-left");
const fromImg = document.querySelectorAll(".select-container img")[0];
const toImg = document.querySelectorAll(".select-container img")[1];

// Set flag image when dropdown changes
[fromDrop, toDrop].forEach((select, index) => {
  select.addEventListener("change", (e) => {
    const currencyCode = e.target.value;
    const countryCode = getCountryCode(currencyCode);
    const img = index === 0 ? fromImg : toImg;
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  });
});

// Reversing currencies when icon is clicked
exchangeIcon.addEventListener("click", () => {
  [fromDrop.value, toDrop.value] = [toDrop.value, fromDrop.value];
  fromImg.src = `https://flagsapi.com/${getCountryCode(
    fromDrop.value
  )}/flat/64.png`;
  toImg.src = `https://flagsapi.com/${getCountryCode(
    toDrop.value
  )}/flat/64.png`;
});

// Fetch and display exchange rate
getBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  //   parseFloat() converts strings into real (decimal) numbers
  const fromCurrency = fromDrop.value;
  const toCurrency = toDrop.value;

  if (isNaN(amount) || amount <= 0) {
    msg.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const url = `${BASE_URL}&base_currency=${fromCurrency}`;
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.data[toCurrency].value;
    const total = (rate * amount).toFixed(2);

    msg.innerText = `${amount} ${fromCurrency} = ${total} ${toCurrency}`;
  } catch (error) {
    msg.innerText = "Something went wrong. Please try again.";
  }
});

// Helper: Get country code for flag from currency code
function getCountryCode(currency) {
  const map = {
    USD: "US",
    PKR: "PK",
    AUD: "AU",
  };
  return map[currency] || "US";
}
