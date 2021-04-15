import React, {Fragment, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Grid, Image, Text, GridItem, VStack, Container, ButtonGroup, Button} from "@chakra-ui/react";
import PhotoDropzone from "./PhotoDropzone";
import PhotoCropper from "./PhotoCropper";
import {useStore} from "../../../stores/store";
interface Props {
    
}
const ImageUploader:React.FC<Props> = observer(() =>{
    const [files, setFiles] = useState<any>([])
    const [cropper, setCropper] = useState<Cropper>()
    const {recipeStore, modalStore} = useStore()
    
    const onCrop = ()=>{
        if (cropper){
            cropper.getCroppedCanvas().toBlob((blob:any) => recipeStore.currentCroppedImage = blob)
            modalStore.closeModal()
        }
    }
    
    useEffect(() => {
        return () =>{
            files.forEach((file:any) =>{
                URL.revokeObjectURL(file.preview)
            })
        }
    }, [files])
    return (
        <Container>
            <VStack spacing={10}>
                <GridItem>
                    <Text color="teal"> Add Photo</Text>
                    <PhotoDropzone setFiles={setFiles}/>
                </GridItem>
                <GridItem>
                    <Text color="teal"> Resize image</Text>
                    {files && files.length>0 && (
                        <PhotoCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                    )}
                </GridItem>
                <GridItem>
                    <Text color="teal"> Preview & Upload</Text>
                    {files && files.length>0 &&
                    <Fragment>
                        <div className='img-preview' style={{minHeight: 200, overflow: 'hidden'}}/>
                        <ButtonGroup style={{marginBottom: '100px'}}>
                            <Button onClick={onCrop}>Crop</Button>
                            <Button onClick={() => setFiles([])}>Cancel</Button>
                        </ButtonGroup>
                    </Fragment>
                    }
                    
                </GridItem>
            </VStack>
        </Container>
       
    )
})

export default ImageUploader;