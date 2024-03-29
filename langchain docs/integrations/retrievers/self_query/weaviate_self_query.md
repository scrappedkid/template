# Weaviate

[Weaviate](https://weaviate.io/) is an open-source vector database. It allows you to store data objects and vector embeddings from
your favorite ML models, and scale seamlessly into billions of data objects.

In the notebook, we'll demo the `SelfQueryRetriever` wrapped around a `Weaviate` vector store.

## Creating a Weaviate vector store[​](#creating-a-weaviate-vector-store "Direct link to Creating a Weaviate vector store")

First we'll want to create a Weaviate vector store and seed it with some data. We've created a small demo set of documents that contain summaries of movies.

**Note:** The self-query retriever requires you to have `lark` installed (`pip install lark`). We also need the `weaviate-client` package.

```python
#!pip install lark weaviate-client  

```

```python
from langchain.schema import Document  
from langchain.embeddings.openai import OpenAIEmbeddings  
from langchain.vectorstores import Weaviate  
import os  
  
embeddings = OpenAIEmbeddings()  

```

```python
docs = [  
 Document(  
 page\_content="A bunch of scientists bring back dinosaurs and mayhem breaks loose",  
 metadata={"year": 1993, "rating": 7.7, "genre": "science fiction"},  
 ),  
 Document(  
 page\_content="Leo DiCaprio gets lost in a dream within a dream within a dream within a ...",  
 metadata={"year": 2010, "director": "Christopher Nolan", "rating": 8.2},  
 ),  
 Document(  
 page\_content="A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea",  
 metadata={"year": 2006, "director": "Satoshi Kon", "rating": 8.6},  
 ),  
 Document(  
 page\_content="A bunch of normal-sized women are supremely wholesome and some men pine after them",  
 metadata={"year": 2019, "director": "Greta Gerwig", "rating": 8.3},  
 ),  
 Document(  
 page\_content="Toys come alive and have a blast doing so",  
 metadata={"year": 1995, "genre": "animated"},  
 ),  
 Document(  
 page\_content="Three men walk into the Zone, three men walk out of the Zone",  
 metadata={  
 "year": 1979,  
 "rating": 9.9,  
 "director": "Andrei Tarkovsky",  
 "genre": "science fiction",  
 "rating": 9.9,  
 },  
 ),  
]  
vectorstore = Weaviate.from\_documents(  
 docs, embeddings, weaviate\_url="http://127.0.0.1:8080"  
)  

```

## Creating our self-querying retriever[​](#creating-our-self-querying-retriever "Direct link to Creating our self-querying retriever")

Now we can instantiate our retriever. To do this we'll need to provide some information upfront about the metadata fields that our documents support and a short description of the document contents.

```python
from langchain.llms import OpenAI  
from langchain.retrievers.self\_query.base import SelfQueryRetriever  
from langchain.chains.query\_constructor.base import AttributeInfo  
  
metadata\_field\_info = [  
 AttributeInfo(  
 name="genre",  
 description="The genre of the movie",  
 type="string or list[string]",  
 ),  
 AttributeInfo(  
 name="year",  
 description="The year the movie was released",  
 type="integer",  
 ),  
 AttributeInfo(  
 name="director",  
 description="The name of the movie director",  
 type="string",  
 ),  
 AttributeInfo(  
 name="rating", description="A 1-10 rating for the movie", type="float"  
 ),  
]  
document\_content\_description = "Brief summary of a movie"  
llm = OpenAI(temperature=0)  
retriever = SelfQueryRetriever.from\_llm(  
 llm, vectorstore, document\_content\_description, metadata\_field\_info, verbose=True  
)  

```

## Testing it out[​](#testing-it-out "Direct link to Testing it out")

And now we can try actually using our retriever!

```python
# This example only specifies a relevant query  
retriever.get\_relevant\_documents("What are some movies about dinosaurs")  

```

```text
 query='dinosaur' filter=None limit=None  
  
  
  
  
  
 [Document(page\_content='A bunch of scientists bring back dinosaurs and mayhem breaks loose', metadata={'genre': 'science fiction', 'rating': 7.7, 'year': 1993}),  
 Document(page\_content='Toys come alive and have a blast doing so', metadata={'genre': 'animated', 'rating': None, 'year': 1995}),  
 Document(page\_content='Three men walk into the Zone, three men walk out of the Zone', metadata={'genre': 'science fiction', 'rating': 9.9, 'year': 1979}),  
 Document(page\_content='A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea', metadata={'genre': None, 'rating': 8.6, 'year': 2006})]  

```

```python
# This example specifies a query and a filter  
retriever.get\_relevant\_documents("Has Greta Gerwig directed any movies about women")  

```

```text
 query='women' filter=Comparison(comparator=<Comparator.EQ: 'eq'>, attribute='director', value='Greta Gerwig') limit=None  
  
  
  
  
  
 [Document(page\_content='A bunch of normal-sized women are supremely wholesome and some men pine after them', metadata={'genre': None, 'rating': 8.3, 'year': 2019})]  

```

## Filter k[​](#filter-k "Direct link to Filter k")

We can also use the self query retriever to specify `k`: the number of documents to fetch.

We can do this by passing `enable_limit=True` to the constructor.

```python
retriever = SelfQueryRetriever.from\_llm(  
 llm,  
 vectorstore,  
 document\_content\_description,  
 metadata\_field\_info,  
 enable\_limit=True,  
 verbose=True,  
)  

```

```python
# This example only specifies a relevant query  
retriever.get\_relevant\_documents("what are two movies about dinosaurs")  

```

```text
 query='dinosaur' filter=None limit=2  
  
  
  
  
  
 [Document(page\_content='A bunch of scientists bring back dinosaurs and mayhem breaks loose', metadata={'genre': 'science fiction', 'rating': 7.7, 'year': 1993}),  
 Document(page\_content='Toys come alive and have a blast doing so', metadata={'genre': 'animated', 'rating': None, 'year': 1995})]  

```

- [Creating a Weaviate vector store](#creating-a-weaviate-vector-store)
- [Creating our self-querying retriever](#creating-our-self-querying-retriever)
- [Testing it out](#testing-it-out)
- [Filter k](#filter-k)
