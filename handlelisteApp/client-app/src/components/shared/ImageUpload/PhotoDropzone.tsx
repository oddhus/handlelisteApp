import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpIcon } from '@chakra-ui/icons'
import { Heading } from '@chakra-ui/react'

interface Props {
  setFiles: (files: any) => void
}

const PhotoDropzone: React.FC<Props> = ({ setFiles }) => {
  const styles = {
    border: 'dashed 3px #eee',
    boarderColor: '#eee',
    borderRadius: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200,
  }

  const styleActive = {
    boarderColor: 'green',
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
    [setFiles]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...styles, ...styleActive } : styles}
    >
      <input {...getInputProps()} />
      <ArrowUpIcon w={20} h={20} />
      <Heading as="h5" size="sm">
        Drop Image here or click to browse
      </Heading>
    </div>
  )
}

export default PhotoDropzone
