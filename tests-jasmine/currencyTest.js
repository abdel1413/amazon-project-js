import { currencyFormatter } from "../script/sharedScripts/currencyFormatter.js";

describe("test suite: currencyFormater", () => {
  it("converts cents into dollars", () => {
    expect(currencyFormatter(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(currencyFormatter(0)).toEqual("0.00");
  });
  it("round up to the nearest cent", () => {
    expect(currencyFormatter(2000.5)).toEqual("20.01");
  });
  it("round down to the rearest cent", () => {
    expect(currencyFormatter(2000.4)).toEqual("20.00");
  });
});
