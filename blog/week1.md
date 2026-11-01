# My First Week of Building AI Applications

This week I built my first AI chat application using Next.js,the Vercel AI SDK, and DeepSeek. It streams responses token by token and remembers the conversation.

Token maybe a letter, a space, a word or half a word which I feel is LLM's language. Although in reality, it will be transform number code.Token also be used to calculate consumption which I use LLM. In my tests, one Chinese character approximately equal to one token.

what I understand by temperature is something used to control probabilistic output e.g. zero temperature means the token with the highest output probability. The higher the temperature, the more other possibilities there are. In my tests, at temperature 0, asking for a random number always returned 73.

System prompt is used to set the tone of the output.It changes How the model speaks, not WHAT it knows.

Streaming means one chunk by one chunk to respond.It makes the app feel much faster, improve user experience.

Multi-turn memory is actually to provide History message which includes user prompt and LLM's output to LLM in every turn.It's not real memory.

What surprised me: in the past, I keep thinking that LLM has real memory, but now I finally know the truth. Likewise, now I get the feeling that LLM has actually only benn doing the answering part.
And also what surprised me: in the past, I always think that streaming is what developer finish gets complete response first, then use code to output one chunk by one chunk. Now I know LLM cannot immediately response, such enough, some people are really smart.

Next week I'll learn RAG (Retrieval-Augmented Generation) to let the model answer questions about documents.


# My First Week of Building AI Applications

This week I built my first AI chat application using Next.js, the Vercel AI SDK, and DeepSeek. It streams responses token by token and remembers the conversation.

A token can be a letter, a space, a word, or part of a word — this is the LLM's "language". In reality, tokens are converted into numeric codes. Tokens are also used to calculate how much of the LLM I use. In my tests, one Chinese character was approximately equal to one token.

What I understand by temperature is: it controls the randomness of the output. For example, zero temperature means the model always chooses the token with the highest probability. The higher the temperature, the more possibilities there are. In my tests, at temperature 0, asking for a random number always returned 73.

A system prompt is used to set the tone of the output. It changes how the model speaks, not what it knows.

Streaming means responding one chunk at a time. It makes the app feel much faster and improves the user experience.

Multi-turn memory is actually just sending the history messages (the user's prompts and the LLM's outputs) back to the LLM every turn. It's not real memory.

What surprised me: in the past, I kept thinking that an LLM has real memory, but now I finally know the truth — the LLM has actually only been doing the "answering" part.

Another thing that surprised me: I used to think streaming was just a frontend trick, where the developer first received the complete response and then used code to display it chunk by chunk. Now I know the LLM actually cannot respond all at once, so streaming is real. That's pretty clever engineering.

Next week I'll learn RAG (Retrieval-Augmented Generation) to let the model answer questions about documents.