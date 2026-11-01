# Giving My AI Hands — Function Calling

This week I moved beyond simple chat. The biggest moment was learning function calling — teaching the model to call my own code. To let AI do my work.

Function calling means defining "tools" (name + description + execute), and letting the model decide when to use them. Before, the model could only talk. Now it can ask my code to run — like checking the current time, which it can't know on its own. This is the foundation of agents.

Error handling: the SDK retries transient errors (network) but throws permanent ones (bad key) immediately.
Cost: single calls are nearly free, but long context and repeated calls are the real multipliers. Besides, retry calling.
Architecture: frontend → backend → model → tools → data. Every layer both important. they will compose baisc agent.

Next week I'll start RAG (Retrieval-Augmented Generation). It solves the knowledge cutoff problem by retrieving relevant documents first, then letting the model answer with evidence.

One tool call means the model actually ran my function — that felt like watching a chatbot grow hands.