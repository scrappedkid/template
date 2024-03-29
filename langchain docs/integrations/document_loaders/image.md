# Images

This covers how to load images such as `JPG` or `PNG` into a document format that we can use downstream.

## Using Unstructured[​](#using-unstructured "Direct link to Using Unstructured")

```python
#!pip install pdfminer  

```

```python
from langchain.document\_loaders.image import UnstructuredImageLoader  

```

```python
loader = UnstructuredImageLoader("layout-parser-paper-fast.jpg")  

```

```python
data = loader.load()  

```

```python
data[0]  

```

```text
 Document(page\_content="LayoutParser: A Unified Toolkit for Deep\nLearning Based Document Image Analysis\n\n\n‘Zxjiang Shen' (F3}, Ruochen Zhang”, Melissa Dell\*, Benjamin Charles Germain\nLeet, Jacob Carlson, and Weining LiF\n\n\nsugehen\n\nshangthrows, et\n\n“Abstract. Recent advanocs in document image analysis (DIA) have been\n‘pimarliy driven bythe application of neural networks dell roar\n{uteomer could be aly deployed in production and extended fo farther\n[nvetigtion. However, various factory ke lcely organize codebanee\nsnd sophisticated modal cnigurations compat the ey ree of\n‘erin! innovation by wide sence, Though there have been sng\n‘Hors to improve reuablty and simplify deep lees (DL) mode\n‘aon, sone of them ae optimized for challenge inthe demain of DIA,\nThis roprscte a major gap in the extng fol, sw DIA i eal to\nscademic research acon wie range of dpi in the social ssencee\n[rary for streamlining the sage of DL in DIA research and appicn\n‘tons The core LayoutFaraer brary comes with a sch of simple and\nIntative interfaee or applying and eutomiing DI. odel fr Inyo de\npltfom for sharing both protrined modes an fal document dist\n{ation pipeline We demonutate that LayootPareer shea fr both\nlightweight and lrgeseledgtieation pipelines in eal-word uae ces\nThe leary pblely smal at Btspe://layost-pareergsthab So\n\n\n\n‘Keywords: Document Image Analysis» Deep Learning Layout Analysis\n‘Character Renguition - Open Serres dary « Tol\n\n\nIntroduction\n\n\n‘Deep Learning(DL)-based approaches are the state-of-the-art for a wide range of\ndoctiment image analysis (DIA) tea including document image clasiffeation [I]\n", lookup\_str='', metadata={'source': 'layout-parser-paper-fast.jpg'}, lookup\_index=0)  

```

### Retain Elements[​](#retain-elements "Direct link to Retain Elements")

Under the hood, Unstructured creates different "elements" for different chunks of text. By default we combine those together, but you can easily keep that separation by specifying `mode="elements"`.

```python
loader = UnstructuredImageLoader("layout-parser-paper-fast.jpg", mode="elements")  

```

```python
data = loader.load()  

```

```python
data[0]  

```

```text
 Document(page\_content='LayoutParser: A Unified Toolkit for Deep\nLearning Based Document Image Analysis\n', lookup\_str='', metadata={'source': 'layout-parser-paper-fast.jpg', 'filename': 'layout-parser-paper-fast.jpg', 'page\_number': 1, 'category': 'Title'}, lookup\_index=0)  

```

- [Using Unstructured](#using-unstructured)

  - [Retain Elements](#retain-elements)

- [Retain Elements](#retain-elements)
