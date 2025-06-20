/* eslint-disable react/react-in-jsx-scope */
// app/blog/[slug]/page.tsx
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { notFound } from 'next/navigation'

type Params = { params: { slug: string } }

export async function generateStaticParams() {
    const postsDir = path.join(process.cwd(), 'posts')
    const files = fs.readdirSync(postsDir).filter((f) => /\.(md|mdx)$/.test(f))
    return files.map((fileName) => ({
        slug: fileName.replace(/\.(md|mdx)$/, ''),
    }))
}

export default async function PostPage({ params: { slug } }: Params) {
    const postsDir = path.join(process.cwd(), 'posts')
    let filePath = path.join(postsDir, `${slug}.md`)
    if (!fs.existsSync(filePath)) filePath = path.join(postsDir, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) return notFound()

    const raw = fs.readFileSync(filePath, 'utf8')
    const { data: meta, content } = matter(raw)

    const processed = await remark().use(remarkHtml).process(content)
    const html = processed.toString()

    return (
        <main className="prose dark:prose-invert max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold">{meta.title}</h1>
            <p className="text-sm text-gray-500">
                {meta.date}
                {meta.author && <><br /><span className="italic">by {meta.author}</span></>}
            </p>
            <article dangerouslySetInnerHTML={{ __html: html }} />
        </main>
    )
}
