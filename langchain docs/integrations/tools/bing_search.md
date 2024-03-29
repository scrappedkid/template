# Bing Search

This notebook goes over how to use the bing search component.

First, you need to set up the proper API keys and environment variables. To set it up, follow the instructions found [here](https://levelup.gitconnected.com/api-tutorial-how-to-use-bing-web-search-api-in-python-4165d5592a7e).

Then we will need to set some environment variables.

```python
import os  
  
os.environ["BING\_SUBSCRIPTION\_KEY"] = "<key>"  
os.environ["BING\_SEARCH\_URL"] = "https://api.bing.microsoft.com/v7.0/search"  

```

```python
from langchain.utilities import BingSearchAPIWrapper  

```

```python
search = BingSearchAPIWrapper()  

```

```python
search.run("python")  

```

```text
 'Thanks to the flexibility of <b>Python</b> and the powerful ecosystem of packages, the Azure CLI supports features such as autocompletion (in shells that support it), persistent credentials, JMESPath result parsing, lazy initialization, network-less unit tests, and more. Building an open-source and cross-platform Azure CLI with <b>Python</b> by Dan Taylor. <b>Python</b> releases by version number: Release version Release date Click for more. <b>Python</b> 3.11.1 Dec. 6, 2022 Download Release Notes. <b>Python</b> 3.10.9 Dec. 6, 2022 Download Release Notes. <b>Python</b> 3.9.16 Dec. 6, 2022 Download Release Notes. <b>Python</b> 3.8.16 Dec. 6, 2022 Download Release Notes. <b>Python</b> 3.7.16 Dec. 6, 2022 Download Release Notes. In this lesson, we will look at the += operator in <b>Python</b> and see how it works with several simple examples.. The operator ‘+=’ is a shorthand for the addition assignment operator.It adds two values and assigns the sum to a variable (left operand). W3Schools offers free online tutorials, references and exercises in all the major languages of the web. Covering popular subjects like HTML, CSS, JavaScript, <b>Python</b>, SQL, Java, and many, many more. This tutorial introduces the reader informally to the basic concepts and features of the <b>Python</b> language and system. It helps to have a <b>Python</b> interpreter handy for hands-on experience, but all examples are self-contained, so the tutorial can be read off-line as well. For a description of standard objects and modules, see The <b>Python</b> Standard ... <b>Python</b> is a general-purpose, versatile, and powerful programming language. It&#39;s a great first language because <b>Python</b> code is concise and easy to read. Whatever you want to do, <b>python</b> can do it. From web development to machine learning to data science, <b>Python</b> is the language for you. To install <b>Python</b> using the Microsoft Store: Go to your Start menu (lower left Windows icon), type &quot;Microsoft Store&quot;, select the link to open the store. Once the store is open, select Search from the upper-right menu and enter &quot;<b>Python</b>&quot;. Select which version of <b>Python</b> you would like to use from the results under Apps. Under the “<b>Python</b> Releases for Mac OS X” heading, click the link for the Latest <b>Python</b> 3 Release - <b>Python</b> 3.x.x. As of this writing, the latest version was <b>Python</b> 3.8.4. Scroll to the bottom and click macOS 64-bit installer to start the download. When the installer is finished downloading, move on to the next step. Step 2: Run the Installer'  

```

## Number of results[​](#number-of-results "Direct link to Number of results")

You can use the `k` parameter to set the number of results

```python
search = BingSearchAPIWrapper(k=1)  

```

```python
search.run("python")  

```

```text
 'Thanks to the flexibility of <b>Python</b> and the powerful ecosystem of packages, the Azure CLI supports features such as autocompletion (in shells that support it), persistent credentials, JMESPath result parsing, lazy initialization, network-less unit tests, and more. Building an open-source and cross-platform Azure CLI with <b>Python</b> by Dan Taylor.'  

```

## Metadata Results[​](#metadata-results "Direct link to Metadata Results")

Run query through BingSearch and return snippet, title, and link metadata.

- Snippet: The description of the result.
- Title: The title of the result.
- Link: The link to the result.

```python
search = BingSearchAPIWrapper()  

```

```python
search.results("apples", 5)  

```

```text
 [{'snippet': 'Lady Alice. Pink Lady <b>apples</b> aren’t the only lady in the apple family. Lady Alice <b>apples</b> were discovered growing, thanks to bees pollinating, in Washington. They are smaller and slightly more stout in appearance than other varieties. Their skin color appears to have red and yellow stripes running from stem to butt.',  
 'title': '25 Types of Apples - Jessica Gavin',  
 'link': 'https://www.jessicagavin.com/types-of-apples/'},  
 {'snippet': '<b>Apples</b> can do a lot for you, thanks to plant chemicals called flavonoids. And they have pectin, a fiber that breaks down in your gut. If you take off the apple’s skin before eating it, you won ...',  
 'title': 'Apples: Nutrition &amp; Health Benefits - WebMD',  
 'link': 'https://www.webmd.com/food-recipes/benefits-apples'},  
 {'snippet': '<b>Apples</b> boast many vitamins and minerals, though not in high amounts. However, <b>apples</b> are usually a good source of vitamin C. Vitamin C. Also called ascorbic acid, this vitamin is a common ...',  
 'title': 'Apples 101: Nutrition Facts and Health Benefits',  
 'link': 'https://www.healthline.com/nutrition/foods/apples'},  
 {'snippet': 'Weight management. The fibers in <b>apples</b> can slow digestion, helping one to feel greater satisfaction after eating. After following three large prospective cohorts of 133,468 men and women for 24 years, researchers found that higher intakes of fiber-rich fruits with a low glycemic load, particularly <b>apples</b> and pears, were associated with the least amount of weight gain over time.',  
 'title': 'Apples | The Nutrition Source | Harvard T.H. Chan School of Public Health',  
 'link': 'https://www.hsph.harvard.edu/nutritionsource/food-features/apples/'}]  

```

- [Number of results](#number-of-results)
- [Metadata Results](#metadata-results)
