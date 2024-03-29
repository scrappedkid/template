# Llama.cpp

[llama-cpp-python](https://github.com/abetlen/llama-cpp-python) is a Python binding for [llama.cpp](https://github.com/ggerganov/llama.cpp).

It supports inference for [many LLMs](https://github.com/ggerganov/llama.cpp), which can be accessed on [HuggingFace](https://huggingface.co/TheBloke).

This notebook goes over how to run `llama-cpp-python` within LangChain.

**Note: new versions of `llama-cpp-python` use GGUF model files (see [here](https://github.com/abetlen/llama-cpp-python/pull/633)).**

This is a breaking change.

To convert existing GGML models to GGUF you can run the following in [llama.cpp](https://github.com/ggerganov/llama.cpp):

```text
python ./convert-llama-ggmlv3-to-gguf.py --eps 1e-5 --input models/openorca-platypus2-13b.ggmlv3.q4\_0.bin --output models/openorca-platypus2-13b.gguf.q4\_0.bin  

```

## Installation[​](#installation "Direct link to Installation")

There are different options on how to install the llama-cpp package:

- CPU usage
- CPU + GPU (using one of many BLAS backends)
- Metal GPU (MacOS with Apple Silicon Chip)

### CPU only installation[​](#cpu-only-installation "Direct link to CPU only installation")

```bash
pip install llama-cpp-python  

```

### Installation with OpenBLAS / cuBLAS / CLBlast[​](#installation-with-openblas--cublas--clblast "Direct link to Installation with OpenBLAS / cuBLAS / CLBlast")

`lama.cpp` supports multiple BLAS backends for faster processing. Use the `FORCE_CMAKE=1` environment variable to force the use of cmake and install the pip package for the desired BLAS backend ([source](https://github.com/abetlen/llama-cpp-python#installation-with-openblas--cublas--clblast)).

Example installation with cuBLAS backend:

```bash
CMAKE\_ARGS="-DLLAMA\_CUBLAS=on" FORCE\_CMAKE=1 pip install llama-cpp-python  

```

**IMPORTANT**: If you have already installed the CPU only version of the package, you need to reinstall it from scratch. Consider the following command:

```bash
CMAKE\_ARGS="-DLLAMA\_CUBLAS=on" FORCE\_CMAKE=1 pip install --upgrade --force-reinstall llama-cpp-python --no-cache-dir  

```

### Installation with Metal[​](#installation-with-metal "Direct link to Installation with Metal")

`llama.cpp` supports Apple silicon first-class citizen - optimized via ARM NEON, Accelerate and Metal frameworks. Use the `FORCE_CMAKE=1` environment variable to force the use of cmake and install the pip package for the Metal support ([source](https://github.com/abetlen/llama-cpp-python/blob/main/docs/install/macos.md)).

Example installation with Metal Support:

```bash
CMAKE\_ARGS="-DLLAMA\_METAL=on" FORCE\_CMAKE=1 pip install llama-cpp-python  

```

**IMPORTANT**: If you have already installed a cpu only version of the package, you need to reinstall it from scratch: consider the following command:

```bash
CMAKE\_ARGS="-DLLAMA\_METAL=on" FORCE\_CMAKE=1 pip install --upgrade --force-reinstall llama-cpp-python --no-cache-dir  

```

### Installation with Windows[​](#installation-with-windows "Direct link to Installation with Windows")

It is stable to install the `llama-cpp-python` library by compiling from the source. You can follow most of the instructions in the repository itself but there are some windows specific instructions which might be useful.

Requirements to install the `llama-cpp-python`,

- git

- python

- cmake

- Visual Studio Community (make sure you install this with the following settings)

  - Desktop development with C++
  - Python development
  - Linux embedded development with C++

- Desktop development with C++

- Python development

- Linux embedded development with C++

1. Clone git repository recursively to get `llama.cpp` submodule as well

```text
git clone --recursive -j8 https://github.com/abetlen/llama-cpp-python.git  

```

2. Open up command Prompt (or anaconda prompt if you have it installed), set up environment variables to install. Follow this if you do not have a GPU, you must set both of the following variables.

```text
set FORCE\_CMAKE=1  
set CMAKE\_ARGS=-DLLAMA\_CUBLAS=OFF  

```

You can ignore the second environment variable if you have an NVIDIA GPU.

#### Compiling and installing[​](#compiling-and-installing "Direct link to Compiling and installing")

In the same command prompt (anaconda prompt) you set the variables, you can `cd` into `llama-cpp-python` directory and run the following commands.

```text
python setup.py clean  
python setup.py install  

```

## Usage[​](#usage "Direct link to Usage")

Make sure you are following all instructions to [install all necessary model files](https://github.com/ggerganov/llama.cpp).

You don't need an `API_TOKEN` as you will run the LLM locally.

It is worth understanding which models are suitable to be used on the desired machine.

```python
from langchain.llms import LlamaCpp  
from langchain.prompts import PromptTemplate  
from langchain.chains import LLMChain  
from langchain.callbacks.manager import CallbackManager  
from langchain.callbacks.streaming\_stdout import StreamingStdOutCallbackHandler  

```

**Consider using a template that suits your model! Check the models page on HuggingFace etc. to get a correct prompting template.**

```python
template = """Question: {question}  
  
Answer: Let's work this out in a step by step way to be sure we have the right answer."""  
  
prompt = PromptTemplate(template=template, input\_variables=["question"])  

```

```python
# Callbacks support token-wise streaming  
callback\_manager = CallbackManager([StreamingStdOutCallbackHandler()])  

```

### CPU[​](#cpu "Direct link to CPU")

Example using a LLaMA 2 7B model

```python
# Make sure the model path is correct for your system!  
llm = LlamaCpp(  
 model\_path="/Users/rlm/Desktop/Code/llama.cpp/models/openorca-platypus2-13b.gguf.q4\_0.bin",  
 temperature=0.75,  
 max\_tokens=2000,  
 top\_p=1,  
 callback\_manager=callback\_manager,   
 verbose=True, # Verbose is required to pass to the callback manager  
)  

```

```python
prompt = """  
Question: A rap battle between Stephen Colbert and John Oliver  
"""  
llm(prompt)  

```

```text
   
 Stephen Colbert:  
 Yo, John, I heard you've been talkin' smack about me on your show.  
 Let me tell you somethin', pal, I'm the king of late-night TV  
 My satire is sharp as a razor, it cuts deeper than a knife  
 While you're just a british bloke tryin' to be funny with your accent and your wit.  
 John Oliver:  
 Oh Stephen, don't be ridiculous, you may have the ratings but I got the real talk.  
 My show is the one that people actually watch and listen to, not just for the laughs but for the facts.  
 While you're busy talkin' trash, I'm out here bringing the truth to light.  
 Stephen Colbert:  
 Truth? Ha! You think your show is about truth? Please, it's all just a joke to you.  
 You're just a fancy-pants british guy tryin' to be funny with your news and your jokes.  
 While I'm the one who's really makin' a difference, with my sat  
  
   
 llama\_print\_timings: load time = 358.60 ms  
 llama\_print\_timings: sample time = 172.55 ms / 256 runs ( 0.67 ms per token, 1483.59 tokens per second)  
 llama\_print\_timings: prompt eval time = 613.36 ms / 16 tokens ( 38.33 ms per token, 26.09 tokens per second)  
 llama\_print\_timings: eval time = 10151.17 ms / 255 runs ( 39.81 ms per token, 25.12 tokens per second)  
 llama\_print\_timings: total time = 11332.41 ms  
  
  
  
  
  
 "\nStephen Colbert:\nYo, John, I heard you've been talkin' smack about me on your show.\nLet me tell you somethin', pal, I'm the king of late-night TV\nMy satire is sharp as a razor, it cuts deeper than a knife\nWhile you're just a british bloke tryin' to be funny with your accent and your wit.\nJohn Oliver:\nOh Stephen, don't be ridiculous, you may have the ratings but I got the real talk.\nMy show is the one that people actually watch and listen to, not just for the laughs but for the facts.\nWhile you're busy talkin' trash, I'm out here bringing the truth to light.\nStephen Colbert:\nTruth? Ha! You think your show is about truth? Please, it's all just a joke to you.\nYou're just a fancy-pants british guy tryin' to be funny with your news and your jokes.\nWhile I'm the one who's really makin' a difference, with my sat"  

```

Example using a LLaMA v1 model

```python
# Make sure the model path is correct for your system!  
llm = LlamaCpp(  
 model\_path="./ggml-model-q4\_0.bin", callback\_manager=callback\_manager, verbose=True  
)  

```

```python
llm\_chain = LLMChain(prompt=prompt, llm=llm)  

```

```python
question = "What NFL team won the Super Bowl in the year Justin Bieber was born?"  
llm\_chain.run(question)  

```

```text
   
   
 1. First, find out when Justin Bieber was born.  
 2. We know that Justin Bieber was born on March 1, 1994.  
 3. Next, we need to look up when the Super Bowl was played in that year.  
 4. The Super Bowl was played on January 28, 1995.  
 5. Finally, we can use this information to answer the question. The NFL team that won the Super Bowl in the year Justin Bieber was born is the San Francisco 49ers.  
  
   
 llama\_print\_timings: load time = 434.15 ms  
 llama\_print\_timings: sample time = 41.81 ms / 121 runs ( 0.35 ms per token)  
 llama\_print\_timings: prompt eval time = 2523.78 ms / 48 tokens ( 52.58 ms per token)  
 llama\_print\_timings: eval time = 23971.57 ms / 121 runs ( 198.11 ms per token)  
 llama\_print\_timings: total time = 28945.95 ms  
  
  
  
  
  
 '\n\n1. First, find out when Justin Bieber was born.\n2. We know that Justin Bieber was born on March 1, 1994.\n3. Next, we need to look up when the Super Bowl was played in that year.\n4. The Super Bowl was played on January 28, 1995.\n5. Finally, we can use this information to answer the question. The NFL team that won the Super Bowl in the year Justin Bieber was born is the San Francisco 49ers.'  

```

### GPU[​](#gpu "Direct link to GPU")

If the installation with BLAS backend was correct, you will see a `BLAS = 1` indicator in model properties.

Two of the most important parameters for use with GPU are:

- `n_gpu_layers` - determines how many layers of the model are offloaded to your GPU.
- `n_batch` - how many tokens are processed in parallel.

Setting these parameters correctly will dramatically improve the evaluation speed (see [wrapper code](https://github.com/mmagnesium/langchain/blob/master/langchain/llms/llamacpp.py) for more details).

```python
n\_gpu\_layers = 40 # Change this value based on your model and your GPU VRAM pool.  
n\_batch = 512 # Should be between 1 and n\_ctx, consider the amount of VRAM in your GPU.  
  
# Make sure the model path is correct for your system!  
llm = LlamaCpp(  
 model\_path="/Users/rlm/Desktop/Code/llama.cpp/models/openorca-platypus2-13b.gguf.q4\_0.bin",  
 n\_gpu\_layers=n\_gpu\_layers,  
 n\_batch=n\_batch,  
 callback\_manager=callback\_manager,  
 verbose=True, # Verbose is required to pass to the callback manager  
)  

```

```python
llm\_chain = LLMChain(prompt=prompt, llm=llm)  
question = "What NFL team won the Super Bowl in the year Justin Bieber was born?"  
llm\_chain.run(question)  

```

```text
   
   
 1. Identify Justin Bieber's birth date: Justin Bieber was born on March 1, 1994.  
   
 2. Find the Super Bowl winner of that year: The NFL season of 1993 with the Super Bowl being played in January or of 1994.  
   
 3. Determine which team won the game: The Dallas Cowboys faced the Buffalo Bills in Super Bowl XXVII on January 31, 1993 (as the year is mis-labelled due to a error). The Dallas Cowboys won this matchup.  
   
 So, Justin Bieber was born when the Dallas Cowboys were the reigning NFL Super Bowl.  
  
   
 llama\_print\_timings: load time = 427.63 ms  
 llama\_print\_timings: sample time = 115.85 ms / 164 runs ( 0.71 ms per token, 1415.67 tokens per second)  
 llama\_print\_timings: prompt eval time = 427.53 ms / 45 tokens ( 9.50 ms per token, 105.26 tokens per second)  
 llama\_print\_timings: eval time = 4526.53 ms / 163 runs ( 27.77 ms per token, 36.01 tokens per second)  
 llama\_print\_timings: total time = 5293.77 ms  
  
  
  
  
  
 "\n\n1. Identify Justin Bieber's birth date: Justin Bieber was born on March 1, 1994.\n\n2. Find the Super Bowl winner of that year: The NFL season of 1993 with the Super Bowl being played in January or of 1994.\n\n3. Determine which team won the game: The Dallas Cowboys faced the Buffalo Bills in Super Bowl XXVII on January 31, 1993 (as the year is mis-labelled due to a error). The Dallas Cowboys won this matchup.\n\nSo, Justin Bieber was born when the Dallas Cowboys were the reigning NFL Super Bowl."  

```

### Metal[​](#metal "Direct link to Metal")

If the installation with Metal was correct, you will see a `NEON = 1` indicator in model properties.

Two of the most important GPU parameters are:

- `n_gpu_layers` - determines how many layers of the model are offloaded to your Metal GPU, in the most case, set it to `1` is enough for Metal
- `n_batch` - how many tokens are processed in parallel, default is 8, set to bigger number.
- `f16_kv` - for some reason, Metal only support `True`, otherwise you will get error such as `Asserting on type 0 GGML_ASSERT: .../ggml-metal.m:706: false && "not implemented"`

Setting these parameters correctly will dramatically improve the evaluation speed (see [wrapper code](https://github.com/mmagnesium/langchain/blob/master/langchain/llms/llamacpp.py) for more details).

```python
n\_gpu\_layers = 1 # Metal set to 1 is enough.  
n\_batch = 512 # Should be between 1 and n\_ctx, consider the amount of RAM of your Apple Silicon Chip.  
# Make sure the model path is correct for your system!  
llm = LlamaCpp(  
 model\_path="/Users/rlm/Desktop/Code/llama.cpp/models/openorca-platypus2-13b.gguf.q4\_0.bin",  
 n\_gpu\_layers=n\_gpu\_layers,  
 n\_batch=n\_batch,  
 f16\_kv=True, # MUST set to True, otherwise you will run into problem after a couple of calls  
 callback\_manager=callback\_manager,  
 verbose=True, # Verbose is required to pass to the callback manager  
)  

```

The console log will show the following log to indicate Metal was enable properly.

```text
ggml\_metal\_init: allocating  
ggml\_metal\_init: using MPS  
...  

```

You also could check `Activity Monitor` by watching the GPU usage of the process, the CPU usage will drop dramatically after turn on `n_gpu_layers=1`.

For the first call to the LLM, the performance may be slow due to the model compilation in Metal GPU.

### Grammars[​](#grammars "Direct link to Grammars")

We can use [grammars](https://github.com/ggerganov/llama.cpp/blob/master/grammars/README.md) to constrain model outputs and sample tokens based on the rules defined in them.

To demonstrate this concept, we've included [sample grammar files](https://github.com/langchain-ai/langchain/tree/master/libs/langchain/langchain/llms/grammars), that will be used in the examples below.

Creating gbnf grammar files can be time-consuming, but if you have a use-case where output schemas are important, there are two tools that can help:

- [Online grammar generator app](https://grammar.intrinsiclabs.ai/) that converts TypeScript interface definitions to gbnf file.
- [Python script](https://github.com/ggerganov/llama.cpp/blob/master/examples/json-schema-to-grammar.py) for converting json schema to gbnf file. You can for example create `pydantic` object, generate its JSON schema using `.schema_json()` method, and then use this script to convert it to gbnf file.

In the first example, supply the path to the specifed `json.gbnf` file in order to produce JSON:

```python
n\_gpu\_layers = 1 # Metal set to 1 is enough.  
n\_batch = 512 # Should be between 1 and n\_ctx, consider the amount of RAM of your Apple Silicon Chip.  
# Make sure the model path is correct for your system!  
llm = LlamaCpp(  
 model\_path="/Users/rlm/Desktop/Code/llama.cpp/models/openorca-platypus2-13b.gguf.q4\_0.bin",  
 n\_gpu\_layers=n\_gpu\_layers,  
 n\_batch=n\_batch,  
 f16\_kv=True, # MUST set to True, otherwise you will run into problem after a couple of calls  
 callback\_manager=callback\_manager,  
 verbose=True, # Verbose is required to pass to the callback manager  
 grammar\_path="/Users/rlm/Desktop/Code/langchain-main/langchain/libs/langchain/langchain/llms/grammars/json.gbnf",  
)  

```

```python
result=llm("Describe a person in JSON format:")  

```

```text
 {  
 "name": "John Doe",  
 "age": 34,  
 "": {  
 "title": "Software Developer",  
 "company": "Google"  
 },  
 "interests": [  
 "Sports",  
 "Music",  
 "Cooking"  
 ],  
 "address": {  
 "street\_number": 123,  
 "street\_name": "Oak Street",  
 "city": "Mountain View",  
 "state": "California",  
 "postal\_code": 94040  
 }}  
  
   
 llama\_print\_timings: load time = 357.51 ms  
 llama\_print\_timings: sample time = 1213.30 ms / 144 runs ( 8.43 ms per token, 118.68 tokens per second)  
 llama\_print\_timings: prompt eval time = 356.78 ms / 9 tokens ( 39.64 ms per token, 25.23 tokens per second)  
 llama\_print\_timings: eval time = 3947.16 ms / 143 runs ( 27.60 ms per token, 36.23 tokens per second)  
 llama\_print\_timings: total time = 5846.21 ms  

```

We can also supply `list.gbnf` to return a list:

```python
n\_gpu\_layers = 1   
n\_batch = 512  
llm = LlamaCpp(  
 model\_path="/Users/rlm/Desktop/Code/llama.cpp/models/openorca-platypus2-13b.gguf.q4\_0.bin",  
 n\_gpu\_layers=n\_gpu\_layers,  
 n\_batch=n\_batch,  
 f16\_kv=True, # MUST set to True, otherwise you will run into problem after a couple of calls  
 callback\_manager=callback\_manager,  
 verbose=True,  
 grammar\_path="/Users/rlm/Desktop/Code/langchain-main/langchain/libs/langchain/langchain/llms/grammars/list.gbnf",  
)  

```

```python
result=llm("List of top-3 my favourite books:")  

```

```text
 ["The Catcher in the Rye", "Wuthering Heights", "Anna Karenina"]  
  
  
   
 llama\_print\_timings: load time = 322.34 ms  
 llama\_print\_timings: sample time = 232.60 ms / 26 runs ( 8.95 ms per token, 111.78 tokens per second)  
 llama\_print\_timings: prompt eval time = 321.90 ms / 11 tokens ( 29.26 ms per token, 34.17 tokens per second)  
 llama\_print\_timings: eval time = 680.82 ms / 25 runs ( 27.23 ms per token, 36.72 tokens per second)  
 llama\_print\_timings: total time = 1295.27 ms  

```

- [Installation](#installation)

  - [CPU only installation](#cpu-only-installation)
  - [Installation with OpenBLAS / cuBLAS / CLBlast](#installation-with-openblas--cublas--clblast)
  - [Installation with Metal](#installation-with-metal)
  - [Installation with Windows](#installation-with-windows)

- [Usage](#usage)

  - [CPU](#cpu)
  - [GPU](#gpu)
  - [Metal](#metal)
  - [Grammars](#grammars)

- [CPU only installation](#cpu-only-installation)

- [Installation with OpenBLAS / cuBLAS / CLBlast](#installation-with-openblas--cublas--clblast)

- [Installation with Metal](#installation-with-metal)

- [Installation with Windows](#installation-with-windows)

- [CPU](#cpu)

- [GPU](#gpu)

- [Metal](#metal)

- [Grammars](#grammars)
