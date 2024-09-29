import { currencyFormatter } from "../script/sharedScripts/currencyFormatter.js";

console.log("test suite: currencyFormater");

console.log("converts cents into dollars");
currencyFormatter(2095) === "20.95"
  ? console.log("passed")
  : console.log("failed");

console.log("works with 0");
currencyFormatter(0) === "0.00" ? console.log("passed") : console.log("failed");

console.log("round up to the nearest cent ");
currencyFormatter(2000.5) === "20.01"
  ? console.log("passed")
  : console.log("failed");

console.log("round down to the nearest cent");
currencyFormatter(2000.4) === "20.00"
  ? console.log("passed")
  : console.log("failed");

console.log("end of currencyFormatter test suite");
