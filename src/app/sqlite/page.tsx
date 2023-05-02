"use client";
import React from "react";
import * as z from "zod";
import { useSemanticSearch } from "../../hooks/useSqlQuery";
import Button from "../../components/Button";

const vectorSchema = z.array(z.number());
type Props = {
  searchParams: {
    vector: string;
  };
};

// useSemanticSearch is a custom hook that takes a vector and returns nearby vectors in the local sqlite database
const VectorLookup = ({ vector }: { vector: z.infer<typeof vectorSchema> }) => {
  const { results, loading } = useSemanticSearch(vector);
  return <div>{loading ? "Loading..." : JSON.stringify(results)}</div>;
};

// Force dynamic is required to use URLSearchParams otherwise it will
// cache the default values and serve them every time in prod
// Might be better to just allow a next argument to be fed to generateChatCompletion
export const dynamic = "force-dynamic";
export default function StaticEmbeddingsDemo({ searchParams }: Props) {
  try {
    const vector = vectorSchema.parse(JSON.parse(searchParams["vector"]));
    return <VectorLookup vector={vector} />;
  } catch (error) {
    return (
      <div>
        <h1>Click button to look up a random vector</h1>
        <Button
          onClick={() =>
            (window.location.search = `?vector=[${[
              Math.random(),
              Math.random(),
              Math.random(),
            ]}]`)
          }
          text="Random Vector"
        />
      </div>
    );
  }
}
