// src/utlis.ts
function generateSlug(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}
var currentDate = /* @__PURE__ */ new Date();

export {
  generateSlug,
  currentDate
};
