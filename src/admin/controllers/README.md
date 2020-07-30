# Controllers
> Main component variable names for site functions, actions, classes, and CORE modules  to be included with a PAAS offering in the future.

## Actions

## Config
  * Sitewide Master Static Config files
  * For now, pull from files, Later, will bepart of installation instruction set which takess the whole base configuration set and transfers it to firebase with an install script similar to wordpress, first page entering the database loctions and login, and the second page copying all the config information from JSON to the database, so that in the admin settings, a page for site-settings will beable to reconfigure certain options as required.

## Constants

  * Will contain Site Wide constants, same thing applies as above
  * Constants are to be seperated into folders based on certain Master properties, ie:  each module TYPEshould have a constants list, as well as a constants list for naming the TOOLS in the tools root folder to become simple Variables that can be called upon. or UTILS.   any MAJOR category of SITE WIDE constants can go here, LOCATEINFOLDER should be a master index.js at the root, with the constants defined for the root folders of major classes of items, such as "PAGES" or "MODUULES".. the constants folder will act asx a directory of the folder structure, in a way that when an item is called upon by a module and it normally goes to a particular directory or it grabs a module and requires a list of titles to populate the items in a module,"SEND" or "LOGINACTION" etc... it will pull the list of constants from the folder for that type of module. this ensures that EVERY module of a type, ie: messsengers, will use an identical list of names for it's functions across all service providers..  This behaves as the Master list of names for functions for the internal AP. so ALL MODULES will use ONLY this list for their set of names for objects. and these constants will all point each to their ocrresponding component. Each corresponding component is to be built as an individualfunction which has an export of "internalAPI.functionType.functionName.functionAction"README.md
    * this is important because a Button can be many different things.

      * internalAPI.ACTIONS.EMAIL.openMailClick.view
      * internalAPI.ACTIONS.EMAIL.openMailClick.reply
      * internalAPI.ACTIONS.EMAIL.openMailClick.replyAll
      * internalAPI.ACTIONS.EMAIL.openMailClick.forward
    * which we're going to shorten to single words for the sake of usage inside the modules

    * taking from ACTIONS folder.... this would be a basic example of just those 4 actions.. each of the above would be shortcuts from outside the open e-mail, each on a button next to each other, and they would each call a different iteration of a single "openEmail" function.. Something like This:

      ```js
      export default class openMailClick {

        let viewEmail = (props) => {
        /*--- Unique Code for the Universal "viewEmail" function ---*/
        }

        let replySenderEmail = (props) => {
        /*--- Unique Code for the Universal "replySenderEmail" function ---*/
        }

        let replyAllEmail = (props) => {
        /*--- Unique Code for the Universal "replyAllEmail" function ---*/
        }

        let forwardEmail = (props) => {
        /*--- Unique Code for the Universal "forwardEmail" function ---*/
        }

        let openEmail = (actionType) => {
              return (
        /*      *** put in the code for the action ***
                *** in the space where the button click has to differ for each action ***
                *** you type "actionType" vriable into the code ***
        */      )
             }

        let view = openEmail(viewEmail)
        let reply = openEmail (replySenderEmail)
        let replyAll = openEmail (replyAllEmail)
        let forward = openEmail(forwardEmail)
      }
      ```

    * So, all this above here means.. after another layer of aggregation, in the CONSTANTS folder, we wind up with an index.js Parent file like this

      ```js
      import * as emailActions from "@constants/modules/email/index.js"
      import * as messageActions from "@constants/modules/messages/index.js"
      import * as chartActions from "@constants/modules/charts/index.js"

      /*---      ... etc  one for each actions set  ---*/

      export default class ACTIONS {
      let EMAIL = emailActions
      let MESSAGE = messageactions
      let CHART = chartActions
      /*---  etc... ---*/

      }
      ```

## Middleware

/* !TODO
