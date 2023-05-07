/* eslint-disable import/extensions */
import {
    fetchLoggedInUser,
    handleFetch,
  //  setNav,
    getFetchOptions,  
  } from './global.js';

  const main = async () => {
    let formData
    const form = document.querySelector("#listItem-form")
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        for (const pair of formData.entries()) {
          //console.log(pair)
          formData[pair[0]] = pair[0] 
          console.log(pair)  
        }
      })
      console.log(formData)
  }

  main()