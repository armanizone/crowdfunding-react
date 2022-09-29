import React from 'react'
import { Button } from '@mantine/core'
import { ButtonProps } from '@mantine/core'

interface FileInputProps {
  label: string,
  name?: string,
  accept?: string,
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void,
  buttonProps?: ButtonProps,
  inputProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

function FileInput({ label, buttonProps, inputProps, name, accept, onChange}: FileInputProps): JSX.Element {

  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleInput = () => {
    inputRef.current?.click()
  }

  return (
    <>
      <Button
        onClick={handleInput}
        {...buttonProps}
      >
        {label}
      </Button>
      <input
        {...inputProps}
        type='file'
        ref={inputRef}
        accept={accept}
        className='hidden scale-0'
        onChange={onChange}
        name={name}
      />
    </>
  )
}

export default FileInput