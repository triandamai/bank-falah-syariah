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
  const getMonth=(month)=>{
    if(month < 10){
      return `0${month}`
    }
    return month
  }
  const getDate=(date)=>{
    if(date < 10){
      return `0${date}`
    }
    return date
  }
  return `${date.getFullYear()}-${getMonth(date.getMonth()+1)}-${getDate(date.getDate())}`
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
  console.log(user)
  if(user){
    if(user.role.length > 0){
      if (user.role[0]) {
        const current_role = user.role[0].name;
        return  privileges.roles.includes(current_role);
      }
      return false
    }
    return false
  }
  return false;
}