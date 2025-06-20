/* eslint-disable react/react-in-jsx-scope */
// app/blog/page.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

type PostMeta = { slug: string; title: string; date: string; author?: string }

export default function BlogIndex() {
    const postsDir = path.join(process.cwd(), 'posts')
    const files = fs
        .readdirSync(postsDir)
        .filter((f) => /\.(md|mdx)$/.test(f))

    const posts: PostMeta[] = files
        .map((fileName) => {
            const slug = fileName.replace(/\.(md|mdx)$/, '')
            const raw = fs.readFileSync(path.join(postsDir, fileName), 'utf8')
            const { data } = matter(raw)
            return {
                slug,
                title: data.title,
                date: data.date,
                author: data.author,    // ← pull author here
            }
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1))

    return (
        <main className="max-w-3xl mx-auto p-6 space-y-4">
            <h1 className="text-3xl font-bold">Blog</h1>
            <ul className="space-y-4">
                {posts.map(({ slug, title, date, author }) => (
                    <li key={slug}>
                        <Link
                            href={`/blog/${slug}`}
                            className="block p-4 border rounded hover:shadow transition"
                        >
                            <h2 className="text-xl font-semibold">{title}</h2>
                            <p className="text-sm text-gray-500">
                                {date}
                                {author && (
                                    <> · <span className="italic">by {author}</span></>
                                )}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}
