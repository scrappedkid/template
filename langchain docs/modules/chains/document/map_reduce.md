# Map reduce

The map reduce documents chain first applies an LLM chain to each document individually (the Map step), treating the chain output as a new document. It then passes all the new documents to a separate combine documents chain to get a single output (the Reduce step). It can optionally first compress, or collapse, the mapped documents to make sure that they fit in the combine documents chain (which will often pass them to an LLM). This compression step is performed recursively if necessary.

![map_reduce_diagram](/assets/images/map_reduce-c65525a871b62f5cacef431625c4d133.jpg)

![map_reduce_diagram](/assets/images/map_reduce-c65525a871b62f5cacef431625c4d133.jpg)
