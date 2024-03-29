# Safety

One of the key concerns with using LLMs is that they may generate harmful or unethical text. This is an area of active research in the field. Here we present some built-in chains inspired by this research, which are intended to make the outputs of LLMs safer.

- [Amazon Comprehend moderation chain](/docs/guides/safety/amazon_comprehend_chain): Use [Amazon Comprehend](https://aws.amazon.com/comprehend/) to detect and handle Personally Identifiable Information (PII) and toxicity.
- [Constitutional chain](/docs/guides/safety/constitutional_chain): Prompt the model with a set of principles which should guide the model behavior.
- [Hugging Face prompt injection identification](/docs/guides/safety/huggingface_prompt_injection_identification): Detect and handle prompt injection attacks.
- [Logical Fallacy chain](/docs/guides/safety/logical_fallacy_chain): Checks the model output against logical fallacies to correct any deviation.
- [Moderation chain](/docs/guides/safety/moderation): Check if any output text is harmful and flag it.
