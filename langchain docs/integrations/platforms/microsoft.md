# Microsoft

All functionality related to `Microsoft Azure` and other `Microsoft` products.

## LLM[​](#llm "Direct link to LLM")

### Azure OpenAI[​](#azure-openai "Direct link to Azure OpenAI")

[Microsoft Azure](https://en.wikipedia.org/wiki/Microsoft_Azure), often referred to as `Azure` is a cloud computing platform run by `Microsoft`, which offers access, management, and development of applications and services through global data centers. It provides a range of capabilities, including software as a service (SaaS), platform as a service (PaaS), and infrastructure as a service (IaaS). `Microsoft Azure` supports many programming languages, tools, and frameworks, including Microsoft-specific and third-party software and systems.

[Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/) is an `Azure` service with powerful language models from `OpenAI` including the `GPT-3`, `Codex` and `Embeddings model` series for content generation, summarization, semantic search, and natural language to code translation.

```bash
pip install openai tiktoken  

```

Set the environment variables to get access to the `Azure OpenAI` service.

```python
import os  
  
os.environ["OPENAI\_API\_TYPE"] = "azure"  
os.environ["OPENAI\_API\_BASE"] = "https://<your-endpoint.openai.azure.com/"  
os.environ["OPENAI\_API\_KEY"] = "your AzureOpenAI key"  
os.environ["OPENAI\_API\_VERSION"] = "2023-05-15"  

```

See a [usage example](/docs/integrations/llms/azure_openai_example).

```python
from langchain.llms import AzureOpenAI  

```

## Text Embedding Models[​](#text-embedding-models "Direct link to Text Embedding Models")

### Azure OpenAI[​](#azure-openai-1 "Direct link to Azure OpenAI")

See a [usage example](/docs/integrations/text_embedding/azureopenai)

```python
from langchain.embeddings import OpenAIEmbeddings  

```

## Chat Models[​](#chat-models "Direct link to Chat Models")

### Azure OpenAI[​](#azure-openai-2 "Direct link to Azure OpenAI")

See a [usage example](/docs/integrations/chat/azure_chat_openai)

```python
from langchain.chat\_models import AzureChatOpenAI  

```

## Document loaders[​](#document-loaders "Direct link to Document loaders")

### Azure Blob Storage[​](#azure-blob-storage "Direct link to Azure Blob Storage")

[Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction) is Microsoft's object storage solution for the cloud. Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data.

[Azure Files](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-introduction) offers fully managed
file shares in the cloud that are accessible via the industry standard Server Message Block (`SMB`) protocol,
Network File System (`NFS`) protocol, and `Azure Files REST API`. `Azure Files` are based on the `Azure Blob Storage`.

`Azure Blob Storage` is designed for:

- Serving images or documents directly to a browser.
- Storing files for distributed access.
- Streaming video and audio.
- Writing to log files.
- Storing data for backup and restore, disaster recovery, and archiving.
- Storing data for analysis by an on-premises or Azure-hosted service.

```bash
pip install azure-storage-blob  

```

See a [usage example for the Azure Blob Storage](/docs/integrations/document_loaders/azure_blob_storage_container.html).

```python
from langchain.document\_loaders import AzureBlobStorageContainerLoader  

```

See a [usage example for the Azure Files](/docs/integrations/document_loaders/azure_blob_storage_file.html).

```python
from langchain.document\_loaders import AzureBlobStorageFileLoader  

```

### Microsoft OneDrive[​](#microsoft-onedrive "Direct link to Microsoft OneDrive")

[Microsoft OneDrive](https://en.wikipedia.org/wiki/OneDrive) (formerly `SkyDrive`) is a file-hosting service operated by Microsoft.

First, you need to install a python package.

```bash
pip install o365  

```

See a [usage example](/docs/integrations/document_loaders/microsoft_onedrive).

```python
from langchain.document\_loaders import OneDriveLoader  

```

### Microsoft Word[​](#microsoft-word "Direct link to Microsoft Word")

[Microsoft Word](https://www.microsoft.com/en-us/microsoft-365/word) is a word processor developed by Microsoft.

See a [usage example](/docs/integrations/document_loaders/microsoft_word).

```python
from langchain.document\_loaders import UnstructuredWordDocumentLoader  

```

## Vector stores[​](#vector-stores "Direct link to Vector stores")

### Azure Cosmos DB[​](#azure-cosmos-db "Direct link to Azure Cosmos DB")

[Azure Cosmos DB for MongoDB vCore](https://learn.microsoft.com/en-us/azure/cosmos-db/mongodb/vcore/) makes it easy to create a database with full native MongoDB support.
You can apply your MongoDB experience and continue to use your favorite MongoDB drivers, SDKs, and tools by pointing your application to the API for MongoDB vCore account's connection string.
Use vector search in Azure Cosmos DB for MongoDB vCore to seamlessly integrate your AI-based applications with your data that's stored in Azure Cosmos DB.

#### Installation and Setup[​](#installation-and-setup "Direct link to Installation and Setup")

See [detail configuration instructions](/docs/integrations/vectorstores/azure_cosmos_db).

We need to install `pymongo` python package.

```bash
pip install pymongo  

```

#### Deploy Azure Cosmos DB on Microsoft Azure[​](#deploy-azure-cosmos-db-on-microsoft-azure "Direct link to Deploy Azure Cosmos DB on Microsoft Azure")

Azure Cosmos DB for MongoDB vCore provides developers with a fully managed MongoDB-compatible database service for building modern applications with a familiar architecture.

With Cosmos DB for MongoDB vCore, developers can enjoy the benefits of native Azure integrations, low total cost of ownership (TCO), and the familiar vCore architecture when migrating existing applications or building new ones.

[Sign Up](https://azure.microsoft.com/en-us/free/) for free to get started today.

See a [usage example](/docs/integrations/vectorstores/azure_cosmos_db).

```python
from langchain.vectorstores import AzureCosmosDBVectorSearch  

```

## Retrievers[​](#retrievers "Direct link to Retrievers")

### Azure Cognitive Search[​](#azure-cognitive-search "Direct link to Azure Cognitive Search")

[Azure Cognitive Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) (formerly known as `Azure Search`) is a cloud search service that gives developers infrastructure, APIs, and tools for building a rich search experience over private, heterogeneous content in web, mobile, and enterprise applications.

Search is foundational to any app that surfaces text to users, where common scenarios include catalog or document search, online retail apps, or data exploration over proprietary content. When you create a search service, you'll work with the following capabilities:

- A search engine for full text search over a search index containing user-owned content
- Rich indexing, with lexical analysis and optional AI enrichment for content extraction and transformation
- Rich query syntax for text search, fuzzy search, autocomplete, geo-search and more
- Programmability through REST APIs and client libraries in Azure SDKs
- Azure integration at the data layer, machine learning layer, and AI (Cognitive Services)

See [set up instructions](https://learn.microsoft.com/en-us/azure/search/search-create-service-portal).

See a [usage example](/docs/integrations/retrievers/azure_cognitive_search).

```python
from langchain.retrievers import AzureCognitiveSearchRetriever  

```

## Utilities[​](#utilities "Direct link to Utilities")

### Bing Search API[​](#bing-search-api "Direct link to Bing Search API")

See a [usage example](/docs/integrations/tools/bing_search).

```python
from langchain.utilities import BingSearchAPIWrapper  

```

## Toolkits[​](#toolkits "Direct link to Toolkits")

### Azure Cognitive Services[​](#azure-cognitive-services "Direct link to Azure Cognitive Services")

We need to install several python packages.

```bash
pip install azure-ai-formrecognizer azure-cognitiveservices-speech azure-ai-vision  

```

See a [usage example](/docs/integrations/toolkits/azure_cognitive_services).

```python
from langchain.agents.agent\_toolkits import O365Toolkit  

```

### Microsoft Office 365 email and calendar[​](#microsoft-office-365-email-and-calendar "Direct link to Microsoft Office 365 email and calendar")

We need to install `O365` python package.

```bash
pip install O365  

```

See a [usage example](/docs/integrations/toolkits/office365).

```python
from langchain.agents.agent\_toolkits import O365Toolkit  

```

### Microsoft Azure PowerBI[​](#microsoft-azure-powerbi "Direct link to Microsoft Azure PowerBI")

We need to install `azure-identity` python package.

```bash
pip install azure-identity  

```

See a [usage example](/docs/integrations/toolkits/powerbi).

```python
from langchain.agents.agent\_toolkits import PowerBIToolkit  
from langchain.utilities.powerbi import PowerBIDataset  

```

- [LLM](#llm)

  - [Azure OpenAI](#azure-openai)

- [Text Embedding Models](#text-embedding-models)

  - [Azure OpenAI](#azure-openai-1)

- [Chat Models](#chat-models)

  - [Azure OpenAI](#azure-openai-2)

- [Document loaders](#document-loaders)

  - [Azure Blob Storage](#azure-blob-storage)
  - [Microsoft OneDrive](#microsoft-onedrive)
  - [Microsoft Word](#microsoft-word)

- [Vector stores](#vector-stores)

  - [Azure Cosmos DB](#azure-cosmos-db)

- [Retrievers](#retrievers)

  - [Azure Cognitive Search](#azure-cognitive-search)

- [Utilities](#utilities)

  - [Bing Search API](#bing-search-api)

- [Toolkits](#toolkits)

  - [Azure Cognitive Services](#azure-cognitive-services)
  - [Microsoft Office 365 email and calendar](#microsoft-office-365-email-and-calendar)
  - [Microsoft Azure PowerBI](#microsoft-azure-powerbi)

- [Azure OpenAI](#azure-openai)

- [Azure OpenAI](#azure-openai-1)

- [Azure OpenAI](#azure-openai-2)

- [Azure Blob Storage](#azure-blob-storage)

- [Microsoft OneDrive](#microsoft-onedrive)

- [Microsoft Word](#microsoft-word)

- [Azure Cosmos DB](#azure-cosmos-db)

- [Azure Cognitive Search](#azure-cognitive-search)

- [Bing Search API](#bing-search-api)

- [Azure Cognitive Services](#azure-cognitive-services)

- [Microsoft Office 365 email and calendar](#microsoft-office-365-email-and-calendar)

- [Microsoft Azure PowerBI](#microsoft-azure-powerbi)
