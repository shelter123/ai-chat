1. Function calling is AI's arms and legs, it actually doing something rather than saying something.
2. To transient errors, SDK will retry automatically. But to permanent errors, It will return errors' log to caller.
3. Long context, retry, loop call.
4. Layer1 is UI, it shows for users, manages messages and params. Layer2 is API, validates permission, manages prompt and provides tools. Layer3 is LLM which generates plan and decisions, then, to call funcions. Tool will search RAG, DB or openApi.
5. RAG solve outdated knowledge, hallucination and personal data. Embedding is vectorization.