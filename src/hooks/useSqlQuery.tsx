"use client";
import { useState, useEffect, useMemo } from "react";
import { WorkerHttpvfs, createDbWorker } from "sql.js-httpvfs";

const useSql = (url: string) => {
  const [worker, setWorker] = useState<WorkerHttpvfs>();

  useEffect(() => {
    const workerUrl = new URL(
      "sql.js-httpvfs/dist/sqlite.worker.js",
      import.meta.url
    );
    const wasmUrl = new URL(
      "sql.js-httpvfs/dist/sql-wasm.wasm",
      import.meta.url
    );
    createDbWorker(
      [
        {
          from: "inline",
          config: {
            serverMode: "full",
            url: url,
            requestChunkSize: 4096,
          },
        },
      ],
      workerUrl.toString(),
      wasmUrl.toString()
    ).then(setWorker);

    return () => {
      // TODO: close worker
    };
  }, [url]);

  return worker;
};

const useSqlQuery = (query: string, url: string = "/example.sqlite3") => {
  const sql = useSql(url);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (sql) {
      const executeQuery = async () => {
        setLoading(true);
        try {
          const data = await sql.db.query(query);
          setResults(data || []);
        } catch (error) {
          console.error("Error executing query:", error);
        } finally {
          setLoading(false);
        }
      };

      executeQuery();
    }
  }, [sql, query]);

  return { results, loading };
};

// WIP
export const useSemanticSearch = (
  vectorToLookup: number[],
  url: string = "/example.sqlite3"
) => {
  const sql = useSql(url);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const memoizedVector = useMemo(
    () => vectorToLookup,
    [JSON.stringify(vectorToLookup)]
  );

  useEffect(() => {
    if (sql) {
      const executeQuery = async () => {
        setLoading(true);
        try {
          // Todo update this so the input is not json and instead is a BLOB that we convert into json
          await sql.worker.evalCode(`
         function cosineSimilarity(input) {
           const vec1 = JSON.parse(input);
           const vec2 = ${JSON.stringify(vectorToLookup)};
           const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
           const magnitudeVec1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
           const magnitudeVec2 = Math.sqrt(vec2.reduce((sum, b) => sum + b * b, 0));
           const similarity = dotProduct / (magnitudeVec1 * magnitudeVec2);
           return similarity;
         }
         await db.create_function("cosine_similarity", cosineSimilarity)`);

          // find the most similar vectors
          const data = await sql.db.query(`
         select vector, cosine_similarity("vector") as cosine from Vectors
           order by cosine desc limit 3;
       `);
          console.log("data", data);
          setResults(data || []);
        } catch (error) {
          console.error("Error executing query:", error);
        } finally {
          setLoading(false);
        }
      };

      executeQuery();
    }
  }, [sql, memoizedVector]);

  return { results, loading };
};

export default useSqlQuery;
