import React from 'react'

import { SITE_TITLE_CLASS } from '../constants'
import './SiteTitle.css'

export function SiteTitle(props) {
  const { title } = props

  return <h1 className={SITE_TITLE_CLASS}>{title}</h1>
}

export default SiteTitle
