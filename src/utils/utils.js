/***
 * Author Bakaran Project
 * Made by Trian Damai
 * 28 Jan 2021 - 10:14
 *
 */
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
      const parse = parseFloat(total)
      return parse.toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
      });
    }
    return "0,00.00"
}


export const checkPrivileges=(privileges)=> {
  const haveAllRole = privileges.roles.includes("public");
  if(haveAllRole) return true
  const user = getUser();
  if(user){
    if (user.role[0]) {
      const current_role = user.role[0].name;
      return  privileges.roles.includes(current_role);
    }
    return false
  }
  return false;
}