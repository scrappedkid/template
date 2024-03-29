# DuckDuckGo Search

This notebook goes over how to use the duck-duck-go search component.

```python
# !pip install duckduckgo-search  

```

```python
from langchain.tools import DuckDuckGoSearchRun  

```

```python
search = DuckDuckGoSearchRun()  

```

```python
search.run("Obama's first name?")  

```

```text
 'August 4, 1961 (age 61) Honolulu Hawaii Title / Office: presidency of the United States of America (2009-2017), United States United States Senate (2005-2008), United States ... (Show more) Political Affiliation: Democratic Party Awards And Honors: Barack Hussein Obama II (/ b ə ˈ r ɑː k h uː ˈ s eɪ n oʊ ˈ b ɑː m ə / bə-RAHK hoo-SAYN oh-BAH-mə; born August 4, 1961) is an American politician who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, he was the first African-American president of the United States. Obama previously served as a U.S. senator representing Illinois ... Answer (1 of 12): I see others have answered President Obama\'s name which is "Barack Hussein Obama". President Obama has received many comments about his name from the racists across US. It is worth noting that he never changed his name. Also, it is worth noting that a simple search would have re... What is Barack Obama\'s full name? Updated: 11/11/2022 Wiki User ∙ 6y ago Study now See answer (1) Best Answer Copy His full, birth name is Barack Hussein Obama, II. He was named after his... Alex Oliveira July 24, 2023 4:57pm Updated 0 seconds of 43 secondsVolume 0% 00:00 00:43 The man who drowned while paddleboarding on a pond outside the Obamas\' Martha\'s Vineyard estate has been...'  

```

To get more additional information (e.g. link, source) use `DuckDuckGoSearchResults()`

```python
from langchain.tools import DuckDuckGoSearchResults  

```

```python
search = DuckDuckGoSearchResults()  

```

```python
search.run("Obama")  

```

```text
 "[snippet: Barack Hussein Obama II (/ b ə ˈ r ɑː k h uː ˈ s eɪ n oʊ ˈ b ɑː m ə / bə-RAHK hoo-SAYN oh-BAH-mə; born August 4, 1961) is an American politician who served as the 44th president of the United States from 2009 to 2017. A member of the Democratic Party, he was the first African-American president of the United States. Obama previously served as a U.S. senator representing Illinois ..., title: Barack Obama - Wikipedia, link: https://en.wikipedia.org/wiki/Barack\_Obama], [snippet: Barack Obama, in full Barack Hussein Obama II, (born August 4, 1961, Honolulu, Hawaii, U.S.), 44th president of the United States (2009-17) and the first African American to hold the office. Before winning the presidency, Obama represented Illinois in the U.S. Senate (2005-08). He was the third African American to be elected to that body ..., title: Barack Obama | Biography, Parents, Education, Presidency, Books ..., link: https://www.britannica.com/biography/Barack-Obama], [snippet: Barack Obama 's tenure as the 44th president of the United States began with his first inauguration on January 20, 2009, and ended on January 20, 2017. A Democrat from Illinois, Obama took office following a decisive victory over Republican nominee John McCain in the 2008 presidential election. Four years later, in the 2012 presidential ..., title: Presidency of Barack Obama - Wikipedia, link: https://en.wikipedia.org/wiki/Presidency\_of\_Barack\_Obama], [snippet: First published on Mon 24 Jul 2023 20.03 EDT. Barack Obama's personal chef died while paddleboarding near the ex-president's home on Martha's Vineyard over the weekend, Massachusetts state ..., title: Obama's personal chef dies while paddleboarding off Martha's Vineyard ..., link: https://www.theguardian.com/us-news/2023/jul/24/tafari-campbell-barack-obama-chef-drowns-marthas-vineyard]"  

```

You can also just search for news articles. Use the keyword `backend="news"`

```python
search = DuckDuckGoSearchResults(backend="news")  

```

```python
search.run("Obama")  

```

```text
 "[date: 2023-07-26T12:01:22, title: 'My heart is broken': Former Obama White House chef mourned following apparent drowning death in Edgartown, snippet: Tafari Campbell of Dumfries, Va., had been paddle boarding in Edgartown Great Pond when he appeared to briefly struggle, submerged, and did not return to the surface, authorities have said. Crews ultimately found the 45-year-old's body Monday morning., source: The Boston Globe on MSN.com, link: https://www.msn.com/en-us/news/us/my-heart-is-broken-former-obama-white-house-chef-mourned-following-apparent-drowning-death-in-edgartown/ar-AA1elNB8], [date: 2023-07-25T18:44:00, title: Obama's chef drowns paddleboarding near former president's Edgartown vacation home, snippet: Campbell was visiting Martha's Vineyard, where the Obamas own a vacation home. He was not wearing a lifejacket when he fell off his paddleboard., source: YAHOO!News, link: https://news.yahoo.com/obama-chef-drowns-paddleboarding-near-184437491.html], [date: 2023-07-26T00:30:00, title: Obama's personal chef dies while paddleboarding off Martha's Vineyard, snippet: Tafari Campbell, who worked at the White House during Obama's presidency, was visiting the island while the family was away, source: The Guardian, link: https://www.theguardian.com/us-news/2023/jul/24/tafari-campbell-barack-obama-chef-drowns-marthas-vineyard], [date: 2023-07-24T21:54:00, title: Obama's chef ID'd as paddleboarder who drowned near former president's Martha's Vineyard estate, snippet: Former President Barack Obama's personal chef, Tafari Campbell, has been identified as the paddle boarder who drowned near the Obamas' Martha's Vineyard estate., source: Fox News, link: https://www.foxnews.com/politics/obamas-chef-idd-paddleboarder-who-drowned-near-former-presidents-marthas-vineyard-estate]"  

```

You can also directly pass a custom `DuckDuckGoSearchAPIWrapper` to `DuckDuckGoSearchResults`. Therefore, you have much more control over the search results.

```python
from langchain.utilities import DuckDuckGoSearchAPIWrapper  
  
wrapper = DuckDuckGoSearchAPIWrapper(region="de-de", time="d", max\_results=2)  

```

```python
search = DuckDuckGoSearchResults(api\_wrapper=wrapper, backend="news")  

```

```python
search.run("Obama")  

```

```text
 '[date: 2023-07-25T12:15:00, title: Barack + Michelle Obama: Sie trauern um Angestellten, snippet: Barack und Michelle Obama trauern um ihren ehemaligen Küchenchef Tafari Campbell. Der Familienvater verunglückte am vergangenen Sonntag und wurde in einem Teich geborgen., source: Gala, link: https://www.gala.de/stars/news/barack---michelle-obama--sie-trauern-um-angestellten-23871228.html], [date: 2023-07-25T10:30:00, title: Barack Obama: Sein Koch (†45) ist tot - diese Details sind bekannt, snippet: Tafari Campbell war früher im Weißen Haus eingestellt, arbeitete anschließend weiter für Ex-Präsident Barack Obama. Nun ist er gestorben. Diese Details sind bekannt., source: T-Online, link: https://www.t-online.de/unterhaltung/stars/id\_100213226/barack-obama-sein-koch-45-ist-tot-diese-details-sind-bekannt.html], [date: 2023-07-25T05:33:23, title: Barack Obama: Sein Privatkoch ist bei einem tragischen Unfall gestorben, snippet: Barack Obama (61) und Michelle Obama (59) sind in tiefer Trauer. Ihr Privatkoch Tafari Campbell ist am Montag (24. Juli) ums Leben gekommen, er wurde nur 45 Jahre alt. Laut US-Polizei starb er bei ein, source: BUNTE.de, link: https://www.msn.com/de-de/unterhaltung/other/barack-obama-sein-privatkoch-ist-bei-einem-tragischen-unfall-gestorben/ar-AA1ejrAd], [date: 2023-07-25T02:25:00, title: Barack Obama: Privatkoch tot in See gefunden, snippet: Tafari Campbell kochte für Barack Obama im Weißen Haus - und auch privat nach dessen Abschied aus dem Präsidentenamt. Nun machte die Polizei in einem Gewässer eine traurige Entdeckung., source: SPIEGEL, link: https://www.spiegel.de/panorama/justiz/barack-obama-leibkoch-tot-in-see-gefunden-a-3cdf6377-bee0-43f1-a200-a285742f9ffc]'  

```
