/* eslint-disable react/display-name */
import React from 'react'
import TOCInline from '@/components/TOCInline'
import { Pre } from 'pliny/ui/Pre'
import { BlogNewsletterForm } from '@/components/NewsletterForm'
import Image from './Image'
import CustomLink from './Link'
export const Wrapper = ({ layout, content, ...rest }) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}
export const MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  BlogNewsletterForm,
}
