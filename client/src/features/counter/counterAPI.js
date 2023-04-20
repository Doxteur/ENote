// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  // return error to test 
   return new Promise((resolve, reject) => {
     reject(new Error('error'));
  });
}
