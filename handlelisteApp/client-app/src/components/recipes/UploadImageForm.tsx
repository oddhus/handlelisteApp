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
      <FormLabel htmlFor="imgURL">{settingStore.language.imgUrl}</FormLabel>
      <RadioGroup pb={2}>
        <Stack spacing={5} direction="row">
          <Radio
            colorScheme="brand"
            isChecked={!recipeStore.uploadOwnImage}
            onChange={() => recipeStore.setUploadOwnImage()}
          >
            From url
          </Radio>
          <Radio
            colorScheme="brand"
            isChecked={recipeStore.uploadOwnImage}
            onChange={() => {
              recipeStore.setUploadOwnImage()
              recipeStore.removeCurrentImage()
            }}
          >
            Upload img
          </Radio>
        </Stack>
      </RadioGroup>
      {recipeStore.uploadOwnImage ? (
        recipeStore.currentCroppedImage ? (
          <HStack>
            <Button
              isFullWidth
              variant="outline"
              colorScheme="brand"
              onClick={() =>
                modalStore.openModal(
                  <Image
                    src={URL.createObjectURL(recipeStore.currentCroppedImage)}
                    pb={1}
                  />
                )
              }
            >
              View Photo
            </Button>
            <IconButton
              onClick={() => recipeStore.setUploadOwnImage()}
              aria-label="remove photo"
              icon={<CloseIcon />}
            />
          </HStack>
        ) : (
          <Button
            isFullWidth
            onClick={() => modalStore.openModal(<ImageUploader />)}
          >
            Add Photo
          </Button>
        )
      ) : (
        <Fragment>
          <Input
            {...field}
            id="imgUrl"
            placeholder={settingStore.language.imgUrl}
          />
          <FormErrorMessage>{form.errors.imgUrl}</FormErrorMessage>
        </Fragment>
      )}
    </FormControl>
  )
})
