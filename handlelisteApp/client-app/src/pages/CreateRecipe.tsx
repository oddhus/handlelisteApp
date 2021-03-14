import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Textarea,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react'
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikProps,
} from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IitemInRecipe } from '../models/recipe'
import { useStore } from '../stores/store'
import * as Yup from 'yup'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'

interface Props {}

interface FormValues {
  recipeName: string
  shortDescription: string
  approach: string
  items: IitemInRecipe[]
}

export const CreateRecipe: React.FC<Props> = () => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    recipeName: '',
    shortDescription: '',
    approach: '',
    items: [],
  })
  const [isLargerThan500] = useMediaQuery('(min-width: 500px)')

  const { recipeId } = useParams<{ recipeId: string | undefined }>()
  const { recipeStore, settingStore } = useStore()
  const history = useHistory()
  const toast = useToast()

  useEffect(() => {
    if (recipeId) {
      recipeStore.getRecipe(parseInt(recipeId))
    }
  }, [recipeId, recipeStore])

  useEffect(() => {
    if (
      !recipeId &&
      recipeStore.currentRecipe &&
      recipeStore.currentRecipe.recipeID === recipeId
    ) {
      setInitialValues({
        recipeName: recipeStore.currentRecipe.recipeName,
        shortDescription: recipeStore.currentRecipe.shortDescription,
        approach: recipeStore.currentRecipe.approach,
        items: recipeStore.currentRecipe.items,
      })
    }
  }, [recipeId, recipeStore])

  const SignupSchema = Yup.object().shape({
    recipeName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    shortDescription: Yup.string()
      .min(2, 'Too Short!')
      .max(120, 'Too Long!')
      .required('Required'),
    approach: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
  })

  return (
    <Container>
      <Center>
        <Heading>{settingStore.language.createRecipe}</Heading>
      </Center>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log(values)

          let response
          if (recipeId) {
            recipeStore.updateRecipe(values, parseInt(recipeId))
          } else {
            recipeStore.saveRecipe(values)
          }

          console.log(response)

          if (response) {
            toast({
              title: recipeId ? 'Recipe updated.' : 'Recipe created',
              description: recipeId
                ? 'Your recipe was successfully updated'
                : 'Your recipe was successfully created',
              status: 'success',
              duration: 4000,
              isClosable: true,
            })

            history.push('/recipes')
          } else {
            toast({
              title: 'Error',
              description: recipeId
                ? 'Your recipe was not updated'
                : 'Your recipe was not created',
              status: 'error',
              duration: 4000,
              isClosable: true,
            })
          }
        }}
        validationSchema={SignupSchema}
      >
        {(props: FormikProps<FormValues>) => {
          const { values, isSubmitting } = props
          return (
            <Form>
              <Field name="recipeName">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.recipeName && !!form.touched?.recipeName
                    }
                  >
                    <FormLabel htmlFor="recipeName">
                      {settingStore.language.recipeName}
                    </FormLabel>
                    <Input
                      {...field}
                      id="recipeName"
                      placeholder={settingStore.language.recipeName}
                    />
                    <FormErrorMessage>
                      {form.errors.recipeName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="shortDescription">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.shortDescription &&
                      !!form.touched?.shortDescription
                    }
                  >
                    <FormLabel htmlFor="shortDescription" pt={1}>
                      {settingStore.language.shortDescription}
                    </FormLabel>
                    <Textarea
                      {...field}
                      id="shortDescription"
                      placeholder={settingStore.language.shortDescription}
                    />
                    <FormErrorMessage>
                      {form.errors.shortDescription}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="approach">
                {({ form, field }: FieldProps) => (
                  <FormControl
                    isInvalid={
                      !!form.errors?.approach && !!form.touched?.approach
                    }
                  >
                    <FormLabel htmlFor="approach">
                      {settingStore.language.approach}
                    </FormLabel>
                    <Textarea
                      {...field}
                      id="approach"
                      placeholder={settingStore.language.approach}
                    />
                    <FormErrorMessage>{form.errors.approach}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormLabel htmlFor={`items`} pt={1}>
                {settingStore.language.ingredients}
              </FormLabel>
              <FieldArray
                name="items"
                render={(arrayHelpers) => (
                  <Stack spacing={4}>
                    {values.items &&
                      values.items.length > 0 &&
                      values.items.map((items, index) => (
                        <Grid
                          key={index}
                          templateColumns="repeat(12, 1fr)"
                          templateRows={
                            isLargerThan500
                              ? 'repeat(1, 1fr)'
                              : 'repeat(2, 1fr)'
                          }
                          gap={2}
                        >
                          <GridItem colSpan={isLargerThan500 ? 5 : 12}>
                            <Field name={`items[${index}].productName`}>
                              {({ form, field }: FieldProps) => {
                                return (
                                  <FormControl
                                    isInvalid={
                                      !!form.errors?.c && !!form.touched?.items
                                    }
                                  >
                                    <Input
                                      {...field}
                                      id={`items[${index}].productName`}
                                      placeholder={
                                        settingStore.language.ingredient
                                      }
                                    />
                                    <FormErrorMessage>
                                      {form.errors.productName}
                                    </FormErrorMessage>
                                  </FormControl>
                                )
                              }}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={isLargerThan500 ? 3 : 6}>
                            <Field name={`items[${index}].quantity`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!form.errors?.items &&
                                    !!form.touched?.items
                                  }
                                >
                                  <Input
                                    {...field}
                                    id={`items[${index}].quantity`}
                                    placeholder={
                                      settingStore.language.shoppingList[0]
                                    }
                                  />
                                  <FormErrorMessage>
                                    {form.errors.name}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={isLargerThan500 ? 3 : 5}>
                            <Field name={`items[${index}].unit`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!form.errors?.items &&
                                    !!form.touched?.items
                                  }
                                >
                                  <Select
                                    id={`items[${index}].unit`}
                                    placeholder={settingStore.language.units[0]}
                                    {...field}
                                  >
                                    {settingStore.language.units
                                      .slice(1)
                                      .map((s) => (
                                        <option key={s} value={s}>
                                          {s}
                                        </option>
                                      ))}
                                  </Select>
                                  <FormErrorMessage>
                                    {form.errors.unit}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={1}>
                            <IconButton
                              aria-label={settingStore.language.remove}
                              onClick={() => arrayHelpers.remove(index)}
                              icon={<CloseIcon />}
                            />
                          </GridItem>
                        </Grid>
                      ))}
                    <IconButton
                      aria-label={settingStore.language.add}
                      onClick={() =>
                        arrayHelpers.push({
                          productName: '',
                          quantity: 1,
                          unit: '',
                        })
                      }
                      icon={<AddIcon />}
                    />
                  </Stack>
                )}
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                {recipeId
                  ? settingStore.language.update
                  : settingStore.language.createNew}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}
