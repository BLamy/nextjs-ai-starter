"use client";
import { useState, useEffect } from "react";
import { WorkerHttpvfs, createDbWorker } from "sql.js-httpvfs";

// function cosineSimilarity(vec1: number[], vec2: number[]): number {
//   const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
//   const magnitudeVec1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
//   const magnitudeVec2 = Math.sqrt(vec2.reduce((sum, b) => sum + b * b, 0));
//   const similarity = dotProduct / (magnitudeVec1 * magnitudeVec2);
//   return similarity;
// }

function cosineSimilarity(vec1: number[], vec2: number[]): number {
  let dotProduct = 0;
  let magnitudeVec1 = 0;
  let magnitudeVec2 = 0;

  for (let i = 0; i < vec1.length; i++) {
      dotProduct += vec1[i] * vec2[i];
      magnitudeVec1 += vec1[i] * vec1[i];
      magnitudeVec2 += vec2[i] * vec2[i];
  }

  magnitudeVec1 = Math.sqrt(magnitudeVec1);
  magnitudeVec2 = Math.sqrt(magnitudeVec2);
  const similarity = dotProduct / (magnitudeVec1 * magnitudeVec2);
  return similarity;
}


const useSql = (url: string) => {
  const [worker, setWorker] = useState<WorkerHttpvfs>();

  useEffect(() => {
    const workerUrl = new URL("sql.js-httpvfs/dist/sqlite.worker.js", import.meta.url);
    const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
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
    ).then(newWorker => {
      setWorker(newWorker);
    });

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
          debugger;
//           await sql.db.create_function("cosineSimilarity", `function cosineSimilarity(vec1: number[], vec2: number[]): number {
//   let dotProduct = 0;
//   let magnitudeVec1 = 0;
//   let magnitudeVec2 = 0;

//   for (let i = 0; i < vec1.length; i++) {
//       dotProduct += vec1[i] * vec2[i];
//       magnitudeVec1 += vec1[i] * vec1[i];
//       magnitudeVec2 += vec2[i] * vec2[i];
//   }

//   magnitudeVec1 = Math.sqrt(magnitudeVec1);
//   magnitudeVec2 = Math.sqrt(magnitudeVec2);
//   const similarity = dotProduct / (magnitudeVec1 * magnitudeVec2);
//   return similarity;
// }`);
          // await sql.db.create_function("addOne", `function addOne(x) {return x+'test';}`)
          // debugger;
          // const data = await sql.db.exec("SELECT addOne('teest')");

         function getFlag(country_code) {
           // just some unicode magic
           return String.fromCodePoint(...Array.from(country_code||"")
             .map(c => 127397 + c.codePointAt()));
         }
         
         await sql.db.create_function("get_flag", getFlag)
         const data = await sql.db.query(`
           select long_name, get_flag("2-alpha_code") as flag from wdi_country
             where region is not null and currency_unit = 'Euro';
         `)



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

export default useSqlQuery;