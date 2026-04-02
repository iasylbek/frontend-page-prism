import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProject } from '../services/project'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'
import Inspirations from './Inspirations'
import { getInspirationsByProject } from '../services/inspiration'
import { generate } from '../services/apiLLM'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [inspirations, setInspirations] = useState(null)
  const [llmDescription, setLlmDescription] = useState(null)
  const [stringifiedProjectValue, setStringifiedProjectValue] = useState(null)
  // const [llmLoading, setLlmLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(id)
      console.log(projectData)
      setProject(projectData)
    }
    fetchProject()

    const mockInspirationsData = [
      {
        id: '1',
        projectId: '1',
        websiteMetadata: {
          title: 'Title One',
          url: 'https://www.mockinspiration1.com',
          description: 'Mock inspiration 1 description',
        },
        screenshot_uri: 'https://www.mockinspiration1.com/screenshot.png',
        notes: 'Mock inspiration 1 notes',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      },
      {
        id: '2',
        projectId: '1',
        websiteMetadata: {
          title: 'Title Two',
          url: 'https://www.mockinspiration2.com',
          description: 'Mock inspiration 2 description',
        },
        screenshot_uri: 'https://www.mockinspiration2.com/screenshot.png',
        notes: 'Mock inspiration 2 notes',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      },
    ]
    setInspirations(mockInspirationsData)

    const fetchInspirations = async () => {
      // const inspirations = await getInspirationsByProject(id)
      const inspirations = mockInspirationsData
      console.log('inspirations', inspirations)
      setInspirations(inspirations)
    }
    fetchInspirations()

    // const fetchLLM = async () => {
    //   const response = await generate('why is the sky blue?')
    //   console.log('response', response)
    // }
    // fetchLLM()
  }, [id])

  const fetchLLMHandler = async () => {
    const response = await generate(stringifiedProjectValue)
    console.log('response', response)
    setLlmDescription(response.response)
  }

  useEffect(() => {
    const stringifiedProject = () => {
      const task =
        'Generate a better description for the project. This description should around middle size (not too large and not too small). This description should help user ideate a better description for the project. The ends users are: designers and developers, who want to be more creative and ideate a better description for the project.'
      const limitations =
        'Response should be respectful and not offensive. Response should be in the same language as the project description.'
      return `
    Goal: ${task}
    Limitations: ${limitations}
    Project: ${project?.name}
    Project Description: ${project?.description}
    Inspirations Description: ${inspirations
      ?.map((inspiration) => inspiration.websiteMetadata.description)
      .join(', ')}
    `
    }

    setStringifiedProjectValue(stringifiedProject())
  }, [project, inspirations])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{project.name}</h1>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.section}>
        <h2 className={styles.subheading}>Project Details</h2>
        <p>
          <strong>Created:</strong>{' '}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{' '}
          {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.subheading}>Inspirations</h2>
        {inspirations?.length > 0 ? (
          <ul className={styles.inspirationList}>
            <Inspirations inspirations={inspirations} />
          </ul>
        ) : (
          <p>No inspirations added yet.</p>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={fetchLLMHandler} className={styles.generateButton}>
          Generate Better Description
        </Button>
        <Button className={styles.editButton}>Edit Project</Button>
        <Button className={styles.deleteButton}>Delete Project</Button>
      </div>
      {/* {llmDescription === null && <div>Generating better description...</div>} */}
      {llmDescription && (
        <div className={styles.section}>
          <h2 className={styles.subheading}>LLM Description</h2>
          <p>{llmDescription}</p>
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
