// curl -v --location 'http://localhost:11434/api/generate' --header 'Content-Type: application/json' --data '{"model": "tinyllama","prompt": "why is the sky blue?", "stream": true}'

import axios from 'axios'

const apiLLM = axios.create({
  baseURL: 'http://localhost:11434/api',
})

export const generate = async (prompt: string) => {
  const response = await apiLLM.post('/generate', {
    model: 'tinyllama',
    prompt,
    stream: false,
  })

  return response.data
}
