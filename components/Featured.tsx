'use client';

import Image from "next/image";
import Link from "next/link";

const featured = [
  {
    username: "zay",
    title: "Build AI apps fast",
    img: "/demo1.png",
  },
  {
    username: "mia",
    title: "Prompt hacks",
    img: "/demo2.png",
  },
  {
    username: "auroracodes",
    title: "Design smarter",
    img: "/demo3.png",
  }
];

export default function Featured() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-20 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured</h2>

      <div className="grid sm:grid-cols-3 gap-6">
        {featured.map((card, i) => (
          <Link
            key={i}
            href={`/${card.username}`}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
          >
            <div className="w-full h-44 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
              <Image
                src={card.img}
                alt={card.title}
                width={260}
                height={150}
                className="object-cover rounded-lg"
              />
            </div>
            <p className="font-medium text-center">{card.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

