/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  handleFetch,
//  setNav,
  getFetchOptions,  
} from './global.js';

const main = async () => {
  
  // GET NOT USER LISTINGS
  let data
  const getNotUserListings = async (url) => {
    const [response, _err] = await handleFetch(url, { credentials: 'include' });
    if (_err) {
      return alert('Something went wrong');
    }else{
      console.log("This works")
    }
    return response
  }
  data = await getNotUserListings("/api/marketplace") 
    
    
  console.log(data)

};

//main();
//getUNotUsergetNotUserListings())""chttp://localhost:5500/api/marketplaceeconsole.log.timeLog()Log()log

main();