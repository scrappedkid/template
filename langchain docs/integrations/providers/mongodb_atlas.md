# MongoDB Atlas

[MongoDB Atlas](https://www.mongodb.com/docs/atlas/) is a fully-managed cloud
database available in AWS, Azure, and GCP. It now has support for native
Vector Search on the MongoDB document data.

## Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

See [detail configuration instructions](/docs/integrations/vectorstores/mongodb_atlas).

We need to install `pymongo` python package.

```bash
pip install pymongo  

```

## Vector Store[​](#vector-store "Direct link to Vector Store")

See a [usage example](/docs/integrations/vectorstores/mongodb_atlas).

```python
from langchain.vectorstores import MongoDBAtlasVectorSearch  

```

- [Installation and Setup](#installation-and-setup)
- [Vector Store](#vector-store)
