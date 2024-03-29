# AnalyticDB

[AnalyticDB for PostgreSQL](https://www.alibabacloud.com/help/en/analyticdb-for-postgresql/latest/product-introduction-overview) is a massively parallel processing (MPP) data warehousing service that is designed to analyze large volumes of data online.

`AnalyticDB for PostgreSQL` is developed based on the open-source `Greenplum Database` project and is enhanced with in-depth extensions by `Alibaba Cloud`. AnalyticDB for PostgreSQL is compatible with the ANSI SQL 2003 syntax and the PostgreSQL and Oracle database ecosystems. AnalyticDB for PostgreSQL also supports row store and column store. AnalyticDB for PostgreSQL processes petabytes of data offline at a high performance level and supports highly concurrent online queries.

This notebook shows how to use functionality related to the `AnalyticDB` vector database.
To run, you should have an [AnalyticDB](https://www.alibabacloud.com/help/en/analyticdb-for-postgresql/latest/product-introduction-overview) instance up and running:

- Using [AnalyticDB Cloud Vector Database](https://www.alibabacloud.com/product/hybriddb-postgresql). Click here to fast deploy it.

```python
from langchain.embeddings.openai import OpenAIEmbeddings  
from langchain.text\_splitter import CharacterTextSplitter  
from langchain.vectorstores import AnalyticDB  

```

Split documents and get embeddings by call OpenAI API

```python
from langchain.document\_loaders import TextLoader  
  
loader = TextLoader("../../modules/state\_of\_the\_union.txt")  
documents = loader.load()  
text\_splitter = CharacterTextSplitter(chunk\_size=1000, chunk\_overlap=0)  
docs = text\_splitter.split\_documents(documents)  
  
embeddings = OpenAIEmbeddings()  

```

Connect to AnalyticDB by setting related ENVIRONMENTS.

```text
export PG\_HOST={your\_analyticdb\_hostname}  
export PG\_PORT={your\_analyticdb\_port} # Optional, default is 5432  
export PG\_DATABASE={your\_database} # Optional, default is postgres  
export PG\_USER={database\_username}  
export PG\_PASSWORD={database\_password}  

```

Then store your embeddings and documents into AnalyticDB

```python
import os  
  
connection\_string = AnalyticDB.connection\_string\_from\_db\_params(  
 driver=os.environ.get("PG\_DRIVER", "psycopg2cffi"),  
 host=os.environ.get("PG\_HOST", "localhost"),  
 port=int(os.environ.get("PG\_PORT", "5432")),  
 database=os.environ.get("PG\_DATABASE", "postgres"),  
 user=os.environ.get("PG\_USER", "postgres"),  
 password=os.environ.get("PG\_PASSWORD", "postgres"),  
)  
  
vector\_db = AnalyticDB.from\_documents(  
 docs,  
 embeddings,  
 connection\_string=connection\_string,  
)  

```

Query and retrieve data

```python
query = "What did the president say about Ketanji Brown Jackson"  
docs = vector\_db.similarity\_search(query)  

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
