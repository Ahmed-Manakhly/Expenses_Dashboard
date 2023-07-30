
const FIREBASE_DOMAIN = 'https://shopping-cart-d437f-default-rtdb.firebaseio.com/expenseslist.json';
//----------------------------------------------------------------------------------------------
export async function getExpensesList() {
  const response = await fetch(`${FIREBASE_DOMAIN}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch expenseslist.');
  }

  const transformedDate = [];

  for (const key in data) {
    const dateObj = {
      id: key,
      date : new Date(data[key].date) ,
      rental : +data[key].rental,
      electricity : +data[key].electricity,
      internet : +data[key].internet,
      food : +data[key].food,
      detergents : +data[key].detergents,
      transportation : +data[key].transportation, 
      maintenance : +data[key].maintenance,
      checkup : +data[key].checkup,
    };
    transformedDate.push(dateObj);
  }

  return transformedDate;
}
//----------------------------------------------------------------------------------------------
export async function sendEx(Exdata) {
  const response = await fetch(`${FIREBASE_DOMAIN}`, {
    method: 'PUT',
    body: JSON.stringify(Exdata),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not send Data.');
  }

  return null;
}
//---------------------------------------------------------------------------------------------- dayTotalMount
export const recordTotalAmount = (dayObj) =>{
  const dayRecord ={ ...dayObj , date : 0 , id : 0} // override on id and date before collecting the total amount 
  const dayRecordArr =  Object.values(dayRecord) ;
  return (dayRecordArr.reduce( (curNumber , item) => {
    return curNumber + item;
  } , 0) )
}
//---------------------------------------------------------------------------------------------- grandTotal
export const grandTotal = (data) =>{
  return (data.reduce( (curNumber , item) => {
    return curNumber + item.totalRow;
  } , 0) )
}
//---------------------------------------------------------------------------------------------- colTotal
export const colTotal = (data ,prop) =>{
  return (data.reduce( (curNumber , item) => {
    return curNumber + item[prop];
  } , 0) )
}
//----------------------------------------------------------------------------------------------- formatting Date

export const formattingFullDate = (date) =>{
  const month = date.toLocaleString('en-US',{month :'short'});
  const day = date.toLocaleString('en-US',{day :'2-digit'});
  const year = date.toLocaleString('en-US',{year :'2-digit'});
  return `${day}-${month}-${year}` ;
}

//------------------------------------------------------------------------------------------ filter data
export const filteredExpenses = (data,filterBy , filterVal )=>{
  if(filterBy === 'month'){
    return data.filter(ex => {
      if(filterVal === "All"){ 
          return ex;
      }else {
          return ex.date.toLocaleString('en-US',{month :'long'}) === filterVal ;
        }
      } 
    )
  }else{
    return data.filter(ex => {
      if(filterVal === "All"){ 
          return ex;
      }else {
          return ex.date.getFullYear().toString() === filterVal ;
        }
      } 
    )
  }
}
//----------------------------------------------------------------------
export function dateToYMD(date) {
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
//----------------------------------------------- 
