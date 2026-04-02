AI Story: As a user, I want to generate a text description that represents my inspiration/project and then displays it on the project details page.
Scope:
Leverage provided LLM to query the generate a text description that represents an inspiration/project
Handle any errors or unexpected outputs
Add unit test: handle different cases of LLM output

1. Project, Inspiration, WebsiteMetadata
2. {"model": "tinyllama","prompt": "why is the sky blue?", "stream": true}
3. Call API service for AI
4. Get response 200: response.response
5. If stream: handle
6. Failed response: handle > show error message and maybe "Retry" button
   6.1 400 (problem with data submission from client)
   6.2 500 (problem on server end)
   6.3 network, gateway, etc...
