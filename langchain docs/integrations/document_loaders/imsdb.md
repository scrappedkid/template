# IMSDb

[IMSDb](https://imsdb.com/) is the `Internet Movie Script Database`.

This covers how to load `IMSDb` webpages into a document format that we can use downstream.

```python
from langchain.document\_loaders import IMSDbLoader  

```

```python
loader = IMSDbLoader("https://imsdb.com/scripts/BlacKkKlansman.html")  

```

```python
data = loader.load()  

```

```python
data[0].page\_content[:500]  

```

```text
 '\n\r\n\r\n\r\n\r\n BLACKKKLANSMAN\r\n \r\n \r\n \r\n \r\n Written by\r\n\r\n Charlie Wachtel & David Rabinowitz\r\n\r\n and\r\n\r\n Kevin Willmott & Spike Lee\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n FADE IN:\r\n \r\n SCENE FROM "GONE WITH'  

```

```python
data[0].metadata  

```

```text
 {'source': 'https://imsdb.com/scripts/BlacKkKlansman.html'}  

```
