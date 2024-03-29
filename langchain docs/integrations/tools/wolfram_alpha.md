# Wolfram Alpha

This notebook goes over how to use the wolfram alpha component.

First, you need to set up your Wolfram Alpha developer account and get your APP ID:

1. Go to wolfram alpha and sign up for a developer account [here](https://developer.wolframalpha.com/)
1. Create an app and get your APP ID
1. pip install wolframalpha

Then we will need to set some environment variables:

1. Save your APP ID into WOLFRAM_ALPHA_APPID env variable

```python
pip install wolframalpha  

```

```python
import os  
  
os.environ["WOLFRAM\_ALPHA\_APPID"] = ""  

```

```python
from langchain.utilities.wolfram\_alpha import WolframAlphaAPIWrapper  

```

```python
wolfram = WolframAlphaAPIWrapper()  

```

```python
wolfram.run("What is 2x+5 = -3x + 7?")  

```

```text
 'x = 2/5'  

```
