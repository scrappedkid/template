# Custom example selector

In this tutorial, we'll create a custom example selector that selects examples randomly from a given list of examples.

An `ExampleSelector` must implement two methods:

1. An `add_example` method which takes in an example and adds it into the ExampleSelector
1. A `select_examples` method which takes in input variables (which are meant to be user input) and returns a list of examples to use in the few-shot prompt.

Let's implement a custom `ExampleSelector` that just selects two examples at random.

**Note:**
Take a look at the current set of example selector implementations supported in LangChain [here](/docs/modules/model_io/prompts/example_selectors/).

## Implement custom example selector[​](#implement-custom-example-selector "Direct link to Implement custom example selector")

```python
from langchain.prompts.example\_selector.base import BaseExampleSelector  
from typing import Dict, List  
import numpy as np  
  
  
class CustomExampleSelector(BaseExampleSelector):  
   
 def \_\_init\_\_(self, examples: List[Dict[str, str]]):  
 self.examples = examples  
   
 def add\_example(self, example: Dict[str, str]) -> None:  
 """Add new example to store for a key."""  
 self.examples.append(example)  
  
 def select\_examples(self, input\_variables: Dict[str, str]) -> List[dict]:  
 """Select which examples to use based on the inputs."""  
 return np.random.choice(self.examples, size=2, replace=False)  
  

```

## Use custom example selector[​](#use-custom-example-selector "Direct link to Use custom example selector")

```python
  
examples = [  
 {"foo": "1"},  
 {"foo": "2"},  
 {"foo": "3"}  
]  
  
# Initialize example selector.  
example\_selector = CustomExampleSelector(examples)  
  
# Select examples  
example\_selector.select\_examples({"foo": "foo"})  
# -> array([{'foo': '2'}, {'foo': '3'}], dtype=object)  
  
# Add new example to the set of examples  
example\_selector.add\_example({"foo": "4"})  
example\_selector.examples  
# -> [{'foo': '1'}, {'foo': '2'}, {'foo': '3'}, {'foo': '4'}]  
  
# Select examples  
example\_selector.select\_examples({"foo": "foo"})  
# -> array([{'foo': '1'}, {'foo': '4'}], dtype=object)  

```

- [Implement custom example selector](#implement-custom-example-selector)
- [Use custom example selector](#use-custom-example-selector)
