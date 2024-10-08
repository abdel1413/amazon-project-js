const xml = new XMLHttpRequest();

xml.addEventListener("load", () => {
  let resp = xml.response;
  console.log("r", resp);
});
xml.open("GET", "https://supersimplebackend.dev");
xml.send();
