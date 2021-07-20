export const defaultLocale = "id";
export const localeOptions = [
  { id: "en", name: "English" },
  { id: "id", name: "Indonesia" }
];

export const getTodayDate=()=>{
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
//currency

export const formatCurrency=(total)=>  total.toFixed(2).replace(/./g, function(c, i, a) {
  return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
});