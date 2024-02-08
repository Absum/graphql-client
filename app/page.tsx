import Image from "next/image";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";

const queryAll = gql` {
  books {
    title
    author {
      name
    }
  }
}`;

const queryOne = gql`  {
  book(id: 2) {
    title
    author {
      name
    }
  }
}`;


export default async function Home() {
  const { data: dataAll } = await getClient().query({ query: queryAll });
  const { data: dataOne } = await getClient().query({ query: queryOne });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          {dataAll && dataAll.books && (
            <ul>
              {Array.isArray(dataAll.books) && dataAll.books.map((item: any) => (
                <li key={item.title}>Title: {item.title}</li>
              ))}
            </ul>
          )}

          {dataOne && dataOne.book && (
            <ul>
              <li>Title: {dataOne.book.title}</li>
              <li>Author: {dataOne.book.author.name}</li>
            </ul>
          )}
      </div>
    </main>
  );
}
