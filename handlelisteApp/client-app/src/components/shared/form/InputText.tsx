import React from 'react';
import {observer} from "mobx-react-lite";
import {useField} from 'formik'
import {FormControl, FormErrorMessage, Input} from "@chakra-ui/react";

interface Props {
    placeholder: string;
    name: string;
    label?: string
    type?: string;
}

const InputText = observer((props: Props) => {
   const [filed, meta] = useField(props.name)
        return (
            <FormControl isInvalid={meta.touched && !!meta.error}>
                <label>{props.label}</label>
                <Input {...filed} {...props}/>
                {meta.touched && meta.error ? (
                    <FormErrorMessage colorScheme='error'>{meta.error}</FormErrorMessage>
                ): null}
            </FormControl>
        );
})

export default InputText;