import { z } from "zod";

// Ideally the latest score will just pop up in a block at the top of the search results
const gameSpotlightSchema = z.object({
  sports_results: z.object({
    game_spotlight: z.object({
      date: z.string(),
      stadium: z.string(),
      teams: z.array(
        z.object({
          name: z.string(),
          score: z.object({
            total: z.string(),
          }),
        })
      ),
    }),
  }),
});

// If the latest score is not in the game spotlight, we will look at related questions
const relatedQuestionsSchema = z.object({
  related_questions: z.array(
    z.object({
      title: z.string().optional(),
      date: z.string().optional(),
      question: z.string().optional(),
      snippet: z.string().optional(),
    })
  ),
});

// If the latest score is not in the game spotlight or related questions, we will look at organic results
const organicResultsSchema = z.object({
  organic_results: z.array(
    z.object({
      title: z.string(),
      snippet: z.string().optional(),
    })
  ),
});

export default async function search({ query }: { query: string }) {
  const res = await fetch(
    `https://serpapi.com/search.json?engine=google&q=${query}&api_key=${process.env.SERP_API_KEY}`
  );
  const data = await res.json();

  const gameSpotLight = gameSpotlightSchema.safeParse(data);
  if (gameSpotLight.success) {
    const { game_spotlight } = gameSpotLight.data.sports_results;
    return `### Observation
${game_spotlight.date}: ${game_spotlight.stadium}
${game_spotlight.teams[0].name}: ${game_spotlight.teams[0].score.total}
${game_spotlight.teams[1].name}: ${game_spotlight.teams[1].score.total}`;
  }

  const relatedQuestions = relatedQuestionsSchema.safeParse(data);
  if (relatedQuestions.success) {
    return "### Observation\n" + relatedQuestions.data.related_questions
      .map(
        (question) => `${question.title}
${question.date}
${question.question}
${question.snippet}
`.replace(new RegExp("undefined[\S\s]*", "gm"), "")
      )
      .join("\n\n\n");
  }

  const organicResults = organicResultsSchema.safeParse(data);
  if (organicResults.success) {
    return "### Observation" + organicResults.data.organic_results
      .map(
        (result) => `${result.title}
${result.snippet}`.replace(new RegExp("undefined[\S\s]*", "gm"), "")
      )
      .join("\n\n\n");
  }

  return "ERROR: No results found";
}
