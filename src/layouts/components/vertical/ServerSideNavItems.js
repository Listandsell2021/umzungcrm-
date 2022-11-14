// ** React Imports
import { useEffect, useState } from 'react'

// ** Import All Icons
import * as Icons from 'mdi-material-ui'

// ** Axios Import
import axios from 'axios'

const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])
  useEffect(() => {

    axios.get('https://umzungcrmtest.vercel.app/api/getnavigations').then(response => {
      const menuArray = response.data
      console.log(menuArray)
      /**
       *  Replace the icon string with the component
       *  If you don't want to import the whole icon library
       *  you can create a static object and replace the icons using that object
       */
      const finalMenuArray = items => {
        return items.map(item => {
          if (item.icon) {
            // @ts-ignore
            item.icon = Icons[item.icon]
            if (item.children) {
              finalMenuArray(item.children)
            }

            return item
          }

          return item
        })
      }
      setMenuItems(finalMenuArray(menuArray))
    })



    /*axios.get('/api/vertical-nav/data').then(response => {
      const menuArray = response.data
console.log(menuArray)
      /**
       *  Replace the icon string with the component
       *  If you don't want to import the whole icon library
       *  you can create a static object and replace the icons using that object
       */
      /*const finalMenuArray = items => {
        return items.map(item => {
          if (item.icon) {
            // @ts-ignore
            item.icon = Icons[item.icon]
            if (item.children) {
              finalMenuArray(item.children)
            }

            return item
          }

          return item
        })
      }
      setMenuItems(finalMenuArray(menuArray))
    })*/
  }, [])
  return menuItems
}

export default ServerSideNavItems
