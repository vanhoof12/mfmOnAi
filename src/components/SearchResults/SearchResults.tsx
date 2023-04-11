'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { SearchResultsList } from '@/components/SearchResultsList/SearchResultsList'
import { Search } from '@/lib/hooks/search'
import socialImage from '@/public/social.jpg'

import styles from './styles.module.css'

export const SearchResults: React.FC = () => {
  const { results, debouncedQuery, error, isEmpty, isLoading } =
    Search.useContainer()

  if (error) {
    return <div>Error loading results</div>
  }

  let content: React.ReactNode

  if ((isEmpty || !results) && !debouncedQuery) {
    content = <EmptyQuery />
  } else if (isLoading) {
    content = (
      <div className={styles.detail}>
        <LoadingSpinner loading={isLoading} />
      </div>
    )
  } else if (results) {
    if (isEmpty) {
      content = <EmptyResults />
    } else {
      content = <SearchResultsList results={results} />
    }
  }

  return <div className={cs(styles.searchResults)}>{content}</div>
}

export const EmptyQuery: React.FC = () => {
  const { setQuery, setDebouncedQuery } = Search.useContainer()

  const fakeNavigation = React.useCallback(
    (query: string) => {
      // router.push({
      //   pathname: '/',
      //   query: {
      //     query
      //   }
      // })
      setQuery(query)
      setDebouncedQuery(query)
    },
    [setQuery, setDebouncedQuery]
  )

  return (
    <div className={styles.emptyResults}>
      <p>Search any topic the Sam and Shaan have covered on the pod.</p>

      <p>
        Examples:{' '}
        <Link
          className='link'
          href='/?query=business+ideas'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('business ideas')
          }}
        >
          business ideas
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=crypto+crash'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('crypto crash')
          }}
        >
          crypto crash
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=airbnb'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('airbnb')
          }}
        >
          airbnb
        </Link>
        ,&nbsp;
        <Link
          className='link'
          href='/?query=billy+of+the+week'
          onClick={(e) => {
            e.preventDefault()
            fakeNavigation('billy of the week')
          }}
        >
          billy of the week
        </Link>
      </p>

      <div className={styles.socialImageWrapper}>
        <Image
          className={styles.socialImage}
          src={socialImage.src}
          alt='Search the MFM Podcast using AI-powered semantic search.'
          width={socialImage.width}
          height={socialImage.height}
          placeholder='blur'
          blurDataURL={socialImage.blurDataURL}
        />
      </div>
    </div>
  )
}

export const EmptyResults: React.FC = () => {
  return (
    <div className={styles.emptyResults}>
      <p>No results found. Try broadening your search.</p>
    </div>
  )
}
