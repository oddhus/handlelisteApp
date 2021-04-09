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
  useToast,
} from '@chakra-ui/react'
import {
  Field,
  FieldArray,
  FieldProps,
  ErrorMessage,
  Form,
  Formik,
  FormikProps,
} from 'formik'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IitemInRecipe } from '../models/recipe'
import { useStore } from '../stores/store'
import * as Yup from 'yup'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { observer } from 'mobx-react-lite'
import { Toast } from '../components/shared/Toast'

interface Props {}

interface FormValues {
  recipeName: string
  shortDescription: string
  approach: string
  items: IitemInRecipe[]
}

export const CreateRecipe: React.FC<Props> = observer(() => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    recipeName: '',
    shortDescription: '',
    approach: '',
    items: [
      {
        itemName: '',
        quantity: 1,
        unit: 'PCS',
      },
    ],
  })

  const { recipeId } = useParams<{ recipeId: string | undefined }>()
  const { recipeStore, settingStore } = useStore()

  useEffect(() => {
    if (recipeId) {
      recipeStore.getRecipe(parseInt(recipeId))
    }
  }, [recipeId, recipeStore])

  useEffect(() => {
    if (
      recipeId &&
      recipeStore.currentRecipe &&
      recipeStore.currentRecipe.recipeID === parseInt(recipeId)
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
      .min(2, 'Min 2 chars')
      .max(50, 'Max 50 chars')
      .required('Required'),
    shortDescription: Yup.string()
      .min(2, 'Min 2 chars')
      .max(120, 'Max 120 chars')
      .required('Required'),
    approach: Yup.string()
      .min(2, 'Min 2 chars')
      .max(1000, 'Max 1000 chars')
      .required('Required'),
    items: Yup.array().of(
      Yup.object().shape({
        itemName: Yup.string().max(30, 'Max 30 chars').required('Required'),
        quantity: Yup.number()
          .typeError('Must be a number')
          .max(9999, 'Max value is 9999')
          .min(0, 'Min value is 0')
          .required('Required'),
        unit: Yup.string()
          .oneOf(settingStore.language.units, 'Please select a valid unit')
          .required('Required'),
      })
    ),
  })

  return (
    <Container>
      <Toast store={recipeStore} />
      <Center>
        <Heading>
          {!recipeId
            ? settingStore.language.createRecipe
            : settingStore.language.update}
        </Heading>
      </Center>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          if (recipeId) {
            recipeStore.updateRecipe(values, parseInt(recipeId))
          } else {
            recipeStore.createRecipe(values)
          }
        }}
        validationSchema={SignupSchema}
      >
        {(props: FormikProps<FormValues>) => {
          const { values, isSubmitting, errors, touched } = props
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
                  <Stack spacing={2}>
                    {values.items &&
                      values.items.length > 0 &&
                      values.items.map((items, index) => (
                        <Grid
                          key={index}
                          templateColumns="repeat(12, 1fr)"
                          templateRows="repeat(1, 1fr)"
                          gap={1}
                        >
                          <GridItem colSpan={[5, 6]}>
                            <Field name={`items[${index}].itemName`}>
                              {({ form, field }: FieldProps) => {
                                return (
                                  <FormControl
                                    isInvalid={
                                      !!errors &&
                                      !!errors.items &&
                                      !!errors.items[index] &&
                                      !!((errors.items[
                                        index
                                      ] as unknown) as IitemInRecipe)
                                        .itemName &&
                                      !!touched &&
                                      !!touched.items &&
                                      !!touched.items[index]?.itemName
                                    }
                                  >
                                    <Input
                                      {...field}
                                      size="small"
                                      id={`items[${index}].itemName`}
                                      placeholder={
                                        settingStore.language.ingredient
                                      }
                                    />
                                    <FormErrorMessage>
                                      {errors?.items && errors.items[index]
                                        ? ((errors.items[
                                            index
                                          ] as unknown) as IitemInRecipe)
                                            .itemName
                                        : ''}
                                    </FormErrorMessage>
                                  </FormControl>
                                )
                              }}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={2}>
                            <Field name={`items[${index}].quantity`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!errors &&
                                    !!errors.items &&
                                    !!errors.items[index] &&
                                    !!((errors.items[
                                      index
                                    ] as unknown) as IitemInRecipe).quantity &&
                                    !!touched &&
                                    !!touched.items &&
                                    !!touched.items[index]?.quantity
                                  }
                                >
                                  <Input
                                    {...field}
                                    size="small"
                                    id={`items[${index}].quantity`}
                                    placeholder={
                                      settingStore.language.shoppingList[0]
                                    }
                                  />
                                  <FormErrorMessage>
                                    {errors?.items && errors.items[index]
                                      ? ((errors.items[
                                          index
                                        ] as unknown) as IitemInRecipe).quantity
                                      : ''}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={[4, 3]}>
                            <Field name={`items[${index}].unit`}>
                              {({ form, field }: FieldProps) => (
                                <FormControl
                                  isInvalid={
                                    !!errors &&
                                    !!errors.items &&
                                    !!errors.items[index] &&
                                    !!((errors.items[
                                      index
                                    ] as unknown) as IitemInRecipe).unit &&
                                    !!touched &&
                                    !!touched.items &&
                                    !!touched.items[index]?.unit
                                  }
                                >
                                  <Select
                                    size="small"
                                    id={`items[${index}].unit`}
                                    {...field}
                                  >
                                    {settingStore.language.units.map((s) => (
                                      <option key={s} value={s}>
                                        {s}
                                      </option>
                                    ))}
                                  </Select>
                                  <FormErrorMessage>
                                    {errors?.items && errors.items[index]
                                      ? ((errors.items[
                                          index
                                        ] as unknown) as IitemInRecipe).unit
                                      : ''}
                                  </FormErrorMessage>
                                </FormControl>
                              )}
                            </Field>
                          </GridItem>
                          <GridItem colSpan={1} justifyContent="flex-end">
                            <IconButton
                              size="xs"
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
                          itemName: '',
                          quantity: 1,
                          unit: 'PCS',
                        })
                      }
                      icon={<AddIcon />}
                    />
                  </Stack>
                )}
              />
              <Center pt={2} pb={10}>
                <Button
                  paddingX={5}
                  mt={4}
                  colorScheme="green"
                  isLoading={recipeStore.loading}
                  type="submit"
                >
                  {recipeId
                    ? settingStore.language.update
                    : settingStore.language.createNew}
                </Button>
              </Center>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
})
