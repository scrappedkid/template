# Notebook

This notebook covers how to load data from an .ipynb notebook into a format suitable by LangChain.

```python
from langchain.document\_loaders import NotebookLoader  

```

```python
loader = NotebookLoader("example\_data/notebook.ipynb")  

```

`NotebookLoader.load()` loads the `.ipynb` notebook file into a `Document` object.

**Parameters**:

- `include_outputs` (bool): whether to include cell outputs in the resulting document (default is False).
- `max_output_length` (int): the maximum number of characters to include from each cell output (default is 10).
- `remove_newline` (bool): whether to remove newline characters from the cell sources and outputs (default is False).
- `traceback` (bool): whether to include full traceback (default is False).

```python
loader.load(include\_outputs=True, max\_output\_length=20, remove\_newline=True)  

```
