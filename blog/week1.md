My First Week of Building AI Applications

This week I built my first AI chat application using Next.js,the Vercel AI SDK, and DeepSeek. It streams responses token by token and remembers the conversation.

Token maybe a letter, a space, a word or half a word which I feel is LLM's language. Although in reality, it will be transform number code.Token also be used to calculate consumption which I use LLM. In my tests, one Chinese character approximately equal to one token.

what I understand by temperature is something used to control probabilistic output e.g. zero temperature means the token with the highest output probability. The higher the temperature, the more other possibilities there are. In my tests, at temperature 0, asking for a random number always returned 73.

System prompt is used to set the tone of the output.It changes How the model speaks, not WHAT it knows.

Streaming means one chunk by one chunk to respond.It makes the app feel much faster, improve user experience.

Multi-turn memory is actually to provide History message which includes user prompt and LLM's output to LLM in every turn.It's not real memory.

What surprised me: in the past, I keep thinking that LLM has real memory, but now I finally know the truth. Likewise, now I get the feeling that LLM has actually only benn doing the answering part.
And also what surprised me: in the past, I always think that streaming is what developer finish gets complete response first, then use code to output one chunk by one chunk. Now I know LLM cannot immediately response, such enough, some people are really smart.

Next week I'll learn RAG (Retrieval-Augmented Generation) to let the model answer questions about documents.