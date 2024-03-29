# DocArray HnswSearch

[DocArrayHnswSearch](https://docs.docarray.org/user_guide/storing/index_hnswlib/) is a lightweight Document Index implementation provided by [Docarray](https://github.com/docarray/docarray) that runs fully locally and is best suited for small- to medium-sized datasets. It stores vectors on disk in [hnswlib](https://github.com/nmslib/hnswlib), and stores all other data in [SQLite](https://www.sqlite.org/index.html).

This notebook shows how to use functionality related to the `DocArrayHnswSearch`.

## Setup[​](#setup "Direct link to Setup")

Uncomment the below cells to install docarray and get/set your OpenAI api key if you haven't already done so.

```python
# !pip install "docarray[hnswlib]"  

```

```python
# Get an OpenAI token: https://platform.openai.com/account/api-keys  
  
# import os  
# from getpass import getpass  
  
# OPENAI\_API\_KEY = getpass()  
  
# os.environ["OPENAI\_API\_KEY"] = OPENAI\_API\_KEY  

```

## Using DocArrayHnswSearch[​](#using-docarrayhnswsearch "Direct link to Using DocArrayHnswSearch")

```python
from langchain.embeddings.openai import OpenAIEmbeddings  
from langchain.text\_splitter import CharacterTextSplitter  
from langchain.vectorstores import DocArrayHnswSearch  
from langchain.document\_loaders import TextLoader  

```

```python
documents = TextLoader("../../modules/state\_of\_the\_union.txt").load()  
text\_splitter = CharacterTextSplitter(chunk\_size=1000, chunk\_overlap=0)  
docs = text\_splitter.split\_documents(documents)  
  
embeddings = OpenAIEmbeddings()  
  
db = DocArrayHnswSearch.from\_documents(  
 docs, embeddings, work\_dir="hnswlib\_store/", n\_dim=1536  
)  

```

### Similarity search[​](#similarity-search "Direct link to Similarity search")

```python
query = "What did the president say about Ketanji Brown Jackson"  
docs = db.similarity\_search(query)  

```

```python
print(docs[0].page\_content)  

```

```text
 Tonight. I call on the Senate to: Pass the Freedom to Vote Act. Pass the John Lewis Voting Rights Act. And while you’re at it, pass the Disclose Act so Americans can know who is funding our elections.   
   
 Tonight, I’d like to honor someone who has dedicated his life to serve this country: Justice Stephen Breyer—an Army veteran, Constitutional scholar, and retiring Justice of the United States Supreme Court. Justice Breyer, thank you for your service.   
   
 One of the most serious constitutional responsibilities a President has is nominating someone to serve on the United States Supreme Court.   
   
 And I did that 4 days ago, when I nominated Circuit Court of Appeals Judge Ketanji Brown Jackson. One of our nation’s top legal minds, who will continue Justice Breyer’s legacy of excellence.  

```

### Similarity search with score[​](#similarity-search-with-score "Direct link to Similarity search with score")

The returned distance score is cosine distance. Therefore, a lower score is better.

```python
docs = db.similarity\_search\_with\_score(query)  

```

```python
docs[0]  

```

```text
 (Document(page\_content='Tonight. I call on the Senate to: Pass the Freedom to Vote Act. Pass the John Lewis Voting Rights Act. And while you’re at it, pass the Disclose Act so Americans can know who is funding our elections. \n\nTonight, I’d like to honor someone who has dedicated his life to serve this country: Justice Stephen Breyer—an Army veteran, Constitutional scholar, and retiring Justice of the United States Supreme Court. Justice Breyer, thank you for your service. \n\nOne of the most serious constitutional responsibilities a President has is nominating someone to serve on the United States Supreme Court. \n\nAnd I did that 4 days ago, when I nominated Circuit Court of Appeals Judge Ketanji Brown Jackson. One of our nation’s top legal minds, who will continue Justice Breyer’s legacy of excellence.', metadata={}),  
 0.36962226)  

```

```python
import shutil  
  
# delete the dir  
shutil.rmtree("hnswlib\_store")  

```

- [Setup](#setup)

- [Using DocArrayHnswSearch](#using-docarrayhnswsearch)

  - [Similarity search](#similarity-search)
  - [Similarity search with score](#similarity-search-with-score)

- [Similarity search](#similarity-search)

- [Similarity search with score](#similarity-search-with-score)
