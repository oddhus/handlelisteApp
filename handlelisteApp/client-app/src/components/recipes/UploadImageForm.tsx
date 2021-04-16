import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Image,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react'
import { FieldInputProps, FormikProps } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { useStore } from '../../stores/store'
import ImageUploader from '../shared/ImageUpload/ImageUploader'

interface Props {
  form: FormikProps<any>
  field: FieldInputProps<any>
}

export const UploadImageForm: React.FC<Props> = observer(({ form, field }) => {
  const { recipeStore, settingStore, modalStore } = useStore()

  return (
    <FormControl isInvalid={!!form.errors?.imgUrl && !!form.touched?.imgUrl}>
      <FormLabel htmlFor="imgURL">Add Photo</FormLabel>
      {
        recipeStore.currentCroppedImage ? (
          <HStack>
            <Button
              isFullWidth
              variant="outline"
              colorScheme="brand"
              onClick={() => {recipeStore.currentCroppedImage = undefined}}
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
