/* eslint-disable import/extensions */
import {
    fetchLoggedInUser,
    handleFetch,
  //  setNav,
    getFetchOptions,  
  } from './global.js';

  const main = async () => {
    // let formData = {}

    const form = document.querySelector("#listItem-form")
    const url = '/api/create-listing'
    const createListingRequest = async (e) => {
      e.preventDefault()
      const formData = new FormData(form)
      const options = getFetchOptions(Object.fromEntries(formData.entries()));
      console.log(formData, options)
      const [response, err] = await handleFetch(url, options)
      console.log(response)
      if (err) {
        form.reset();
        return alert('Something went wrong');
      }
      return response
    }
    

    
    form.addEventListener('submit', (e) => createListingRequest(e))
    
  }

  main()