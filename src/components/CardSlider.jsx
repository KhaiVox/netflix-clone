import React, { useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import styled from 'styled-components'

import Card from './Card'

export default React.memo(function CardSlider({ data, title }) {
    const [showControls, setShowControls] = useState(false)
    const [sliderPosition, setSliderPosition] = useState(0)

    const listRef = useRef()

    // Previous - Next
    const handleDirection = (direction) => {
        let distance = listRef.current.getBoundingClientRect().x - 70
        if (direction === 'left' && sliderPosition > 0) {
            listRef.current.style.transform = `translateX(${230 + distance}px)`
            setSliderPosition(sliderPosition - 1)
        }
        if (direction === 'right' && sliderPosition < 4) {
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setSliderPosition(sliderPosition + 1)
        }
    }

    return (
        <Container
            className="flex column"
            showControls={showControls}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <h1>{title}</h1>
            <div className="wrapper">
                <div className={`slider-action left ${!showControls ? 'none' : ''} flex j-center a-center`}>
                    <AiOutlineLeft onClick={() => handleDirection('left')} />
                </div>
                <div className="flex slider" ref={listRef}>
                    {data.map((movie, index) => {
                        return <Card movieData={movie} index={index} key={movie.id} />
                    })}
                </div>
                <div className="wrapper">
                    <div className={`slider-action right ${!showControls ? 'none' : ''} flex j-center a-center`}>
                        <AiOutlineRight onClick={() => handleDirection('right')} />
                    </div>
                </div>
            </div>
        </Container>
    )
})

const Container = styled.div`
    position: relative;
    gap: 1rem;
    padding: 2rem 0;
    h1 {
        margin-left: 50px;
    }
    .wrapper {
        .slider {
            width: max-content;
            gap: 1rem;
            transform: translateX(0px);
            transition: 0.3s ease-in-out;
            margin-left: 50px;
        }
        .slider-action {
            position: absolute;
            z-index: 99;
            height: 130px;
            top: 90px;
            bottom: 0;
            width: 50px;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            svg {
                font-size: 2rem;
            }
        }
        .none {
            display: none;
        }
        .left {
            left: 0;
            &:hover {
                background-color: hsla(0, 0%, 8%, 0.5);
            }
        }
        .right {
            right: 0;
            &:hover {
                background-color: hsla(0, 0%, 8%, 0.5);
            }
        }
    }
`
