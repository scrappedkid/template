## $\Huge Readme.$
These are not in use yet. they are collected bits to be integrated.
i don't know much about anything still, but i do know that i'm going to be making thi semi-modular and there will be drop in components depending on configuration choices. and i'll have a custom middleware interpreter for the API internally. so that it will be receptive to native installs of other code supports with Shims. this way, ANY front end messenger should be able to connect to the universal api, and  then ANY back end should be able to be connected to through middleware for that service.
>_____
> ###  <center> like this for example...
>  | Interal middleware  | API               | APP            |
>  |---                  |------             |---             |
>  | twitter             |                   | Basic GUI      |
>  | facebook            |Unifying cutom API | Feature set 1  |
>  | signal              |                   | Feature set 2  |

> if done right... any combination should be possible, and people will be able to write their own blocks  for either  a front end  module or a back end module..  with the frameworks being agnostic, any front end component will be able to connect through the API middle indterface.... so you could have a material ui component for chat, a semantic-ui, a primeNG, a custom front end written in storybook as long as it's stateless and has the connection points in and out, they can get wrapped by a component that holds them in their own State  (the api connect wrapper) which will connect using sockets to a local realtime mini DB to sync and persist when offline, and have a seperated encrypted fairly flat database structure for speed that can persist your history as well, with user-clearable settings... i'm going to start with a couple messaging clients  first before moving on to e-mail...
> ### -Kai Gouthro  2018-12-10
> ___
