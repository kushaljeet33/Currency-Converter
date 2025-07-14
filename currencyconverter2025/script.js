const currencyToCountry = {
    USD: 'us',    EUR: 'de',    GBP: 'gb',    INR: 'in',    JPY: 'jp',
    AUD: 'au',    CAD: 'ca',    CHF: 'ch',    CNY: 'cn',    SEK: 'se',
    NZD: 'nz',    SAR: 'sa',    AED: 'ae',    KRW: 'kr',    RUB: 'ru',
    ZAR: 'za',    SGD: 'sg',    HKD: 'hk',    NOK: 'no',    DKK: 'dk',
    MXN: 'mx',    BRL: 'br',    IDR: 'id',    TRY: 'tr',    THB: 'th',
    MYR: 'my',    PHP: 'ph',    VND: 'vn',    EGP: 'eg',    NGN: 'ng',
    PKR: 'pk',    BDT: 'bd',    LKR: 'lk',    KES: 'ke',    TWD: 'tw',
    ARS: 'ar',    PEN: 'pe',    COP: 'co',    CLP: 'cl',    CZK: 'cz',
    HUF: 'hu',    PLN: 'pl',    RON: 'ro',    UAH: 'ua',    IQD: 'iq',
    IRR: 'ir',    QAR: 'qa',    BHD: 'bh',    KWD: 'kw',    OMR: 'om',
    JOD: 'jo',    MAD: 'ma',    DZD: 'dz',    GHS: 'gh',    TZS: 'tz',
    MZN: 'mz',    ETB: 'et',    UGX: 'ug',    SDG: 'sd',    XOF: 'sn',
    XAF: 'cm',    BWP: 'bw',    NAD: 'na',    MUR: 'mu',    NPR: 'np',
    MMK: 'mm',    KHR: 'kh',    LAK: 'la',    MNT: 'mn',    BGN: 'bg',
    ISK: 'is',    MKD: 'mk',    TND: 'tn',    LBP: 'lb',    ALL: 'al',
    GEL: 'ge',    AMD: 'am',    AZN: 'az',    KZT: 'kz',    UZS: 'uz',
    TMT: 'tm',    BYN: 'by',    MDL: 'md',    BAM: 'ba',    RSD: 'rs',
    HRK: 'hr',    MOP: 'mo',    BSD: 'bs',    BBD: 'bb',    JMD: 'jm',
    DOP: 'do',    HTG: 'ht',    TTD: 'tt',    XCD: 'ag',    BZD: 'bz',
    GTQ: 'gt',    HNL: 'hn',    NIO: 'ni',    CRC: 'cr',    PAB: 'pa',
    BOB: 'bo',    PYU: 'py',    SRD: 'sr',    FJD: 'fj',    WST: 'ws',
    TOP: 'to',    PGK: 'pg',    VUV: 'vu',    BTN: 'bt',    DJF: 'dj',
    AOA: 'ao',    MGA: 'mg',    ZMW: 'zm',    MWK: 'mw',    GMD: 'gm',
    XPF: 'pf',    CDF: 'cd',    GNF: 'gn',    RWF: 'rw',    BIF: 'bi'
  };
  
  let currencyList = [];
  
  const fromDropdown = document.getElementById("fromDropdown");
  const toDropdown = document.getElementById("toDropdown");
  const amount = document.getElementById("amount");
  const result = document.getElementById("result");
  const convertBtn = document.getElementById("convertBtn");
  
  let selectedFrom = null;
  let selectedTo = null;
  
  async function fetchCurrencies() {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();
    currencyList = Object.keys(data.rates);
    populateDropdown(fromDropdown, "from");
    populateDropdown(toDropdown, "to");
  }
  
  
  function getFlagURL(currency) {
    const code = currencyToCountry[currency];
    return code ? `https://flagcdn.com/24x18/${code}.png` : "";
  }
  
  function populateDropdown(dropdown, type) {
    const optionsDiv = dropdown.querySelector(".options");
    optionsDiv.innerHTML = "";
  
    currencyList.forEach(currency => {
      const option = document.createElement("div");
      option.classList.add("option");
  
      const flagImg = document.createElement("img");
      flagImg.className = "flag";
      flagImg.src = getFlagURL(currency);
  
      const label = document.createElement("span");
      label.textContent = currency;
  
      option.appendChild(flagImg);
      option.appendChild(label);
  
      option.addEventListener("click", () => {
        dropdown.querySelector(".selected").innerHTML = `${flagImg.outerHTML} ${currency}`;
        optionsDiv.style.display = "none";
  
        if (type === "from") selectedFrom = currency;
        else selectedTo = currency;
      });
  
      optionsDiv.appendChild(option);
    });
  
    dropdown.querySelector(".selected").addEventListener("click", () => {
      const isVisible = optionsDiv.style.display === "block";
      document.querySelectorAll(".options").forEach(opt => opt.style.display = "none");
      optionsDiv.style.display = isVisible ? "none" : "block";
    });
  }
  
  async function convertCurrency() {
    if (!selectedFrom || !selectedTo || !amount.value || isNaN(amount.value)) {
      result.innerText = "Select currencies and enter valid amount.";
      return;
    }
  
    const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${selectedFrom}`);
    const data = await res.json();
    const rate = data.rates[selectedTo];
  
    const converted = (amount.value * rate).toFixed(2);
    result.innerText = `${amount.value} ${selectedFrom} = ${converted} ${selectedTo}`;
  }
  
  convertBtn.addEventListener("click", convertCurrency);
  window.addEventListener("load", fetchCurrencies);
  
