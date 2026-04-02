import React, { useState, useEffect } from 'react'
import Button from '../components/Button'

const Inspirations = ({ inspirations }) => {
  return (
    <div>
      {inspirations.map((inspiration) => {
        return (
          <div key={inspiration.id}>
            <p>{inspiration.websiteMetadata.title}</p>
            <p>{inspiration.websiteMetadata.url}</p>
            <p>{inspiration.websiteMetadata.description}</p>
            <p>{inspiration.screenshot_uri}</p>
            <p>{inspiration.notes}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Inspirations
