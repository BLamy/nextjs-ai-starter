// USER: { "min": 1, "max": 100 }
// ASSISTANT: { "result": 42 }
// USER: { "min": 1, "max": 100 }
// ASSISTANT: { "result": 69 }
// USER: { "min": 100, "max": 1 }
// ASSISTANT: { "error": { "type": "InvalidInput", "msg": "min must be less than max" } }
export type Prompt = "Can you tell me a number between {{min}} and {{max}}?"
export type Input = { min: number, max: number }
export type Output = { result: number }