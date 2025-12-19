"use client";

import { Link } from "@/lib/types";
import CreateLink from "./create-link";
import { useEffect, useState } from "react";
import * as linksApi from "@/lib/links";
import LinkComponent from "./link";
import { Skeleton } from "./ui/skeleton";

export default function LinksList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      const result = await linksApi.list();
      if (result.success) {
        setLinks(result.data);
      }
      setLoading(false);
    }

    fetchLinks();
  }, []);

  async function refetch() {
    const result = await linksApi.list();
    if (result.success) {
      setLinks(result.data);
    }
  }

  return (
    <>
      <CreateLink refetchAction={refetch} />
      {links.map((link) => (
        <LinkComponent refetchAction={refetch} key={link.path} link={link} />
      ))}
      {loading && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24" />
          ))}
        </>
      )}
    </>
  );
}
