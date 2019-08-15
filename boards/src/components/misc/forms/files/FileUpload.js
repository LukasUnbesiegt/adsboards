import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCrop, { makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
// import { sendImage , deleteImage } from '../../../../actions/productsActions'
import styles from './FileUpload.module.css'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { singleImage } from '../../../../actions/adminSettings'




class FileUpload extends Component {



    constructor() {
        super();
        this.setUpReader()
        this.state = {

            selectedFile: null,
            initialImageBase64: '',
            imageBase64: '',
            previewImage: null,
            cropImage: {},
            loading: false

        }
    }


    setUpReader = () => {

        // set up read instance from FileReader Contructor
        this.reader = new FileReader();

        // load event from reader instance >>  
        this.reader.addEventListener('load', (event) => {
            const { initialImageBase64 } = this.state;

            const imageBase64 = event.target.result;

            if (initialImageBase64) {

                this.setState({
                    imageBase64: imageBase64
                })



            } else {
                this.setState({
                    imageBase64: imageBase64,
                    initialImageBase64: imageBase64

                })
            }

        })

    }

    cancelCrop = () => {

        this.setState({
            initialImageBase64: ''

        })
        this.refs.cropper.clear()


    }

    onChangeHandler = (event) => {

        const selectedFile = event.target.files[0];

        if (selectedFile) {

            this.setState({
                initialImageBase64: '',
                selectedFile
            })

            this.reader.readAsDataURL(selectedFile)


        }


    }


    uploadImage = () => {

        const { cropImage } = this.state;
        const { input } = this.props;


        if (cropImage) {

            this.props.dispatch(singleImage(cropImage))
                .then((data) => {

                    this.setState({
                        previewImage: data.payload
                    })

                    input.onChange(data.payload)



                })




        }



    }




    cropImage = () => {

        if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {

            return;

        }

        this.refs.cropper.getCroppedCanvas().toBlob((blob) => {

            // let imgUrl = URL.createObjectURL(blob)


            this.setState({
                cropImage: blob
            })


        })


    }

    render() {

        const { crop, initialImageBase64 } = this.state;
        const { images, titleName } = this.props;
        console.log(this.props.initialValues)


        const renderExistedQrPhoto = () => {

            let imageExisted = this.props.initialValues ? this.props.initialValues.qrcode.url : null
            return (<div>
                <img className="img-fluid" src={imageExisted} alt="" />
            </div>)


        }


        return (



            <div className="container my-5">

                <p className="text-center">{titleName}</p>

                <div className="row">

                    <div className="col-lg-6">
                        <div class="form-group">

                            <input
                                type="file"
                                className="form-control-file"
                                accept='.jpg, .png, .jpeg'
                                onChange={this.onChangeHandler}

                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {
                            initialImageBase64 &&
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary outline"
                                    onClick={this.uploadImage}
                                >
                                    upload image

                                </button>

                                <button type="button" className="btn btn-secondary outline"
                                    onClick={this.cancelCrop}
                                >
                                    X
                                </button>

                            </div>



                        }

                    </div>

                </div>

                {/* <ReactCrop
                src={initialImageBase64}
                crop={crop}
                onChange={(crop) => this.onCropChange(crop)}
                onImageLoaded={(image) => this.onImageLoaded(image)}
                onComplete={(crop, pixelCrop) => this.onCropCompleted(crop, pixelCrop)}
                
                /> */}
                <div className="container">

                    <div className="col-6">


                        <Cropper
                            style={{ height: 200, width: '50%' }}
                            ref='cropper'
                            src={this.state.initialImageBase64}
                            aspectRatio={1}
                            viewMode={0}
                            // dragMode="move"
                            guides={false}
                            scalable={false}
                            // cropBoxMovable={true}
                            // cropBoxResizable={true}
                            crop={this.cropImage}


                        />

                    </div>
                    <div className="col-6">

                        {
                            this.state.previewImage &&
                            (
                                <div>
                                    <img className="img-fluid" src={this.state.previewImage.url} alt="" />
                                </div>
                            )
                        }
                        {
                            renderExistedQrPhoto()
                        }

                    </div>



                </div>










            </div >
        )
    }
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps)(FileUpload);



