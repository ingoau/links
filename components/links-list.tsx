"use client";

import { Link } from "@/lib/types";
import CreateLink from "./create-link";
import { useEffect, useState } from "react";
import * as linksApi from "@/lib/links";

export default function LinksList() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLinks() {
      setLinks(await linksApi.list());
      setLoading(false);
    }

    fetchLinks();
  }, []);

  async function refetch() {
    setLinks(await linksApi.list());
  }

  return (
    <>
      <CreateLink refetchAction={refetch} />
      <ul>
        {links.map((link) => (
          <li key={link.path}>
            {link.link}
            {link.path}
          </li>
        ))}
      </ul>
    </>
  );
}
