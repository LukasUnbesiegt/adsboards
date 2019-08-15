import React, { Component } from 'react'
import styles from './Left.module.css'
import Slider from "react-slick";
import ReactPlayer from 'react-player'




const settings = {


    speed: 3000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,



    responsive: [

        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

class Left extends Component {



    state = {
        which: 1
    }




    componentDidMount() {

        const { schedule } = this.props;

        if (schedule && schedule.advert.contents.images.length < 0) {
            this.setState({
                which: 0
            })
        } else {
            this.setState({
                which: 1
            })
        }



        // setInterval(() => {

        // }, interval);


    }

    renderImages = () => {



        const renderPhotos = () => {

            const { schedule } = this.props;

            if (schedule) {


                return schedule.advert.contents.images.map((image) => {

                    return (<img src={image.url} className="img-fluid" />)
                })



            } else {
                const sampleImages = [
                    {
                        url: 'https://via.placeholder.com/500'


                    },
                    {
                        url: 'https://via.placeholder.com/500'


                    },
                    {
                        url: 'https://via.placeholder.com/500'


                    },
                    {
                        url: 'https://via.placeholder.com/500'


                    }
                ]

                return sampleImages.map((photo) => {

                    return (<img src={photo.url} className="img-fluid" />)

                })

            }


        }


        return (
            <div className={`${styles.imgContainer}`}>
                <Slider {...settings}>


                    {renderPhotos()}


                </Slider>
            </div>

        )

    }

    renderVideos = () => {

        const renderVideoLists = () => {

            const { schedule } = this.props;


            if (schedule) {

                let urlsources = schedule.advert.contents.videos.map((video) => {
                    return { src: video.url, type: 'video/webm' }
                })

                return (
                    <ReactPlayer
                        playing
                        url={urlsources}
                        width='100%'
                        height='100%'
                    />
                )



            } else {
                return;
            }


        }
        return (
            <div className="my-2 py-2 mx-2 px-2">
                {renderVideoLists()}
            </div>
        )

    }



    renderContents = () => {


        if (this.state.which === 1) {

            return this.renderVideos()

        } else {


            return this.renderImages()


        }

    }




    render() {

        console.log('schedule', this.props.schedule)

        return (


            <div className={``} >
                {this.renderContents()}
            </div>
        )
    }
}







export default Left;