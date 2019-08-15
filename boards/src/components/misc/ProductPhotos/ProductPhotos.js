
import React, { Component, Fragment } from 'react'
import { toastr } from 'react-redux-toastr'
import DropZone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { connect } from 'react-redux'
import { sendImages, deleteOriginalImg } from '../../../actions/boards/boards'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';









class ProductPhotos extends Component {


    state = {

        files: [],
        image: {},
        fieldName: '',
        filesCropped: [],
        images: [],


    }

    componentWillReceiveProps = (prevProps) => {


        if (prevProps.initialImages) {

            this.setState({
                images: [...prevProps.initialImages]
            }, () => {
                console.log(this.state.images)
            })
        }




    }

    onDrop = (files) => {

        this.setState({
            files: files,
            fileName: files[0].name
        })

    }



    cropImage = () => {

        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {

            return;

        }

        this.refs.cropper.getCroppedCanvas().toBlob((blob) => {

            let imgUrl = URL.createObjectURL(blob)

            this.setState({

                image: {
                    cropResult: imgUrl,
                    image: blob
                }
            })



        })


    }

    loadImages = () => {

        let photosArr, blobsToSend;
        if (this.state.image.image) {
            photosArr = [...this.state.filesCropped, { blob: this.state.image.image, tempurl: this.state.image.cropResult }]


        }

        this.setState({
            filesCropped: photosArr,
        })





    }


    cancelCrop = () => {
        this.setState({
            files: [],
            image: {}
        })


    }



    removeImg = (tempurl) => {

        let filteredFilesCropped = this.state.filesCropped.filter((filecrop) => {
            return filecrop.tempurl !== tempurl
        })

        this.setState({
            filesCropped: filteredFilesCropped,
        })
    }


    uploadPhotos = () => {
        const { input } = this.props;
        if (this.state.filesCropped.length > 0) {

            const blobs = this.state.filesCropped.map((file) => {
                return file.blob
            })

            toastr.info('image', 'uploading please wait')



            this.props.sendImages(blobs, (data) => {

                this.setState((previousState, currentProps) => {


                    return {
                        filesCropped: [],
                        files: [],
                        image: {},
                        images: [...data.results, ...previousState.images],



                    };
                }, () => {
                    toastr.success(`successfully uploaded ${data.results.length} photos`)
                    input.onChange(this.state.images)

                });
            })

        }



    }


    deleteImage = (imageId, productId) => {

        this.props.deleteOriginalImg(imageId, productId)

        let filteredImages = this.state.images.filter((image) => {
            return image.public_id !== imageId;
        })

        this.setState({
            images: filteredImages
        }, () => {
            this.props.input.onChange(this.state.images)
            toastr.warning('deleted')
        })
    }


    renderUploadedImages = () => {

        console.log(this.state.images)
        return this.state.images.map((image, i) => {
            return (
                <div
                >
                    {
                        // this.state.images.length > 0 && (
                        //     <i
                        //         className="ni ni-fat-remove"
                        //         style={{
                        //             cursor: 'pointer',
                        //             fontSize: '30px',
                        //             color: 'red'
                        //         }}
                        //         onClick={() => {


                        //             this.deleteImage(image.public_id, this.props.advertId)

                        //         }}
                        //     >

                        //     </i>

                        // )
                    }

                    <br />
                    <img style={{ height: '100px', width: '250px', objectFit: 'scale-down' }} src={image.url} alt="Card image cap" />
                </div>
            )


        })

    }





    render() {




        return (

            <Fragment>

                <div className="container-fluid my-4">
                    <h3 className="text-center">photos for Spot Location</h3>
                    <div className="row">

                        <div className="col-md-6 col-lg-6">

                            <DropZone onDrop={this.onDrop} multiple={false}>
                                <div style={{ paddingTop: '30px', textAlign: 'center' }}>
                                    <span>please upload or drop photos here</span>

                                </div>
                            </DropZone>


                        </div>
                        <div className="col-md-6 col-lg-6">



                            {
                                this.state.files[0] && (
                                    <div className="row">
                                        <div className="col-md-8">
                                            <Cropper
                                                style={{ height: 200, width: '100%' }}
                                                ref='cropper'
                                                src={this.state.files[0].preview}
                                                aspectRatio={this.props.upper / this.props.lower}
                                                viewMode={0}
                                                dragMode="move"
                                                guides={false}
                                                scalable={false}
                                                cropBoxMovable={true}
                                                cropBoxResizable={true}
                                                crop={this.cropImage}

                                            />

                                        </div>
                                        <div className="col-md-4">
                                            <div className="btn-group btn-group-sm" role="group" >
                                                <button type="button"
                                                    class="btn btn-secondary"
                                                    onClick={() => { this.loadImages() }}
                                                >Add</button>

                                                <button
                                                    onClick={() => { this.cancelCrop() }}
                                                    type="button" class="btn btn-secondary">Cancel</button>
                                                <button
                                                    onClick={() => { this.uploadPhotos() }}
                                                    type="button" class="btn btn-danger">Upload All</button>
                                            </div>
                                        </div>
                                    </div>
                                )


                            }


                        </div>


                    </div>

                    {this.state.filesCropped.length > 0 && <h4>New Images</h4>}

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexWrap: 'wrap',
                            margin: '20px'
                        }}

                    >

                        {

                            this.state.filesCropped && this.state.filesCropped.map((image) => {

                                return (

                                    <div>

                                        <i
                                            className="ni ni-fat-remove"
                                            style={{
                                                cursor: 'pointer',
                                                fontSize: '30px',
                                                color: 'red'
                                            }}
                                            onClick={() => { this.removeImg(image.tempurl) }}
                                        >

                                        </i>

                                        <br />
                                        <img style={{ height: '100px', width: '250px', objectFit: 'scale-down' }} src={image.tempurl} alt="Card image cap" />
                                    </div>






                                )
                            })


                        }

                    </div>
                </div>

                <div

                    style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        margin: '20px'
                    }}
                >



                    {


                        this.renderUploadedImages()

                    }

                </div>



            </Fragment >
        )
    }
}






const mapDispatchToProps = {
    deleteOriginalImg,
    sendImages
}




export default connect(null, mapDispatchToProps)(ProductPhotos);