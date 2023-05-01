"use client";
import React from "react";
import useSqlQuery from "../../hooks/useSqlQuery";

export default function StaticEmbeddingsDemo() {
    const { results, loading } = useSqlQuery("select * from mytable");
    return <div>
        {loading ? "Loading..." : JSON.stringify(results)}
    </div>
}
