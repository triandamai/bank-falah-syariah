import {getUser} from "@/services/jwt.service";


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

export const formatCurrency=(total)=>{
    if(total){
      return total.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      });
    }
    return "0,00.00"
}


export const checkPrivilage=(privilage)=> {
  const { role } = getUser();
  if(role[0]){
    const haveAllRole = privilage.roles.includes("public");
    if (haveAllRole) return true;
    if (role[0]) {
      const current_role = role[0].name;
      return  privilage.roles.includes(current_role);
    }
  }
  return false;
}