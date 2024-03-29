# Google Cloud Storage File

[Google Cloud Storage](https://en.wikipedia.org/wiki/Google_Cloud_Storage) is a managed service for storing unstructured data.

This covers how to load document objects from an `Google Cloud Storage (GCS) file object (blob)`.

```python
# !pip install google-cloud-storage  

```

```python
from langchain.document\_loaders import GCSFileLoader  

```

```python
loader = GCSFileLoader(project\_name="aist", bucket="testing-hwc", blob="fake.docx")  

```

```python
loader.load()  

```

```text
 /Users/harrisonchase/workplace/langchain/.venv/lib/python3.10/site-packages/google/auth/\_default.py:83: UserWarning: Your application has authenticated using end user credentials from Google Cloud SDK without a quota project. You might receive a "quota exceeded" or "API not enabled" error. We recommend you rerun `gcloud auth application-default login` and make sure a quota project is added. Or you can use service accounts instead. For more information about service accounts, see https://cloud.google.com/docs/authentication/  
 warnings.warn(\_CLOUD\_SDK\_CREDENTIALS\_WARNING)  
  
  
  
  
  
 [Document(page\_content='Lorem ipsum dolor sit amet.', lookup\_str='', metadata={'source': '/var/folders/y6/8\_bzdg295ld6s1\_97\_12m4lr0000gn/T/tmp3srlf8n8/fake.docx'}, lookup\_index=0)]  

```

If you want to use an alternative loader, you can provide a custom function, for example:

```python
from langchain.document\_loaders import PyPDFLoader  
def load\_pdf(file\_path):  
 return PyPDFLoader(file\_path)  
  
loader = GCSFileLoader(project\_name="aist", bucket="testing-hwc", blob="fake.pdf", loader\_func=load\_pdf)  

```
