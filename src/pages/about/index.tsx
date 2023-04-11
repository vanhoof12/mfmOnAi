import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import { markdownToHtml } from '@/server/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## Intro

I love the [My First Million](https://www.youtube.com/channel/UCyaN6mg5u8Cjy2ZI4ikWaug). But searching with podcasts can be really challenging.

I built this project to solve this problem... and I also wanted to play around with cool AI stuff. 

## How It Works

This project is [open source](https://github.com/transitive-bullshit/yt-semantic-search)! 

## Feedback

Have an idea on how this webapp could be improved? Find a particularly fun search query?

Feel free to send me feedback on [Twitter](https://twitter.com/casey_xyz). 

**This project is not affiliated with the My First Million Podcast**. It just pulls data from their [YouTube channel](https://www.youtube.com/channel/UCyaN6mg5u8Cjy2ZI4ikWaug) and processes it using AI. 
`

export default function AboutPage({
  content
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.meta}>
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.detail}>
            <a
              className='link'
              href={config.twitterUrl}
              title={`Twitter ${config.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              By Casey
            </a>
          </p>
        </div>

        <Markdown content={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await markdownToHtml(markdownContent)

  return {
    props: {
      content
    }
  }
}
