# Metal

[Metal](https://github.com/getmetal/metal-python) is a managed service for ML Embeddings.

This notebook shows how to use [Metal's](https://docs.getmetal.io/introduction) retriever.

First, you will need to sign up for Metal and get an API key. You can do so [here](https://docs.getmetal.io/misc-create-app)

```python
# !pip install metal\_sdk  

```

```python
from metal\_sdk.metal import Metal  
  
API\_KEY = ""  
CLIENT\_ID = ""  
INDEX\_ID = ""  
  
metal = Metal(API\_KEY, CLIENT\_ID, INDEX\_ID);  

```

## Ingest Documents[​](#ingest-documents "Direct link to Ingest Documents")

You only need to do this if you haven't already set up an index

```python
metal.index({"text": "foo1"})  
metal.index({"text": "foo"})  

```

```text
 {'data': {'id': '642739aa7559b026b4430e42',  
 'text': 'foo',  
 'createdAt': '2023-03-31T19:51:06.748Z'}}  

```

## Query[​](#query "Direct link to Query")

Now that our index is set up, we can set up a retriever and start querying it.

```python
from langchain.retrievers import MetalRetriever  

```

```python
retriever = MetalRetriever(metal, params={"limit": 2})  

```

```python
retriever.get\_relevant\_documents("foo1")  

```

```text
 [Document(page\_content='foo1', metadata={'dist': '1.19209289551e-07', 'id': '642739a17559b026b4430e40', 'createdAt': '2023-03-31T19:50:57.853Z'}),  
 Document(page\_content='foo1', metadata={'dist': '4.05311584473e-06', 'id': '642738f67559b026b4430e3c', 'createdAt': '2023-03-31T19:48:06.769Z'})]  

```

- [Ingest Documents](#ingest-documents)
- [Query](#query)
