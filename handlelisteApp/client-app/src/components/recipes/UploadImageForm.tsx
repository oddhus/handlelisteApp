import { Button, FormControl, FormLabel, HStack } from '@chakra-ui/react'
import { FieldInputProps, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useStore } from '../../stores/store'
import ImageUploader from '../shared/ImageUpload/ImageUploader'

interface Props {
  form: FormikProps<any>
  field: FieldInputProps<any>
}

export const UploadImageForm: React.FC<Props> = observer(({ form, field }) => {
  const { recipeStore, modalStore } = useStore()

  return (
    <FormControl isInvalid={!!form.errors?.imgUrl && !!form.touched?.imgUrl}>
      <FormLabel htmlFor="imgURL">Add Photo</FormLabel>
      {recipeStore.currentCroppedImage ? (
        <HStack>
          <Button
            isFullWidth
            variant="outline"
            colorScheme="brand"
            onClick={() => {
              recipeStore.currentCroppedImage = undefined
            }}
          >
            Remove photo
          </Button>
        </HStack>
      ) : (
        <Button
          isFullWidth
          variant="outline"
          colorScheme="brand"
          onClick={() => modalStore.openModal(<ImageUploader />)}
        >
          Add Photo
        </Button>
      )}
    </FormControl>
  )
})
